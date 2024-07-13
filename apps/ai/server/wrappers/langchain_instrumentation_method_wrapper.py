from functools import wraps
from tracer import Tracer

def langchain_instrumentation_method_wrapper(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        result = function(Tracer.langchain_callback_handler, *args, **kwargs)
        return result
    
    return wrapper