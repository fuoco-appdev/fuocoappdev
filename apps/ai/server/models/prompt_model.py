import bleach

from pydantic import BaseModel, Field, constr, field_validator
from typing import Any, Dict, List
from models.message_model import MessageModel

class PromptModel(BaseModel):
    messages: List[MessageModel] = Field(..., description="A list of messages comprising the conversation so far. The roles of the messages must me alternating between user and assistant. The last input message should have a role user. A message with the system role is optional, and must be the very first message if it is present.", max_items=50000)
    use_knowledge_base: bool = Field(..., description="Whether to use a knowledge base")
    temperature: float = Field(0.2, description="The sampling temperature to use for text generation. The higher the temperature value is, the less deterministic the output text will be. It is not recommended to modify both temperature and top_p in the same call.", ge=0.1, le=1.0)
    probability_mass: float = Field(0.7, description="The probability_mass sampling mass used for text generation. The probability_mass value determines the probability mass that is sampled at sampling time. For example, if probability_mass = 0.2, only the most likely tokens (summing to 0.2 cumulative probability) will be sampled. It is not recommended to modify both temperature and probability_mass in the same call.", ge=0.1, le=1.0)
    max_tokens: int = Field(1024, description="The maximum number of tokens to generate in any given call. Note that the model is not aware of this value, and generation will simply stop at the number of tokens specified.", ge=0, le=1024, format="int64")
    stop: List[constr(max_length=256, pattern=r'[\s\S]*')] = Field(description="A string or a list of strings where the API will stop generating further tokens. The returned text will no contain the stop sequence.", max_items=256, default=[])

    @field_validator('use_knowledge_base')
    def clean_use_knowledge_base(cls, value):
        value = bleach.clean(str(value), strip=True)
        try:
            return {"True": True, "False": False}[value]
        except KeyError:
            raise ValueError("use_knowledge_base must be a boolean value")
    
    @field_validator('temperature')
    def clean_temperature(cls, value):
        return float(bleach.clean(str(value), strip=True))
    
    @field_validator('probability_mass')
    def clean_probability_mass(cls, value):
        return float(bleach.clean(str(value), strip=True))


