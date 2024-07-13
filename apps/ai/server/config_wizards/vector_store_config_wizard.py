from config_wizard import ConfigWizard
from dataclasses import dataclass
from config_field import config_field

@dataclass(frozen=True)
class VectorStoreConfigWizard(ConfigWizard):
    name: str = config_field(
        "name",
        default="milvus",
        help_text="The name of vector store"
    )
    url: str = config_field(
        "url",
        default="http://milvus:19530",
        help_text="The host of the machine running Vector Store DB"
    )
    nlist: int = config_field(
        "nlist",
        default=64,
        help_text="Number of cluster units",
    )
    nprobe: int = config_field(
        "nprobe",
        default=16,
        help_text="Number of units to query",
    )