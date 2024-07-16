from config_wizard import ConfigWizard
from dataclasses import dataclass
from config_field import config_field

@dataclass(frozen=True)
class LLMConfigWizard(ConfigWizard):
    server_url: str = config_field(
        "server-url",
        default="",
        help_text="The location of the Triton server hosting the llm model.",
    )
    model_name: str = config_field(
        "model-name",
        default="ensemble",
        help_text="The name of the hosted model.",
    )
    model_engine: str = config_field(
        "model-engine",
        default="nvidia-ai-endpoints",
        help_text="The server type of the hosted model. Allowed values are nvidia-ai-endpoints",
    )
    model_name_pandas_ai: str = config_field(
        "model-name-pandas-ai",
        default="ai-mixtral-8x7b-instruct",
        help_text="The name of the ai catalog model to be used with PandasAI agent",
    )