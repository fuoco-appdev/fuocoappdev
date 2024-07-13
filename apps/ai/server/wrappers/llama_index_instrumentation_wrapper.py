from functools import wraps
from opentelemetry import trace, context
from opentelemetry.propagate import get_global_textmap

def llama_index_instrumentation_wrapper(function):
    @wraps(function)
    async def wrapper(*args, **kwargs):
        request = kwargs.get("request")
        prompt = kwargs.get("prompt")
        context_value = get_global_textmap().extract(request.headers)
        if context_value is not None:
            context.attach(context_value)
        
        result = function(*args, **kwargs)
        return await result
    
    return wrapper