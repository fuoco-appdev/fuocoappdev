from opentelemetry import trace
from tracer import Tracer

def tracer_instrumentation_wrapper(func):
    def wrapper(self, *args, **kwargs):
        span_name = func.__name__
        span = Tracer.tracer.start_span(span_name)
        span_ctx = trace.set_span_in_context(span)
        carrier = Tracer.inject_context(span_ctx)
        [span.set_attribute(f"{kw}", kwargs[kw]) for kw in kwargs]
        result = func(self, carrier, *args, **kwargs)
        span.end()
        return result
    return wrapper