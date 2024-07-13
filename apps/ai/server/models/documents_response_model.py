from pydantic import BaseModel, Field, constr
from typing import Any, Dict, List

class DocumentsResponseModel(BaseModel):
    documents: List[constr(max_length=131072, pattern=r'[\s\S]*')] = Field(description="List of filenames.", max_items=1000000, default=[])