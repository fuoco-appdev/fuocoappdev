import opentelemetry.trace.span
from opentelemetry.trace import (
    Tracer,
    get_tracer,
    set_span_in_context,
    Status,
    StatusCode,
)
from langchain_core.env import get_runtime_environment
from typing import Any, Dict, List, Optional, Union, Sequence
from system_metrics import SystemMetrics
from logging import Logger
import os
import time

class Span():
    def create_attribute(cls, span: opentelemetry.trace.span.Span, span_attributes: Dict[str, Any], logger: Logger, span_end: bool = False) -> None:
        allowed_types = (bool, str, bytes, int, float)

        if span_end:
            runtime_info = get_runtime_environment()
            system_metrics = SystemMetrics.get_system_metrics(logger)
            runtime_info.update({"system_timezone": time.tzname})
            span_attributes.update(
                {
                    "runtime_info": runtime_info,
                    "system_metrics": system_metrics
                }
            )
        
        for attribute, value in span_attributes.items():
            if not isinstance(value, allowed_types):
                value = str(value)
            span.set_attribute(attribute, value)
    
    def create_event(cls, span: opentelemetry.trace.span.Span, event_name: str, span_event: Dict[str, Any]) -> None:
        span.add_event(str(event_name), span_event)

    def create_error(cls, span: opentelemetry.trace.span.Span, error: BaseException) -> None:
        span.set_status(Status(StatusCode.ERROR))
        span.record_exception(error)

