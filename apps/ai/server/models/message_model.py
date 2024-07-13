import bleach

from pydantic import BaseModel, Field, field_validator

class MessageModel(BaseModel):
    role: str = Field(description="Role for a message AI, User and System", default="user", max_length=256, pattern=r'[\s\S]*')
    content: str = Field(description="The input query/prompt to the pipeline.", default="I am going to Paris, what should I see?", max_length=131072, pattern=r'[\s\S]*')

    @field_validator('role')
    def validate_role(cls, value):
        value = bleach.clean(value, strip=True)
        valid_roles = {'user', 'assistant', 'system'}
        if value.lower() not in valid_roles:
            raise ValueError("Role must be on of 'user', 'assistant', or 'system'")
        return value.lower()
    
    @field_validator('content')
    def clean_content(cls, value):
        return bleach.clean(value, strip=True)