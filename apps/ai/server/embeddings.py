import langchain_core.embeddings
import logging
logger = logging.getLogger(__name__)

from typing import TYPE_CHECKING, Callable, List, Optional
from functools import lru_cache, wraps
from config_wizards.server_config_wizard import ServerConfigWizard

try:
    import torch
except Exception as e:
    logger.error(f"torch import failed with error: {e}")

try:
    from langchain.text_splitter import SentenceTransformersTokenTextSplitter
    from langchain_community.embeddings import HuggingFaceEmbeddings
    from langchain_community.vectorstores import FAISS
except Exception as e:
    logger.error(f"Langchain import failed with error: {e}")

try:
    from llama_index.core.postprocessor.types import BaseNodePostprocessor
    from llama_index.core.schema import MetadataMode
    from llama_index.core.utils import globals_helper, get_tokenizer
    from llama_index.vector_stores.milvus import MilvusVectorStore
    from llama_index.vector_stores.postgres import PGVectorStore
    from llama_index.core.indices import VectorStoreIndex
    from llama_index.core.service_context import ServiceContext, set_global_service_context
    from llama_index.llms.langchain import LangChainLLM
    from llama_index.embeddings.langchain import LangchainEmbedding
    if TYPE_CHECKING:
        from llama_index.core.indices.base_retriever import BaseRetriever
        from llama_index.core.indices.query.schema import QueryBundle
        from llama_index.core.schema import NodeWithScore
        from open_telemetry_callback_handlers.llama_index_open_telemetry_callback_handler import LlamaIndexOpenTelemetryCallbackHandler
    from llama_index.core.callbacks import CallbackManager
except Exception as e:
    logger.error(f"Llamaindex import failed with error: {e}")

try:
    from langchain_nvidia_ai_endpoints import ChatNVIDIA, NVIDIAEmbeddings
except Exception as e:
    logger.error(f"Langchain nvidia ai endpoints import failed with error: {e}")

class Embeddings():
    @classmethod
    @lru_cache
    def get_embedding_model(cls) -> langchain_core.embeddings.Embeddings:
        model_kwargs = {"device": "cpu"}
        if torch.cuda.is_available():
            model_kwargs["device"] = "cuda:0"

        encode_kwargs = {"normalize_embeddings": False}
        settings = ServerConfigWizard.get_config()

        logger.info(f"Using {settings.embeddings.model_engine} as model engine and {settings.embeddings.model_name} and model for embeddings")
        if settings.embeddings.model_engine == "huggingface":
            hugging_face_embeddings = HuggingFaceEmbeddings(
                model_name=settings.embeddings.model_name,
                model_kwargs=model_kwargs,
                encode_kwargs=encode_kwargs
            )

            return hugging_face_embeddings
        elif settings.embeddings.model_engine == "nvidia-ai-endpoints":
            if settings.embeddings.server_url:
                logger.info(f"Using embedding model {settings.embeddings.model_name} hosted at {settings.embeddings.server_url}")
                return NVIDIAEmbeddings(
                    base_url=f"http://{settings.embeddings.server_url}/v1", 
                    model=settings.embeddings.model_name, 
                    truncate="END"
                )
            else:
                logger.info(f"Using embedding model {settings.embeddings.model_name} hosted at api catalog")
                return NVIDIAEmbeddings(
                    model=settings.embeddings.model_name, 
                    truncate="END"
                )
        else:
            raise RuntimeError("Unable to find any supported embedding model. Supported engine is huggingface and nvidia-ai-endpoints.")