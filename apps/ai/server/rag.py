from wrappers.langchain_instrumentation_class_wrapper import langchain_instrumentation_class_wrapper
from config_wizards.server_config_wizard import ServerConfigWizard
from abc import ABC, abstractmethod
from vector_store import VectorStore
from embeddings import Embeddings
from typing import Generator, List, Dict, Any
from llm import LLM
import os
import logging
logger = logging.getLogger(__name__)


@langchain_instrumentation_class_wrapper
class RAG(ABC):
    def __init__(self) -> None:
        self.settings = ServerConfigWizard.get_config()

        try:
            self.document_embedder = Embeddings.get_embedding_model()
            self.doc_store = VectorStore.create_vector_store_langchain(
                document_embedder=self.document_embedder
            )
        except Exception as e:
            self.doc_store = None
            logger.info(f"Unable to connect to vector store during initialization: {e}")

        
    def ingest_docs(self, file_path: str, filename: str):
        if not filename.endswith((".pdf", ".pptx")):
            raise ValueError(f"{filename} is not a valid PDF/PPTX file. Only PDF/PPTX files are supported for document parsing.")
        
        try:
            vector_store = VectorStore.create_vector_store(
                self.doc_store, 
                self.document_embedder
            )
            VectorStore.update_vector_store(
                file_path,
                vector_store,
                self.document_embedder,
                os.getenv('COLLECTION_NAME', "vector_db")
            )
        except Exception as e:
            logger.error(f"Failed to injest document due to exception {e}")
            raise ValueError(
                "Failed to upload document. Please upload and unstructured text document."
            )

    def get_llm_chain(
        self, 
        query: str, 
        chat_history: List["Message"], 
        **kwargs
    ):
        # TODO integrate chat_history
        logger.info("Using llm to generate response directly without knowledge base.")
        response = LLM.create_llm(
            model_name=self.settings.llm.model_name, 
            cb_handler=self.cb_handler, 
            is_response_generator=True, 
            **kwargs
        ).chat_with_prompt(
            self.settings.prompts.chat_template, 
            query
        )
        return response

    def get_rag_chain(
        self, 
        query: str, 
        chat_history: List["Message"], 
        **kwargs
    ):
        logger.info("Using rag to generate response from document")
        # TODO integrate chat_history
        try:
            vector_store = VectorStore.create_vector_store(
                self.doc_store, 
                self.document_embedder
            )
            if vector_store:
                try:
                    logger.info(f"Getting retrieved top k values: {self.settings.retriever.top_k} with confidence threshold: {self.settings.retriever.score_threshold}")
                    retriever = vector_store.as_retriever(
                        search_type="similarity_score_threshold",
                        search_kwargs={
                            "score_threshold": self.settings.retriever.score_threshold,
                            "k": self.settings.retriever.top_k
                        })
                    docs = retriever.invoke(
                        input=query, 
                        config={"callbacks":[self.cb_handler]}
                    )
                    if not docs:
                        logger.warning("Retrieval failed to get any relevant context")
                        return iter(["No response generated from LLM, make sure your query is relavent to the ingested document."])

                    augmented_prompt = "Relevant documents:" + docs + "\n\n[[QUESTION]]\n\n" + query
                    system_prompt = self.settings.prompts.rag_template
                    logger.info(f"Formulated prompt for RAG chain: {system_prompt}\n{augmented_prompt}")
                    response = LLM.create_llm(
                        model_name=self.settings.llm.model_name, 
                        cb_handler=self.cb_handler, 
                        is_response_generator=True, 
                        **kwargs
                    ).chat_with_prompt(
                        self.settings.prompts.rag_template, 
                        augmented_prompt
                    )
                    return response
                except Exception as e:
                    logger.info(f"Skipping similarity score as it's not supported by retriever")
                    retriever = vector_store.as_retriever()
                    docs = retriever.invoke(input=query, config={"callbacks":[self.cb_handler]})
                    if not docs:
                        logger.warning("Retrieval failed to get any relevant context")
                        return iter(["No response generated from LLM, make sure your query is relavent to the ingested document."])
                    docs=[doc.page_content for doc in docs]
                    docs = " ".join(docs)
                    augmented_prompt = "Relevant documents:" + docs + "\n\n[[QUESTION]]\n\n" + query
                    system_prompt = self.settings.prompts.rag_template
                    logger.info(f"Formulated prompt for RAG chain: {system_prompt}\n{augmented_prompt}")
                    response = LLM.create_llm(
                        model_name=self.settings.llm.model_name, 
                        cb_handler=self.cb_handler, 
                        is_response_generator=True, 
                        **kwargs
                    ).chat_with_prompt(
                        self.settings.prompts.rag_template, 
                        augmented_prompt
                    )
                    return response
        except Exception as e:
            logger.warning(f"Failed to generate response due to exception {e}")
        logger.warning(
            "No response generated from LLM, make sure you've ingested document."
        )
        return iter(
            [
                "No response generated from LLM, make sure you have ingested document from the Knowledge Base Tab."
            ]
        )

    def document_search(self, content: str, doc_count: int) -> List[Dict[str, Any]]:
        try:
            vector_store = VectorStore.create_vector_store(
                self.doc_store, 
                self.document_embedder
            )
            retriever = vector_store.as_retriever()
            sources = retriever.invoke(
                input=content, 
                limit=self.settings.retriever.top_k, 
                config={"callbacks":[self.cb_handler]}
            )
            output = []
            for every_chunk in sources:
                entry = {
                    "source": every_chunk.metadata['filename'], 
                    "content": every_chunk.page_content
                }
                output.append(entry)
            return output
        except Exception as e:
            logger.error(f"Error from POST /search endpoint. Error details: {e}")
        return []

    def get_documents(self):
        try:
            vector_store = VectorStore.create_vector_store(
                self.doc_store, 
                self.document_embedder
            )
            if vector_store:
                return VectorStore.get_docs_vector_store_langchain(vector_store)
        except Exception as e:
            logger.error(f"Vectorstore not initialized. Error details: {e}")
        return []

    def delete_documents(self, filenames: List[str]):
        try:
            vector_store = VectorStore.create_vector_store(
                self.doc_store, 
                self.document_embedder
            )
            if vector_store:
                return VectorStore.del_docs_vector_store_langchain(
                    vector_store, 
                    filenames
                )
        except Exception as e:
            logger.error(f"Vectorstore not initialized. Error details: {e}")