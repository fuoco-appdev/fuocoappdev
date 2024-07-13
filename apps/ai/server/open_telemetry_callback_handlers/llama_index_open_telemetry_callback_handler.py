import flatdict
from llama_index.core.callbacks.base_handler import BaseCallbackHandler
from llama_index.core.utils import get_tokenizer
from llama_index.core.utilities.token_counting import TokenCounter
from llama_index.core.callbacks.schema import CBEventType, EventPayload, BASE_TRACE_EVENT
from llama_index.core.callbacks.token_counting import get_llm_token_counts, TokenCountingEvent
from typing import Any, Dict, List, Optional, Union, Sequence, Callable
from opentelemetry.trace import (
    Tracer,
    get_tracer,
    set_span_in_context,
    Status,
    StatusCode,
)
from opentelemetry.context import Context, attach, detach
from opentelemetry import baggage
from datetime import datetime
from uuid import UUID
from span_with_context import SpanWithContext
from span import Span
from tenacity import RetryCallState
from contextvars import ContextVar
import threading
import logging
logger = logging.getLogger(__name__)

global_root_trace = ContextVar("trace", default=None)


class LlamaIndexOpenTelemetryCallbackHandler(BaseCallbackHandler):
    def __init__(self, 
        logger: logging.Logger, 
        tracer: Optional[Tracer] = get_tracer(__name__),
        tokenizer: Optional[Callable[[str], List]] = None,
    ) -> None:
        super().__init__(event_starts_to_ignore=[], event_ends_to_ignore=[])
        self.tracer = tracer
        self.event_map: Dict[str, SpanWithContext] = {}
        self.tokenizer = tokenizer or get_tokenizer()
        self.token_counter = TokenCounter(tokenizer=self.tokenizer)

    def start_trace(self, trace_id: Optional[str] = None) -> None:
        trace_name = "llamaindex.trace"
        if trace_id is not None:
            trace_name = "llamaindex.trace." + trace_id
        
        span = self.tracer.start_span(trace_name)
        context = set_span_in_context(span)
        token = attach(context)
        global_root_trace.set(SpanWithContext(span, context, token, thread_identity=threading.get_ident()))

    def end_trace(
        self,
        trace_id: Optional[str] = None,
        trace_map: Optional[Dict[str, List[str]]] = None
    ) -> None:
        root_trace = global_root_trace.get()
        if root_trace is not None:
            if root_trace.thread_identity == threading.get_ident():
                detach(root_trace.token)
            
            root_trace.span_end()

    def on_event_start(
        self,
        event_type: CBEventType,
        payload: Optional[Dict[str, Any]] = None,
        event_id: str = "",
        parent_id: str = "",
        **kwargs: Any
    ) -> str:
        parent_context = None
        if parent_id in self.event_map:
            parent_context = self.event_map[parent_id].context
        elif parent_id is BASE_TRACE_EVENT and global_root_trace.get() is not None:
            parent_context = global_root_trace.get().context
        
        span_prefix = "llamaindex.event."
        span = self.tracer.start_span(span_prefix + event_type.value, context=parent_context)
        context = set_span_in_context(span)
        token = attach(context)
        self.event_map[event_id] = SpanWithContext(span=span, context=context, token=token, thread_identity=threading.get_ident())

        span.set_attribute("event_id", event_id)
        if payload is not None:
            if event_type is CBEventType.QUERY:
                span.set_attribute("query.text", payload[EventPayload.QUERY_STR])
            elif event_type is CBEventType.RETRIEVE:
                pass
            elif event_type is CBEventType.EMBEDDING:
                span.set_attribute("embedding.model", payload[EventPayload.SERIALIZED]["model_name"])
                span.set_attribute("embedding.batch_size", payload[EventPayload.SERIALIZED]['embed_batch_size'])
                span.set_attribute("embedding.class_name", payload[EventPayload.SERIALIZED]['class_name'])
            elif event_type is CBEventType.SYNTHESIZE:
                span.set_attribute("synthesize.query_text", payload[EventPayload.QUERY_STR])
            elif event_type is CBEventType.CHUNKING:
                for i, chunk in enumerate(payload[EventPayload.CHUNKS]):
                    span.set_attribute(f"chunk.{i}", chunk)
            elif event_type is CBEventType.TEMPLATING:
                if payload[EventPayload.QUERY_WRAPPER_PROMPT]:
                    span.set_attribute("query_wrapper_prompt", payload[EventPayload.QUERY_WRAPPER_PROMPT])
                if payload[EventPayload.SYSTEM_PROMPT]:
                    span.set_attribute("system_prompt", payload[EventPayload.SYSTEM_PROMPT])
                if payload[EventPayload.TEMPLATE]:
                    span.set_attribute("template", payload[EventPayload.TEMPLATE])
                if payload[EventPayload.TEMPLATE_VARS]:
                    for key, var in payload[EventPayload.TEMPLATE_VARS]:
                        span.set_attribute(f"template_variables.{key}", var)
            elif event_type is CBEventType.LLM:
                span.set_attribute("llm.class_name", payload[EventPayload.SERIALIZED]['class_name'])
                if EventPayload.PROMPT in payload:
                    span.set_attribute("llm.formatted_prompt", payload[EventPayload.PROMPT])
                else:
                    span.set_attribute("llm.messages", str(payload[EventPayload.MESSAGES]))
                
                span.set_attribute("llm.additional_kwargs", str(payload[EventPayload.ADDITIONAL_KWARGS]))
            elif event_type is CBEventType.NODE_PARSING:
                span.set_attribute("node_parsing.num_documents", len(payload[EventPayload.DOCUMENTS]))
            elif event_type is CBEventType.EXCEPTION:
                span.set_status(Status(StatusCode.ERROR))
                span.record_exception(payload[EventPayload.EXCEPTION])

        return event_id
    
    def on_event_end(self, event_type: CBEventType, payload: Optional[Dict[str, Any]] | None = None, event_id: str = "", **kwargs: Any) -> None:
        if event_id in self.event_map:
            span = self.event_map[event_id].span
            span.set_attribute("event_id", event_id)
            
            if payload is not None:
                if CBEventType.EXCEPTION in payload:
                    span.set_status(Status(StatusCode.ERROR))
                    span.record_exception(payload[EventPayload.EXCEPTION])
                if event_type is CBEventType.QUERY:
                    pass
                elif event_type is CBEventType.RETRIEVE:
                    for i, node_with_score in enumerate(payload[EventPayload.NODES]):
                        node = node_with_score.node
                        score = node_with_score.score
                        span.set_attribute(f"query.node.{i}.id", node.hash)
                        span.set_attribute(f"query.node.{i}.score", score)
                        span.set_attribute(f"query.node.{i}.text", node.text)
                elif event_type is CBEventType.EMBEDDING:
                    texts = payload.get(EventPayload.CHUNKS, [])
                    vectors = payload.get(EventPayload.EMBEDDINGS, [])
                    total_chunks_tokens = 0
                    for text, vector in zip(texts, vectors):
                        span.set_attribute(f"embedding_text_{texts.index(text)}", text)
                        span.set_attribute(f"embedding_vector_{vectors.index(vector)}", vector)
                        total_chunks_tokens += self.token_counter.get_string_tokens(text)
                    
                    span.set_attribute(f"embedding_token_usage", total_chunks_tokens)
                elif event_type is CBEventType.SYNTHESIZE:
                    pass
                elif event_type is CBEventType.CHUNKING:
                    pass
                elif event_type is CBEventType.TEMPLATING:
                    pass
                elif event_type is CBEventType.LLM:
                    span.set_attribute("response.text", str(
                        payload.get(EventPayload.RESPONSE, "")
                    ) or str(payload.get(EventPayload.COMPLETION, "")))
                    token_counts = get_llm_token_counts(self.token_counter, payload, event_id)
                    span.set_attribute("llm_prompt.token_usage", token_counts.prompt_token_count)
                    span.set_attribute("llm_completion.token_usage", token_counts.completion_token_count)
                    span.set_attribute("total_tokens_used", token_counts.total_token_count)
                elif event_type is CBEventType.NODE_PARSING:
                    span.set_attribute("node_parsing.num_nodes", len(payload[EventPayload.NODES]))
            
            if self.event_map[event_id].thread_identity == threading.get_ident():
                detach(self.event_map[event_id].token)
            self.event_map.pop(event_id, None)
            span.end()