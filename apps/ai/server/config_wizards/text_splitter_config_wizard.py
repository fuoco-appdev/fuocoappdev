from config_wizard import ConfigWizard
from dataclasses import dataclass
from config_field import config_field

@dataclass(frozen=True)
class TextSplitterConfigWizard(ConfigWizard):
    model_name: str = config_field(
        "model-name",
        default="Snowflake/snowflake-arctic-embed-l",
        help_text="The name of Sentence Transformer model used for SentenceTransformer TextSplitter.",
    )
    chunk_size: int = config_field(
        "chunk-size",
        default=510,
        help_text="Chunk size for text splitting.",
    )
    chunk_overlap: int = config_field(
        "chunk-overlap",
        default=200,
        help_text="Overlapping text length for splitting.",
    )