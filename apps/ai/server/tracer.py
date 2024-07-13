import os
from langchain.callbacks.base import BaseCallbackHandler as langchain_base_cb_handler
from llama_index.core.callbacks.simple_llm_handler import SimpleLLMHandler as llama_index_base_cb_handler
from opentelemetry import trace, context
from opentelemetry.sdk.trace.export import SimpleSpanProcessor
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.resources import SERVICE_NAME, Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.trace.propagation.tracecontext import TraceContextTextMapPropagator
from open_telemetry_callback_handlers.langchain_open_telemetry_callback_handler import LangchainOpenTelemetryCallbackHandler
from open_telemetry_callback_handlers.llama_index_open_telemetry_callback_handler import LlamaIndexOpenTelemetryCallbackHandler
from opentelemetry.propagators.composite import CompositePropagator
from opentelemetry.propagate import set_global_textmap, get_global_textmap
import logging
logger = logging.getLogger(__name__)

class Tracer():
    langchain_callback_handler: LangchainOpenTelemetryCallbackHandler | langchain_base_cb_handler = None
    llama_index_callback_handler: LlamaIndexOpenTelemetryCallbackHandler | llama_index_base_cb_handler = None

    @classmethod
    def load(cls):
        resource = Resource.create({SERVICE_NAME: "chain-server"})
        provider = TracerProvider(resource=resource)
        if os.environ.get("ENABLE_TRACING") == "true":
            processor = SimpleSpanProcessor(OTLPSpanExporter())
            provider.add_span_processor(processor)
        trace.set_tracer_provider(provider)
        tracer = trace.get_tracer("chain-server")

        if os.environ.get("ENABLE_TRACING") == "true":
            propagator = TraceContextTextMapPropagator()
            cls.langchain_callback_handler = LangchainOpenTelemetryCallbackHandler(logger, tracer)
            cls.llama_index_callback_handler = LlamaIndexOpenTelemetryCallbackHandler(logger, tracer)
        else:
            propagator = CompositePropagator([])
            cls.langchain_callback_handler = langchain_base_cb_handler()
            cls.llama_index_callback_handler = llama_index_base_cb_handler()

        set_global_textmap(propagator)