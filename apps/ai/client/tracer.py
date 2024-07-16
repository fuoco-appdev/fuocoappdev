import os
from opentelemetry import trace
from opentelemetry.sdk.resources import SERVICE_NAME, Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import SimpleSpanProcessor
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.trace.propagation.tracecontext import TraceContextTextMapPropagator
from opentelemetry.propagate import set_global_textmap, get_global_textmap
from opentelemetry.propagators.composite import CompositePropagator

class Tracer():
    tracer: trace.Tracer = None
    
    @classmethod
    def create_resource(cls):
        resource = Resource.create({
            SERVICE_NAME: "client"
        })
        provider = TracerProvider(resource=resource)
        if os.environ.get("ENABLE_TRACING") == "true":
            processor = SimpleSpanProcessor(OTLPSpanExporter())
            provider.add_span_processor(processor)
        trace.set_tracer_provider(provider)
        cls.tracer = trace.get_tracer("client")

        if os.environ.get("ENABLE_TRACING") == "true":
            propagator = TraceContextTextMapPropagator()
        else:
            propagator = CompositePropagator([])

        set_global_textmap(propagator)

    @classmethod
    def inject_context(cls, ctx):
        carrier = {}
        get_global_textmap().inject(carrier, context=ctx)
        return carrier
