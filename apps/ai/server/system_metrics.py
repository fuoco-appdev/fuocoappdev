from opentelemetry.trace.span import Span
from langchain_core.env import get_runtime_environment
from typing import Any, Dict, List, Optional, Union, Sequence
import os
import logging
logger = logging.getLogger(__name__)

try:
    # psutil is an optional dependency
    import psutil

    PSUTIL_AVAILABLE = True
except ImportError:
    PSUTIL_AVAILABLE = False

class SystemMetrics():
    def get_system_metrics(cls) -> Dict[str, Union[float, dict]]:
        global PSUTIL_AVAILABLE
        if not PSUTIL_AVAILABLE:
            return {}

        try:
            process = psutil.Process(os.getpid())
            metrics: Dict[str, Union[float, dict]] = {}

            with process.oneshot():
                mem_info = process.memory_info()
                metrics["thread_count"] = float(process.num_threads())
                metrics["mem"] = {
                    "rss": float(mem_info.rss)
                }
                context_switches = process.num_ctx_switches()
                cpu_times = process.cpu_times()
                metrics["cpu"] = {
                    "time": {
                        "sys": cpu_times.system,
                        "user": cpu_times.user
                    },
                    "ctx_switches": {
                        "voluntary": float(context_switches.voluntary),
                        "involuntary": float(context_switches.involuntary)
                    },
                    "percent": process.cpu_percent()
                }
            
            return metrics
        except Exception:
            PSUTIL_AVAILABLE = False
            logger.debug(
                "Skipping system metrics collection, as psutil library is not present"
            )
            return {}