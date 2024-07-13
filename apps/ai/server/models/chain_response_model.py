from pydantic import BaseModel, Field
from typing import Any, Dict, List
from models.chain_response_choices_model import ChainResponseChoicesModel

class ChainResponseModel(BaseModel):
    id: str = Field(default="", max_length=100000, pattern=r'[\s\S]*')
    choices: List[ChainResponseChoicesModel] = Field(default=[], max_items=256)