import gradio
import os
import functools
from typing import Any, Dict, List, Tuple, Union
from services.chat_service import ChatService
import logging
logger = logging.getLogger(__name__)

class App():
    def __init__(self) -> None:
        pass

    def create(self):
        with gradio.Blocks(title= "RAG Chatbot Q&A",
            theme = "Soft"
            ) as root:
            with gradio.Column():
                with gradio.Row():
                    chat_history = gradio.Chatbot(value=[], elem_id='chatbot', height=680)
                    show_img = gradio.Image(label='Overview', height=680)

            with gradio.Row():
                with gradio.Column(scale=0.60):
                    text_input = gradio.Textbox(
                        show_label=False,
                        placeholder="Type here to ask your PDF",
                    container=False)

                with gradio.Column(scale=0.20):
                    submit_button = gradio.Button('Send')

                with gradio.Column(scale=0.20):
                    uploaded_file = gradio.UploadButton("📁 Upload PDF", file_types=[".pdf", ".ppt"])
                    

            return root, chat_history, show_img, text_input, submit_button, uploaded_file
        
    def launch(self, chat_service: ChatService):
        root, chat_history, show_img, text_input, submit_button, uploaded_file = self.create()
        # Set up event handlers
        with root:
            # Event handler for uploading a PDF
            # uploaded_file.upload(pdf_chatbot.render_file, inputs=[uploaded_file], outputs=[show_img])

            # Event handler for submitting text and generating response
            text_stream = functools.partial(self.stream_predict, chat_service)
            text_input.submit(
                text_stream, inputs=[text_input, chat_history], outputs=[text_input, chat_history]
            )
            submit_button.click(text_stream, inputs=[text_input, chat_history], outputs=[text_input, chat_history])

        root.queue()    
        root.launch()

    def stream_predict(
        self,
        chat_service: ChatService,
        question: str,
        chat_history: List[Tuple[str, str]]
    ) -> Any:
        chunks = ""
        chat_history = chat_history or []
        use_knowledge_base = False

        documents: Union[None, List[Dict[str, Union[str, float]]]] = None
        if use_knowledge_base:
            documents = chat_service.search(prompt=question)

        for chunk in chat_service.predict(
            query=question, 
            use_knowledge_base=use_knowledge_base,
        ):
            if chunk:
                chunks += chunk
                yield "", chat_history + [[question, chunks]]
            else:
                yield "", chat_history + [[question, chunks]]