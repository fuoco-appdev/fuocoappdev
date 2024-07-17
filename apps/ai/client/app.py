import gradio
import os
import functools
from typing import Any, Dict, List, Tuple, Union
from services.chat_service import ChatService
from pathlib import Path
import logging
logger = logging.getLogger(__name__)

UPLOADED_FILES_PATH = os.getenv('UPLOADED_FILES_PATH', 'assets/tmp/uploaded_files.txt')

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
                    file_output = gradio.Files()
                    context = gradio.JSON(
                        scale=1,
                        label="Knowledge Base Context",
                        visible=False,
                        elem_id="context",
                    )

            with gradio.Row():
                with gradio.Column(scale=0.60):
                    text_input = gradio.Textbox(
                        show_label=False,
                        placeholder="Type here to ask your PDF",
                    container=False)

                with gradio.Column(scale=0.20):
                    submit_button = gradio.Button('Send')

                with gradio.Column(scale=0.20):
                    uploaded_file = gradio.UploadButton("📁 Upload PDF", file_types=[".pdf", ".ppt"], file_count="multiple")
                    
                with gradio.Column(scale=0.20):
                    checkbox = gradio.Checkbox(
                        label="Use knowledge base", info="", value=False
                    )

            return root, chat_history, file_output, context, text_input, submit_button, uploaded_file, checkbox
        
    def launch(self, chat_service: ChatService):
        root, chat_history, file_output, context, text_input, submit_button, uploaded_file, checkbox = self.create()
        # Set up event handlers
        with root:
            file_output.value = self.get_uploaded_files(chat_service)
            uploaded_file.upload(lambda files: self.upload_file(files, chat_service), inputs=[uploaded_file], outputs=[file_output])
            checkbox.change(self.toggle_context, inputs=[checkbox], outputs=[context])
            
            text_stream_function = functools.partial(self.stream_predict, chat_service)
            text_input.submit(
                text_stream_function, inputs=[text_input, chat_history, checkbox], outputs=[text_input, chat_history, context]
            )
            submit_button.click(text_stream_function, inputs=[text_input, chat_history, checkbox], outputs=[text_input, chat_history, context])

        root.queue()    
        root.launch()

    def stream_predict(
        self,
        chat_service: ChatService,
        question: str,
        chat_history: List[Tuple[str, str]],
        use_knowledge_base: bool
    ) -> Any:
        chunks = ""
        chat_history = chat_history or []

        documents: Union[None, List[Dict[str, Union[str, float]]]] = None
        if use_knowledge_base:
            documents = chat_service.search(prompt=question)

        for chunk in chat_service.predict(
            query=question, 
            use_knowledge_base=use_knowledge_base,
        ):
            if chunk:
                chunks += chunk
                yield "", chat_history + [[question, chunks]], documents
            else:
                yield "", chat_history + [[question, chunks]], documents

    def upload_file(
            self, 
            files: List[Path], 
            chat_service: ChatService
    ) -> List[str]:
        try:
            file_paths = [file.name for file in files]
            chat_service.upload_documents(file_paths = file_paths)

            # Save the uploaded file names to the state file
            with open(UPLOADED_FILES_PATH, 'a') as file:
                for file_path in file_paths:
                    file_path = os.path.basename(file_path)
                    file.write(file_path + '\n')

            return file_paths
        except Exception as e:
            raise gradio.Error(f"{e}")
        
    def get_uploaded_files(
            self, 
            chat_service: ChatService,

    )-> List[str]:
        uploaded_files = ["No Files uploaded"]
        response = chat_service.get_uploaded_documents()
        extract_filename = lambda file : os.path.splitext(os.path.basename(file))[0]
        if len(response) > 0:
            uploaded_files=[extract_filename(file) for file in response]
        return uploaded_files
        
    def toggle_context(self, checkbox: bool) -> Any:
        return gradio.update(visible=checkbox)