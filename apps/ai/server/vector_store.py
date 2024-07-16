from typing import TYPE_CHECKING, Callable, List, Optional
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import UnstructuredFileLoader
from urllib.parse import urlparse
from config_wizards.server_config_wizard import ServerConfigWizard
from pdf import PDF
from ppt import PPT
import os
import langchain_core.vectorstores
import logging
logger = logging.getLogger(__name__)

try:
    from langchain.text_splitter import SentenceTransformersTokenTextSplitter
    from langchain_community.embeddings import HuggingFaceEmbeddings
    from langchain_community.vectorstores import FAISS
except Exception as e:
    logger.error(f"Langchain import failed with error: {e}")

try:
    from langchain_community.vectorstores import PGVector
    from langchain_community.vectorstores import Milvus
    from langchain_community.docstore.in_memory import InMemoryDocstore
except Exception as e:
    logger.error(f"Langchain community import failed with error: {e}")

try:
    from faiss import IndexFlatL2
except Exception as e:
    logger.error(f"faiss import failed with error: {e}")

class VectorStore():
    @classmethod
    def create_vector_store(cls, vector_store, document_embedder) -> langchain_core.vectorstores.VectorStore:
        if vector_store is None:
            return cls.create_vector_store_langchain(document_embedder)
        
        return vector_store
    
    @classmethod
    def update_vector_store(cls, file_path, vector_client, embedder, config_name):
        # Attempt to create collection, catch exception if it already exists
        logger.info("[Step 1/4] Creating/loading vector store")

        # Create collection if it doesn't exist
        logger.info("Accessing collection...")

        logger.info("[Step 2/4] Processing and splitting documents")
        # load and split documents
        raw_documents = cls.load_documents(file_path)
        documents = cls.split_text(raw_documents)

        # Adding file name to the metadata
        for document in documents:
            document.metadata["filename"] = os.path.basename(file_path)
        
        logger.info("[Step 3/4] Inserting documents into the vector store...")
        # Batch insert into Milvus collection
        vector_client.add_documents(documents)
        logger.info("[Step 4/4] Saved vector store!")

    @classmethod
    def load_documents(file):
        raw_documents = []

        logger.info(f"Loading document: {file}")

        if file.endswith("pdf"):
            pdf_docs = PDF.get_documents(file)
            for each_page in pdf_docs:
                raw_documents.extend(each_page)
        elif file.endswith("ppt") or file.endswith("pptx"):
            pptx_docs = PPT.process_file(file)
            raw_documents.extend(pptx_docs)
        else:
            # Load unstructured files and add them individually
            loader = UnstructuredFileLoader(file)
            unstructured_docs = loader.load()
            raw_documents.extend(unstructured_docs)  # 'extend' is used here to add elements of the list individually
        return raw_documents

    @classmethod
    def split_text(documents):
        text_splitter = RecursiveCharacterTextSplitter(
            # Set a really small chunk size, just to show.
            chunk_size = 1000,
            chunk_overlap  = 100,
            length_function = len,
            is_separator_regex = False,
        )
        split_docs = text_splitter.split_documents(documents)
        return split_docs
    
    @classmethod
    def create_vector_store_langchain(
            cls, 
            document_embedder, 
            collection_name: str = ""
    ) -> langchain_core.vectorstores.VectorStore:
        config = ServerConfigWizard.get_config()

        if config.vector_store.name == "faiss":
            vector_store = FAISS(
                document_embedder,
                IndexFlatL2(
                    config.embeddings.dimensions
                ),
                InMemoryDocstore(),
                {}
            )
        elif config.vector_store.name == "pgvector":
            db_name = os.getenv("POSTGRES_DB", None)
            if not collection_name:
                collection_name = os.getenv("COLLECTION_NAME", "vector_db")
            
            logger.info(f"Using PGVector collection: {collection_name}")
            connection_string = f"postgresql://{os.getenv('POSTGRES_USER', '')}:{os.getenv('POSTGRES_PASSWORD', '')}@{config.vector_store.url}/{db_name}"
            vector_store = PGVector(
                collection_name=collection_name,
                connection_string=connection_string,
                embedding_function=document_embedder
            )
        elif config.vector_store.name == "milvus":
            if not collection_name:
                collection_name = os.getenv("COLLECTION_NAME", "vector_db")
            
            logger.info(f"Using milvus collection: {collection_name}")
            url = urlparse(config.vector_store.url)
            vector_store = Milvus(
                document_embedder,
                connection_args={"host": url.hostname, "port": url.port},
                collection_name=collection_name,
                auto_id = True
            )
        else:
            raise ValueError(f"{config.vector_store.name} vector database is not supported")
        
        logger.info("Vector store created and saved.")
        return vector_store
    
    @classmethod
    def get_docs_vector_store_langchain(cls, vector_store: langchain_core.vectorstores.VectorStore) -> List[str]:
        config = ServerConfigWizard.get_config()

        try:
            # No API availbe in LangChain for listing the docs, thus usig its private _dict
            extract_filename = lambda metadata : os.path.splitext(os.path.basename(metadata['source']))[0]
            if config.vector_store.name == "faiss":
                in_memory_doc_store = vector_store.docstore._dict
                filenames = [extract_filename(doc.metadata) for doc in in_memory_doc_store.values()]
                filenames = list(set(filenames))
                return filenames
            elif config.vector_store.name == "pgvector":
                # No API availbe in LangChain for listing the docs, thus usig its private _make_session
                with vector_store._make_session() as session:
                    embedding_doc_store = session.query(
                        vector_store.EmbeddingStore.custom_id, 
                        vector_store.EmbeddingStore.document, 
                        vector_store.EmbeddingStore.cmetadata
                    ).all()
                    filenames = set([extract_filename(metadata) for _, _, metadata in embedding_doc_store if metadata])
                    return filenames
            elif config.vector_store.name == "milvus":
                # Getting all the ID's > 0
                if vector_store.col:
                    milvus_data = vector_store.col.query(expr="pk >= 0", output_fields=["pk","source", "text"])
                    filenames = set([extract_filename(metadata) for metadata in milvus_data])
                    return filenames
        except Exception as e:
            logger.error(f"Error occurred while retrieving documents: {e}")
        return []
    
    @classmethod
    def del_docs_vector_store_langchain(
        cls, 
        vector_store: langchain_core.vectorstores.VectorStore, 
        filenames: List[str]
    ) -> bool:
        config = ServerConfigWizard.get_config()

        try:
            # No other API availbe in LangChain for listing the docs, thus usig its private _dict
            extract_filename = lambda metadata : os.path.splitext(os.path.basename(metadata['source']))[0]
            if config.vector_store.name == "faiss":
                in_memory_docstore = vector_store.docstore._dict
                for filename in filenames:
                    ids_list = [doc_id for doc_id, doc_data in in_memory_docstore.items() if extract_filename(doc_data.metadata) == filename]
                    if not len(ids_list):
                        logger.info("File does not exist in the vector_store")
                        return False
                    vector_store.delete(ids_list)
                    logger.info(f"Deleted documents with filenames {filename}")
            elif config.vector_store.name == "pgvector":
                with vector_store._make_session() as session:
                    collection = vector_store.get_collection(session)
                    filter_by = vector_store.EmbeddingStore.collection_id == collection.uuid
                    embedding_doc_store = session.query(vector_store.EmbeddingStore.custom_id, vector_store.EmbeddingStore.document, vector_store.EmbeddingStore.cmetadata).filter(filter_by).all()
                for filename in filenames:
                    ids_list = [doc_id for doc_id, doc_data, metadata in embedding_doc_store if extract_filename(metadata) == filename]
                    if not len(ids_list):
                        logger.info("File does not exist in the vector_store")
                        return False
                    vector_store.delete(ids_list)
                    logger.info(f"Deleted documents with filenames {filename}")
            elif config.vector_store.name == "milvus":
                # Getting all the ID's > 0
                milvus_data = vector_store.col.query(expr="pk >= 0", output_fields=["pk","source", "text"])
                for filename in filenames:
                    ids_list = [metadata["pk"] for metadata in milvus_data if extract_filename(metadata) == filename]
                    if not len(ids_list):
                        logger.info("File does not exist in the vector_store")
                        return False
                    vector_store.col.delete(f"pk in {ids_list}")
                    logger.info(f"Deleted documents with filenames {filename}")
                    return True
        except Exception as e:
            logger.error(f"Error occurred while deleting documents: {e}")
            return False
        