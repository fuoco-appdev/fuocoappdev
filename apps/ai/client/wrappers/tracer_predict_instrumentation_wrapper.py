from opentelemetry import trace
from tracer import Tracer

def tracer_predict_instrumentation_wrapper(func):
    def wrapper(self, *args, **kwargs):
        span_name = func.__name__
        span = Tracer.tracer.start_span(span_name)
        span_ctx = trace.set_span_in_context(span)
        [span.set_attribute(f"{kw}", kwargs[kw]) for kw in kwargs]
        carrier = Tracer.inject_context(span_ctx)
        constructed_response = ""
        for chunk in func(self, carrier, *args, **kwargs):
            if chunk: 
                constructed_response += chunk
            yield chunk
        span.set_attribute("response", constructed_response)
        span.end()
    return wrapper