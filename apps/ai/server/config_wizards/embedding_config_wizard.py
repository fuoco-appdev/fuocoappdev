from config_wizard import ConfigWizard
from dataclasses import dataclass
from config_field import config_field

@dataclass(frozen=True)
class EmbeddingConfigWizard(ConfigWizard):
    model_name: str = config_field(
        "model-name",
        default="snowflake/arctic-embed-l",
        help_text="The name of huggingface embedding model.",
    )
    model_engine: str = config_field(
        "model-engine",
        default="nvidia-ai-endpoints",
        help_text="The server type of the hosted model. Allowed values are hugginface",
    )
    dimensions: int = config_field(
        "dimensions",
        default=1024,
        help_text="The required dimensions of the embedding model. Currently utilized for vector DB indexing.",
    )
    server_url: str = config_field(
        "server-url",
        default="",
        help_text="The url of the server hosting nemo embedding model",
    )