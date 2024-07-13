from functools import wraps
from tracer import Tracer

def langchain_instrumentation_class_wrapper(function):
    class WrapperClass(function):
        def __init__(self, *args, **kwargs):
            self.callback_handler = Tracer.langchain_callback_handler
            super().__init__(*args, **kwargs)

    return WrapperClass