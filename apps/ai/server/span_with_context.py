from dataclasses import dataclass
from opentelemetry.trace.span import Span
from opentelemetry.context import Context

@dataclass
class SpanWithContext:
    span: Span
    context: Context
    token: object

    def __init__(self, span: Span, context: Context, token: object, thread_identity):
        self.span = span
        self.context = context
        self.token = token
        self.thread_identity = thread_identity