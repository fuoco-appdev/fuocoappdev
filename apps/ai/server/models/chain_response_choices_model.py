from pydantic import BaseModel, Field
from models.message_model import MessageModel

class ChainResponseChoicesModel(BaseModel):
    index: int = Field(default=0, ge=0, le=256, format="int64")
    message: MessageModel = Field(default=MessageModel(role="assistant", content=""))
    finish_reason: str = Field(default="", max_length=4096, pattern=r'[\s\S]*')

