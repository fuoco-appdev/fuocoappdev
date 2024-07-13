from pydantic import BaseModel, Field
from typing import Any, Dict, List
from models.chain_response_choices_model import ChainResponseChoicesModel

class DocumentSearchModel(BaseModel):
    query: str = Field(description="The content or keywords to search for within documents.", max_length=131072, pattern=r'[\s\S]*', default="")
    max_documents: int = Field(description="The maximum number of documents to return in the response.", default=4, ge=0, le=25, format="int64")