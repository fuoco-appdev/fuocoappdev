import flatdict
from langchain_core.agents import AgentAction, AgentFinish
from langchain.callbacks.base import BaseCallbackHandler
from langchain_community.callbacks.utils import flatten_dict
from langchain_core.documents import Document
from langchain_core.messages import BaseMessage
from langchain_core.outputs import LLMResult
from typing import Any, Dict, List, Optional, Union, Sequence
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
import logging
logger = logging.getLogger(__name__)


class LangchainOpenTelemetryCallbackHandler(BaseCallbackHandler):
    def __init__(self, tracer: Optional[Tracer] = get_tracer(__name__)) -> None:
        super().__init__()
        self.tracer = tracer
        self.event_map: Dict[UUID, Dict[str, Any]] = {}
        self.llm_tokens = 0
    
    def on_llm_start(
            self,
            serialized: Dict[str, Any],
            prompts: List[str],
            *,
            run_id: UUID,
            parent_run_id: Union[UUID, None] = None,
            **kwargs: Any
    ) -> None:
        try:
            self.llm_tokens = 0
            llm_start_time = datetime.now()
            class_name = serialized.get("name", serialized.get("id", ["<unknown>"])[-1])
            if not parent_run_id:
                parent_context = baggage.set_baggage("context", str(run_id))
            else:
                parent_context = self.event_map[parent_run_id]["span"].context
            span = self.tracer.start_span(
                f"langchain.llm.{class_name}",
                context=parent_context
            )
            context = set_span_in_context(span)
            token = attach(context)
            self.event_map[run_id] = {}
            self.event_map[run_id] = {
                "span": SpanWithContext(span=span, context=context, token=token),
                "start_time": llm_start_time
            }

            data = flatdict.FlatDict(kwargs.items(), delimiter=".")
            span_attributes = {
                "run_type": "llm",
                "model_class_name": class_name,
                "prompts": prompts,
                "serialized_info": flatten_dict(serialized),
                "run_id": run_id,
                "parent_run_id": parent_run_id
            }
            span_attributes.update(data.items())

            Span.create_attribute(span, span_attributes, logger)
            Span.create_event(span, "start", {"time": str(llm_start_time)})
        except Exception as e:
            logger.exception(e)

    def on_chat_model_start(
            self,
            serialized: Dict[str, Any],
            messages: List[List[BaseMessage]],
            *,
            run_id: UUID,
            parent_run_id: Union[UUID, None] = None,
            **kwargs: Any,
    ) -> Any:
        try:
            chat_model_start_time = datetime.now()
            class_name = serialized.get("name", serialized.get("id", ["<unknown>"])[-1])
            if parent_run_id not in self.event_map:
                parent_context = baggage.set_baggage("context", str(run_id))
            else:
                parent_context = self.event_map[parent_run_id]["span"].context
            
            span = self.tracer.start_span(
                f"langchain.chat_model.{class_name}", context=parent_context
            )
            context = set_span_in_context(span)
            token = attach(context)
            self.event_map[run_id] = {}
            self.event_map[run_id] = {
                "span": SpanWithContext(span=span, context=context, token=token),
                "start_time": chat_model_start_time
            }
            data = flatdict.FlatDict(kwargs.items(), delimiter=".")
            parsed_messages = self.parse_langchain_messages(messages)
            self.llm_tokens = 0
            span_attributes = {
                "model_class_name": class_name,
                "messages": parsed_messages,
                "serialized_info": flatten_dict(serialized),
                "run_id": run_id,
                "parent_run_id": parent_run_id
            }
            span_attributes.update(data.items())
            Span.create_attribute(span, span_attributes, logger)
            Span.create_event(span, "start", {"time": str(chat_model_start_time)})
        except Exception as e:
            logger.exception(e)

    def on_llm_new_token(self, token: str, chunk, run_id: UUID, **kwargs: Any) -> None:
        token_time = datetime.now()
        if run_id in self.event_map:
            self.llm_tokens += 1
            if self.llm_tokens == 1:
                self.event_map[run_id]["first_token_time"] = (
                    token_time - self.event_map[run_id]["start_time"]
                )
            
            span = self.event_map[run_id]["span"].span
            span_event = {"token": str(token), "time": str(token_time)}
            if chunk:
                span_event.update({"chunk": str(chunk)})
            
            Span.create_event(span, "new_token", span_event)
        else:
            logger.debug(f"Run with UUID {run_id} not found.")

    def on_llm_end(
        self,
        response: LLMResult,
        *,
        run_id: UUID,
        **kwargs: Any
    ) -> None:
        try:
            llm_end_time = datetime.now()
            if run_id in self.event_map:
                self.event_map[run_id]["end_time"] = llm_end_time
                span = self.event_map[run_id]["span"].span
                response_streaming = False
                if self.llm_tokens:
                    response_streaming = True
                else:
                    self.event_map[run_id]["first_token_time"] = (
                        llm_end_time - self.event_map[run_id]["start_time"]
                    )
                
                if response.llm_output and "token_usage" in response.llm_output:
                    prompt_tokens = response.llm_output["token_usage"].get(
                        "prompt_tokens", 0
                    )
                    total_tokens = response.llm_output["token_usage"].get(
                        "total_tokens", 0
                    )
                    completion_tokens = response.llm_output["token_usage"].get(
                        "completion_token", 0
                    )
                else:
                    prompt_tokens = completion_tokens = total_tokens = (
                        "Token data not available"
                    )
                    if response_streaming:
                        completion_tokens = self.llm_tokens
                
                for generation in response.generations[0]:
                    if hasattr(generation, "message"):
                        response_text = self.parse_langchain_message(generation.message)
                    else:
                        response_text = generation.text
                
                span_attributes = {
                    "prompt_tokens": prompt_tokens,
                    "total_tokens": total_tokens,
                    "completion_tokens": completion_tokens,
                    "response_streaming": response_streaming,
                    "response": response_text,
                    "first_token_time_ms": self.event_map[run_id]["first_token_time"].total_seconds() * 1000
                }

                Span.create_attribute(span, span_attributes, logger, True)
                Span.create_event(span, "end", {"time": str(llm_end_time)})
                span.set_status(Status(StatusCode.OK))
                span.end()
                detach(self.event_map[run_id]["span"].token)
                del self.event_map[run_id]
            else:
                logger.debug(f"Run with UUID {run_id} not found.")
        except Exception as e:
            logger.exception(e)

    def on_llm_error(self, error: BaseException, **kwargs: Any) -> None:
        run_id = kwargs.get("run_id")
        if run_id in self.event_map:
            span = self.event_map[run_id]["span"].span
            Span.create_error(span, error)
            span.end()
            detach(self.event_map[run_id]["span"].token)
            del self.event_map[run_id]
        else:
            logger.debug(f"Run with UUID {run_id} not found.")
    
    def on_chain_start(
        self,
        serialized: Dict[str, Any],
        inputs: Dict[str, Any],
        *,
        run_id: UUID,
        parent_run_id: Union[UUID, None] = None,
        **kwargs: Any    
    ) -> None:
        try:
            chain_start_time = datetime.now()
            class_name = serialized.get("name", serialized.get("id", ["<unknown>"])[-1])
            if not parent_run_id:
                parent_context = baggage.set_baggage("context", str(run_id))
            else:
                parent_context = self.event_map[parent_run_id]["span"].context
            
            span = self.tracer.start_span(
                f"langchain.chain.{class_name}", context=parent_context
            )
            context = set_span_in_context(span)
            token = attach(context)
            self.event_map[run_id] = {}
            self.event_map[run_id] = {
                "span": SpanWithContext(span=span, context=context, token=token),
                "start_time": chain_start_time
            }

            if isinstance(inputs, dict):
                chain_input = ",".join([f"{k}={v}\n" for k, v in inputs.items()])
            elif isinstance(inputs, list):
                chain_input = ",".join([str(input) for input in inputs])
            else:
                chain_input = str(inputs)
            
            data = flatdict.FlatDict(kwargs.items(), delimiter=".")
            span_attributes = {
                "run_type": "chain",
                "chain_class_name": class_name,
                "chain_input": chain_input,
                "serialized_info": flatten_dict(serialized),
                "run_id": run_id,
                "parent_run_id": parent_run_id
            }
            span_attributes.update(data.items())
            Span.create_attribute(span, span_attributes, logger)
            Span.create_event(span, "start", {"time": str(chain_start_time)})
        except Exception as e:
            logger.exception(e)

    def on_chain_end(
        self,
        outputs: Dict[str, Any],
        *,
        run_id: UUID,
        **kwargs: Any
    ) -> None:
        try:
            chain_end_time = datetime.now()
            if run_id in self.event_map:
                span = self.event_map[run_id]["span"].span
                self.event_map[run_id]["end_time"] = chain_end_time
                if isinstance(outputs, dict):
                    chain_output = ",".join([f"{k}={v}" for k, v in outputs.items()])
                elif isinstance(outputs, list):
                    chain_output = ",".join(map(str, outputs))
                else:
                    chain_output = str(outputs)
                
                span_attributes = {"chain_output": chain_output}
                Span.create_attribute(span, span_attributes, logger, True)
                Span.create_event(span, "end", {"time": str(chain_end_time)})
                span.set_status(Status(StatusCode.OK))
                span.end()
                detach(self.event_map[run_id]["span"].token)
                del self.event_map[run_id]
            else:
                logger.debug(f"Run with UUID {run_id} not found.")
        except Exception as e:
            logger.exception(e)
    
    def on_chain_error(self, error: BaseException, **kwargs: Any) -> None:
        run_id = kwargs.get("run_id")
        if run_id in self.event_map:
            span = self.event_map[run_id]["span"].span
            Span.create_error(span, error)
            span.end()
            detach(self.event_map[run_id]["span"].token)
            del self.event_map[run_id]
        else:
            logger.debug(f"Run with UUID {run_id} not found.")
    
    def on_tool_start(
        self,
        serialized: Dict[str, Any],
        input_str: str,
        *,
        run_id: UUID,
        parent_run_id: Union[UUID, None] = None,
        **kwargs: Any
    ) -> None:
        try:
            tool_start_time = datetime.now()
            class_name = serialized.get("name", serialized.get("id", ["<unknown>"])[-1])
            if not parent_run_id:
                parent_context = baggage.set_baggage("context", str(run_id))
            else:
                parent_context = self.event_map[parent_run_id]["span"].context
            
            span = self.tracer.start_span(
                f"langchain.tool.{class_name}", context=parent_context
            )
            context = set_span_in_context(span)
            token = attach(context)
            self.event_map[run_id] = {}
            self.event_map[run_id] = {
                "span": SpanWithContext(span=span, context=context, token=token),
                "start_time": tool_start_time
            }
            data = flatdict.FlatDict(kwargs.items(), delimiter=".")
            span_attributes = {
                "run_type": "tool",
                "input_str": input_str,
                "serialized_info": flatten_dict(serialized),
                "run_id": run_id,
                "parent_run_id": parent_run_id
            }
            span_attributes.update(data.items())
            Span.create_attribute(span, span_attributes, logger)
            Span.create_event(span, "end", {"time": str(tool_start_time)})
        except Exception as e:
            logger.exception(e)

    def on_tool_end(
        self,
        output: str,
        observation_prefix: Optional[str] = None,
        llm_prefix: Optional[str] = None,
        *,
        run_id: UUID,
        **kwargs: Any
    ) -> None:
        try:
            tool_end_time = datetime.now()
            if run_id in self.event_map:
                span = self.event_map[run_id]["span"].span
                self.event_map[run_id]["end_time"] = tool_end_time
                span_attributes = {}
                if observation_prefix:
                    span_attributes.update({f"{observation_prefix}": output})
                if llm_prefix:
                    span_attributes.update({"llm_prefix": llm_prefix})
                Span.create_attribute(span, span_attributes, logger, True)
                Span.create_event(span, "end", {"time": str(tool_end_time)})
                span.set_status(Status(StatusCode.OK))
                span.end()
                detach(self.event_map[run_id]["span"].token)
                del self.event_map[run_id]
            else:
                logger.debug(f"Run with UUID {run_id} not found.")
        except Exception as e:
            logger.exception(e)
    
    def on_tool_error(
        self,
        error: BaseException,
        *,
        run_id=UUID,
        **kwargs: Any
    ) -> None:
        if run_id in self.event_map:
            span = self.event_map[run_id]["span"].span
            Span.create_error(span, error)
            span.end()
            detach(self.event_map[run_id]["span"].token)
            del self.event_map[run_id]
        else:
            logger.debug(f"Run with UUID {run_id} not found.")

    def on_text(self, text: str, *, run_id: UUID, **kwargs: Any) -> None:
        if run_id in self.event_map:
            span = self.event_map[run_id]["span"].span
            Span.create_attribute(span, {"text": text}, logger)
        else:
            logger.debug(f"Run with UUID {run_id} not found.")

    def on_agent_action(
        self,
        action: AgentAction,
        *,
        run_id: UUID,
        **kwargs: Any
    ) -> Any:
        if run_id in self.event_map:
            span = self.event_map[run_id]["span"].span
            span_attributes = {
                "agent_tool": action.tool,
                "agent_tool_input": action.tool_input,
                "agent_log": action.log
            }
            Span.create_attribute(span, span_attributes, logger)
        else:
            logger.debug(f"Run with UUID {run_id} not found.")
    
    def on_agent_finish(self, finish: AgentFinish, **kwargs: Any) -> None:
        run_id = kwargs.get("run_id")
        if run_id in self.event_map:
            span = self.event_map[run_id]["span"].span
            span_attributes = {
                "agent_output": finish.return_values["output"],
                "agent_log": finish.return_values["output"]
            }
            Span.create_attribute(span, span_attributes, logger)
            span.set_status(Status(StatusCode.OK))
            span.end()
            detach(self.event_map[run_id]["span"].token)
            del self.event_map[run_id]
        else:
            logger.debug(f"Run with UUID {run_id} not found.")

    def on_retriever_start(
        self,
        serialized: Dict[str, Any],
        query: str,
        *,
        run_id: UUID,
        parent_run_id: Optional[UUID] = None,
        **kwargs: Any
    ) -> Any:
        try:
            retriever_start_time = datetime.now()
            class_name = serialized.get("name", serialized.get("id", ["<unknown>"])[-1])
            if not parent_run_id:
                parent_context = baggage.set_baggage("context", str(run_id))
            else:
                parent_context = self.event_map[parent_run_id]["span"].context
            
            span = self.tracer.start_span(
                f"langchain.retriever.{class_name}",
                context=parent_context
            )
            context = set_span_in_context(span)
            token = attach(context)
            self.event_map[run_id] = {}
            self.event_map[run_id] = {
                "span": SpanWithContext(span, context, token),
                "start_time": retriever_start_time
            }
            data = flatdict.FlatDict(kwargs.items(), delimiter=".")
            span_attributes = {
                "run_type": "retriever",
                "query": query,
                "class_name": class_name,
                "serialized_info": flatten_dict(serialized),
                "run_id": run_id,
                "parent_run_id": parent_run_id
            }
            span_attributes.update(data.items())
            Span.create_attribute(span, span_attributes, logger)
            Span.create_event(span, "start", {"time": str(retriever_start_time)})
        except Exception as e:
            logger.exception(e)

    def on_retriever_end(self, documents: Sequence[Document], *, run_id: UUID, parent_run_id: UUID | None = None, **kwargs: Any) -> Any:
        try:
            retriever_end_time = datetime.now()
            if run_id in self.event_map:
                span = self.event_map[run_id]["span"].span
                self.event_map[run_id]["end_time"] = retriever_end_time
                span_attributes = {"documents": documents}
                Span.create_attribute(span, span_attributes, logger, True)
                span.set_status(Status(StatusCode.OK))
                Span.create_event(span, "start", {"time": str(retriever_end_time)})
                span.end()
                detach(self.event_map[run_id]["span"].token)
                del self.event_map[run_id]
            else:
                logger.debug(f"Run with UUID {run_id} not found.")
        except Exception as e:
            logger.exception(e)

    def on_retriever_error(
        self,
        error: BaseException,
        *,
        run_id: UUID,
        **kwargs: Any
    ) -> None:
        if run_id in self.event_map:
            span = self.event_map[run_id]["span"].span
            Span.create_error(span, error)
            span.end()
            detach(self.event_map[run_id]["span"].token)
            del self.event_map[run_id]
        else:
            logger.debug(f"Run with UUID {run_id} not found.")
    
    def on_retry(
        self,
        retry_state: RetryCallState,
        *,
        run_id: UUID,
        **kwargs: Any
    ) -> Any:
        if run_id in self.event_map:
            span = self.event_map[run_id]["span"].span
            retry_event_info = {
                "slept": retry_state.idle_for,
                "attempt": retry_state.attempt_number
            }
            if retry_state.outcome is None:
                retry_event_info["outcome"] = "N/A"
            elif retry_state.outcome.failed:
                retry_event_info["outcome"] = "failed"
                exception = retry_state.outcome.exception()
                retry_event_info["exception"] = str(exception)
                retry_event_info["exception_type"] = exception.__class__.__name__
            else:
                retry_event_info["outcome"] = "success"
                retry_event_info["result"] = str(retry_state.outcome.result())

            retry_event_info["time"] = str(datetime.now())
            Span.create_event(span, "retry", retry_event_info)
        else:
            logger.debug(f"Run with UUID {run_id} not found.") 

    def parse_langchain_messages(self, messages: Union[List[BaseMessage], Any]) -> List[Dict[str, Any]]:
        return [self.parse_langchain_message(message) for message in messages]
    
    def parse_langchain_message(self, message: BaseMessage) -> Dict[str, Any]:
        keys = ["function_call", "tool_calls", "tool_call_id", "name"]
        if isinstance(message, list):
            message = message[0]
        
        parsed_message = {
            "text": message.content,
            "role": message.type
        }
        parsed_message.update(
            {
                key: str(message.additional_kwargs.get(key)) for key in keys if message.additional_kwargs.get(key) is not None
            }
        )
        return parsed_message