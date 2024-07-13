from pydantic import BaseModel, Field
from typing import Any, Dict, List

class DocumentChunkModel(BaseModel):
    content: str = Field(description="The content of the document chunk.", max_length=131072, pattern=r'[\s\S]*', default="")
    filename: str = Field(description="The name of the file the chunk belongs to.", max_length=4096, pattern=r'[\s\S]*', default="")
    score: float = Field(..., description="The relevance score of the chunk.")