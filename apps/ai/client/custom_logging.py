import logging
import os

class CustomLogging():
    def configure(cls, verbosity: int = 0) -> None:
        log_format = f"[{os.getpid()}] %(asctime)15s [%(levelname)7s] - %(name)s - %(message)s"
        log_date_format = "%b %d %H:%M:%S"
        logger = logging.getLogger(__name__)
        verbosity = min(2, max(0, verbosity))  # limit verbosity to 0-2
        log_level = [logging.WARN, logging.INFO, logging.DEBUG][verbosity]

        logging.basicConfig(format=log_format, datefmt=log_date_format, level=log_level)
        logger.setLevel(log_level)
        for logger in [
            __name__,
            "uvicorn",
            "uvicorn.access",
            "uvicorn.error",
        ]:
            for handler in logging.getLogger(logger).handlers:
                handler.setFormatter(logging.Formatter(fmt=log_format, datefmt=log_date_format))