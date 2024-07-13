from pydantic import BaseModel, Field
from typing import Any, Dict, List
from models.document_chunk_model import DocumentChunkModel

class DocumentSearchResponseModel(BaseModel):
    chunks: List[DocumentChunkModel] = Field(..., description="List of document chunks.", max_items=256)