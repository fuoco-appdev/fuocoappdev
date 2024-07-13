from config_wizard import ConfigWizard
from dataclasses import dataclass
from config_field import config_field
from functools import lru_cache, wraps
from config_wizards.vector_store_config_wizard import VectorStoreConfigWizard
from config_wizards.llm_config_wizard import LLMConfigWizard
from config_wizards.text_splitter_config_wizard import TextSplitterConfigWizard
from config_wizards.embedding_config_wizard import EmbeddingConfigWizard
from config_wizards.retriever_config_wizard import RetrieverConfigWizard
from config_wizards.prompts_config_wizard import PromptsConfigWizard
import os

@dataclass(frozen=True)
class ServerConfigWizard(ConfigWizard):
    vector_store: VectorStoreConfigWizard = config_field(
        "vector_store",
        env=False,
        help_text="The configuration of the vector db connection.",
        default=VectorStoreConfigWizard(),
    )
    llm: LLMConfigWizard = config_field(
        "llm",
        env=False,
        help_text="The configuration for the server hosting the Large Language Models.",
        default=LLMConfigWizard(),
    )
    text_splitter: TextSplitterConfigWizard = config_field(
        "text_splitter",
        env=False,
        help_text="The configuration for text splitter.",
        default=TextSplitterConfigWizard(),
    )
    embeddings: EmbeddingConfigWizard = config_field(
        "embeddings",
        env=False,
        help_text="The configuration of embedding model.",
        default=EmbeddingConfigWizard(),
    )
    retriever: RetrieverConfigWizard = config_field(
        "retriever",
        env=False,
        help_text="The configuration of the retriever pipeline.",
        default=RetrieverConfigWizard(),
    )
    prompts: PromptsConfigWizard = config_field(
        "prompts",
        env=False,
        help_text="Prompt templates for chat and rag.",
        default=PromptsConfigWizard(),
    )

    @classmethod
    @lru_cache
    def get_config(cls) -> ConfigWizard:
        config_file = os.environ.get("SERVER_CONFIG_FILE", "configs/server.config.yml")
        config = cls.create_from_file(config_file)
        if config:
            return config
        
        raise RuntimeError("Unable to find configuration.")