from pydantic import BaseModel, Field, constr
from typing import Any, Dict, List

class HealthResponseModel(BaseModel):
    message: str = Field(max_items=4096, pattern=r'[\s\S]*', default="")