import logging
import os
import shutil
import importlib
from uuid import uuid4
from typing import Any, Dict, List
from inspect import getmembers, isclass
from fastapi import FastAPI, Request
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi import FastAPI, File, UploadFile, Request
from pymilvus.exceptions import MilvusException, MilvusUnavailableException
from contextlib import asynccontextmanager
from starlette.status import HTTP_422_UNPROCESSABLE_ENTITY
from pathlib import Path
from models.health_response_model import HealthResponseModel
from models.chain_response_model import ChainResponseModel
from models.chain_response_choices_model import ChainResponseChoicesModel
from models.document_search_response_model import DocumentSearchResponseModel
from models.documents_response_model import DocumentsResponseModel
from models.document_chunk_model import DocumentChunkModel
from models.document_search_model import DocumentSearchModel
from models.prompt_model import PromptModel
from models.message_model import MessageModel
from tracer import Tracer
from wrappers.llama_index_instrumentation_wrapper import llama_index_instrumentation_wrapper
from rag import RAG
from dotenv import load_dotenv, dotenv_values 

load_dotenv() 

logging.basicConfig(level=os.environ.get('LOGLEVEL', 'INFO').upper())
logger = logging.getLogger(__name__)

Tracer.load()

rag = RAG()

app = FastAPI()
origins = [
    "*"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.exception_handler(RequestValidationError)
async def request_validation_exception_handler(
        request: Request, exception: RequestValidationError
) -> JSONResponse:
    return JSONResponse(
        status_code=HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": jsonable_encoder(exception.errors(), exclude={"input"})}
    )

@app.get("/health", response_model=HealthResponseModel, responses={
  500: {
      "description": "Internal Server Error",
      "content": {
          "application/json": {
              "rag": {"detail": "Internal server error occured"}
          }
      }
  }  
})
def health_check():
    return HealthResponseModel(message="Service is up.")

@app.post("/documents", responses={
    500: {
        "description": "Internal Server Error",
        "content": {
            "application/json": {
                "rag": {"detail": "Internal server error occured"}
            }
        }
    }
})
@llama_index_instrumentation_wrapper
async def upload_document(request: Request, file: UploadFile = File(...)) -> JSONResponse:
    if not file.filename:
        return JSONResponse(content={"message": "No files provided"}, status_code=200)
    
    try:
        upload_folder = "/tmp-data/uploaded_files"
        upload_file = os.path.basename(file.filename)
        if not upload_file:
            raise RuntimeError("Error parsing uploaded filename.")
        
        file_path = os.path.join(upload_folder, upload_file)
        uploads_dir = Path(upload_folder)
        uploads_dir.mkdir(parents=True, exist_ok=True)

        with open(file_path, "wb") as f:
            shutil.copyfileobj(file.file, f)

        rag.ingest_docs(file_path, upload_file)

        return JSONResponse(
            content={"message": "File uploaded successfully"}, status_code=200
        )
    except Exception as e:
        logger.error("Error from POST /documents endpoint. Ingestion of file: " + file.filename + " failed with error: " + str(e))
        return JSONResponse(
            content={"message": str(e)},
            status_code=500
        )
    
@app.post("/generate", response_model=ChainResponseModel, responses={
    500: {
        "description": "Internal Server Error",
        "content": {
            "application/json": {
                "rag": {"detail": "Internal server error occured"}
            }
        }
    }
})
@llama_index_instrumentation_wrapper
async def generate_answer(request: Request, prompt: PromptModel) -> StreamingResponse:
    chat_history = prompt.messages
    last_user_message = next((message.content for message in reversed(chat_history) if message.role == 'user'), None)

    for i in reversed(range(len(chat_history))):
        if chat_history[i].role == 'user':
            del chat_history[i]
            break

    llm_settings = {
        key: value for key, value in vars(prompt).items() if key not in ['messages', 'use_knowledge_base']
    }
    
    try:
        generator = None
        if prompt.use_knowledge_base:
            logger.info("Knowledge base is enabled. Using rag chain for response generation.")
            generator = rag.rag_chain(query=last_user_message, chat_history=chat_history, **llm_settings)
        else:
            generator = rag.llm_chain(query=last_user_message, chat_history=chat_history, **llm_settings)

        def response_generator():
            response_id = str(uuid4())
            if generator:
                logger.debug(f"Generated response chunks\n")
                for chunk in generator:
                    chain_response = ChainResponseModel()
                    response_choices = ChainResponseChoicesModel(
                        index=0,
                        message=MessageModel(
                            role="assistant",
                            content=chunk
                        )
                    )
                    chain_response.id = response_id
                    chain_response.choices.append(response_choices)
                    logger.debug(response_choices)
                    yield "data: " + str(chain_response.model_dump_json()) + "\n\n"
                
                chain_response = ChainResponseModel()
                response_choices = ChainResponseChoicesModel(
                    finish_reason="[DONE]"
                )
                chain_response.id = response_id
                chain_response.choices.append(response_choices)
                logger.debug(response_choices)
                yield "data: " + str(chain_response.model_dump_json()) + "\n\n"
            else:
                chain_response = ChainResponseModel()
                yield "data: " + str(chain_response.model_dump_json()) + "\n\n"

        return StreamingResponse(response_generator(), media_type="text/event-stream")
    except (MilvusException, MilvusUnavailableException) as e:
        exception_message = "Error from milvus server. Please ensure you have ingested some documents. Please check chain-server logs for more details."
        chain_response = ChainResponseModel()
        response_choices = ChainResponseChoicesModel(
            index=0,
            message=MessageModel(
                role="assistant",
                content=exception_message
            ),
            finish_reason="[DONE]"
        )
        chain_response.choices.append(response_choices)
        logger.error(f"Error from Milvus database in /generate endpoint. Please ensure you have ingested some documents. Error details: {e}")
        return StreamingResponse(iter(["data: " + str(chain_response.model_dump_json()) + "\n\n"]), media_type="text/event-stream", status_code=500)
    except Exception as e:
        exception_message = "Error from chain server. Please check chain-server logs for more details."
        chain_response = ChainResponseModel()
        response_choices = ChainResponseChoicesModel(
            index=0,
            message=MessageModel(
                role="assistant",
                content=exception_message
            ),
            finish_reason="[DONE]"
        )
        chain_response.choices.append(response_choices)
        logger.error(f"Error from /generate endpoint. Error details: {e}")
        return StreamingResponse(iter(["data: " + str(chain_response.model_dump_json()) + "\n\n"]), media_type="text/event-stream", status_code=500)
    
@app.post("/search", response_model=DocumentSearchResponseModel, responses={
    500: {
        "description": "Internal Server Error",
        "content": {
            "application/json": {
                "rag": {"detail": "Internal server error occured"}
            }
        }
    }
})
@llama_index_instrumentation_wrapper
async def document_search(request: Request, data: DocumentSearchModel) -> Dict[str, List[Dict[str, Any]]]:
    try:
        if (hasattr(rag, "document_search") and callable(rag.document_search)):
            search_result = rag.document_search(data.query, data.max_documents)
            chunks = []
            for entry in search_result:
                content = entry.get("content", "")
                source = entry.get("source", "")
                score = entry.get("score", 0.0)
                chunk = DocumentChunkModel(
                    content=content,
                    filename=source,
                    document_id="",
                    score=score
                )
                chunks.append(chunk)
            return NotImplementedError("Example class has not implemented the document_search method.")

    except Exception as e:
        logger.error(f"Error from POST /search endpoint. Error details: {e}")
        return JSONResponse(content={"message": "Error occured while searching documents."}, status_code=500)
    
@app.get("/documents", response_model=DocumentsResponseModel, responses={
    500: {
        "description": "Internal Server Error",
        "content": {
            "application/json": {
                "rag": {"detail": "Internal server error occurred"}
            }
        }
    }
})
@llama_index_instrumentation_wrapper
async def get_documents(request: Request) -> DocumentsResponseModel:
    try:
        if hasattr(rag, "get_documents") and callable(rag.get_documents):
            documents = rag.get_documents()
            return DocumentsResponseModel(documents=documents)
        else:
            raise NotImplementedError("Example class has not implemented the get_documents method.")

    except Exception as e:
        logger.error(f"Error from GET /documents endpoint. Error details: {e}")
        return JSONResponse(content={"message": "Error occurred while fetching documents."}, status_code=500)
    
@app.delete("/documents", responses={
    500: {
        "description": "Internal Server Error",
        "content": {
            "application/json": {
                "rag": {"detail": "Internal server error occurred"}
            }
        }
    }
})
@llama_index_instrumentation_wrapper
async def delete_document(request: Request, filename: str) -> JSONResponse:
    try:
        if hasattr(rag, "delete_documents") and callable(rag.delete_documents):
            status = rag.delete_documents([filename])
            if not status:
                raise Exception(f"Error in deleting document {filename}")
            return JSONResponse(content={"message": f"Document {filename} deleted successfully"}, status_code=200)

        raise NotImplementedError("Example class has not implemented the delete_document method.")

    except Exception as e:
        logger.error(f"Error from DELETE /documents endpoint. Error details: {e}")
        return JSONResponse(content={"message": f"Error deleting document {filename}"}, status_code=500)