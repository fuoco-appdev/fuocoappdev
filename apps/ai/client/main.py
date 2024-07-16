from custom_logging import CustomLogging
from services.chat_service import ChatService
from app import App
from tracer import Tracer
from dotenv import load_dotenv, dotenv_values 
import os
import sys
import typing
import gradio

load_dotenv() 

verbosity = int(os.environ.get("APP_VERBOSITY", "1"))
CustomLogging.configure(verbosity)

Tracer.create_resource()

server_url = os.environ.get("SERVER_URL", "http://localhost:8000")
model_name = os.environ.get("MODEL_NAME", "meta/llama3-70b-instruct")

chat_service = ChatService(
    server_url,
    model_name
)

app = App()
app.launch(chat_service)