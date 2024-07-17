from wrappers.tracer_instrumentation_wrapper import tracer_instrumentation_wrapper
from wrappers.tracer_predict_instrumentation_wrapper import tracer_predict_instrumentation_wrapper
import mimetypes
from typing import List, Dict, Union, cast, Generator
from requests.exceptions import ConnectionError
import requests
import json
import logging
logger = logging.getLogger(__name__)

class ChatService:
    def __init__(self, server_url: str, model_name: str) -> None:
        self._server_url = server_url
        self._model_name = model_name
        self._default_model = "meta/llama3-70b-instruct"

    @property
    def model_name(self) -> str:
        return self._model_name
    
    @tracer_instrumentation_wrapper
    def search(
        self,
        carrier,
        prompt: str
    ) -> List[Dict[str, Union[str, float]]]:
        data = {
            "query": prompt,
            "top_k": 4
        }
        headers = {
            **carrier,
        }
        url = f"{self._server_url}/search"
        logger.debug(
            "looking up documents - %s",
            str({
                "server_url": url,
                "post_data": data
            })
        )

        try:
            with requests.post(
                url,
                headers,
                json=data,
                timeout=30
            ) as request:
                request.raise_for_status()
                response = request.json()
                return cast(List[Dict[str, Union[str, float]]], response)
        except Exception as e:
            logger.error(f"Failed to get response from /search endpoint of chain-server. Error details: {e}. Refer to chain-server logs for details.")
            return cast(List[Dict[str, Union[str, float]]], [])
        
    @tracer_predict_instrumentation_wrapper
    def predict(
        self,
        carrier,
        query: str,
        use_knowledge_base: bool,
    ) -> Generator[str, None, None]:
        data = {
            "messages": [
                {
                    "role": "user",
                    "content": query
                }
            ],
            "use_knowledge_base": use_knowledge_base
        }
        url = f"{self._server_url}/generate"
        headers = {
            **carrier,
        }

        try:
            with requests.post(
                url,
                headers,
                stream=True,
                json=data,
                timeout=50,
            ) as request:
                request.raise_for_status()
                for chunk in request.iter_lines():
                    raw_response = chunk.decode("UTF-8")
                    if not raw_response:
                        continue
                    
                    response_dict = None
                    try:
                        response_dict = json.loads(raw_response[6:])
                        response_choices = response_dict.get("choices", [])
                        if len(response_choices):
                            response_string = response_choices[0].get("message", {}).get("content", "")
                            yield response_string
                        else:
                            yield ""
                    except Exception as e:
                        raise ValueError(f"Invalid response json: {raw_response}") from e
        except Exception as e:
            logger.error(f"Failed to get response from /generate endpoint of chain-server. Error details {e}. Refer to chain-server logs for details.")
            yield str("Failed to get response from /generate endpoint of chain-server. Check if the fastapi server in chain-server is up. Refer to chain-server logs for details.")

        yield None

    @tracer_instrumentation_wrapper
    def upload_documents(
        self,
        carrier,
        file_paths: List[str]
    ) -> None:
        url = f"{self._server_url}/documents"
        headers = {
            **carrier,
            "accept": "application/json"
        }

        try:
            for file_path in file_paths:
                mime_type, _ = mimetypes.guess_type(file_path)
                files = {
                    "file": (file_path, open(file_path, "rb"), mime_type)}

                logger.debug(
                    "uploading file - %s",
                    str({"server_url": url, "file": file_path}),
                )

                response = requests.post(
                    url, 
                    headers=headers, 
                    files=files, 
                    timeout=600
                )
                if response.status_code == 500:
                    raise ValueError(f"{response.json().get('message', 'Failed to upload document')}")
        except Exception as e:
            logger.error(f"Failed to get response from /documents endpoint of chain-server. Error details: {e}. Refer to chain-server logs for details.")
            raise ValueError(f"{e}")
        
    @tracer_instrumentation_wrapper
    def delete_documents(
        self,
        carrier,
        file_name: str
    ) -> str:
        headers = {
            **carrier,
            "accept": "application/json",
            "Content-Type": "application/json"
        }
        params = {
            "filename": file_name
        }
        url = f"{self._server_url}/documents"

        try:
            logger.debug(
                f"Delete request received for file_name: {file_name}"
            )
            with requests.delete(
                url, 
                headers=headers, 
                params=params, 
                timeout=30
            ) as request:
                request.raise_for_status()
                response = request.json()
                return response
        except Exception as e:
            logger.error(f"Failed to delete {file_name} using /documents endpoint of chain-server. Error details: {e}. Refer to chain-server logs for details.")
            return ""
    
    @tracer_instrumentation_wrapper
    def get_uploaded_documents(self, carrier) -> List[str]:
        url = f"{self._server_url}/documents"
        headers = {
            **carrier,
            "accept": "application/json",
        }
        uploaded_files=[]
        try:
            response = requests.get(
                url, 
                headers=headers, 
                timeout=600
            )
            json_response = json.loads(response.content)
            if response.status_code == 500:
                raise ValueError(f"{response.json().get('message', 'Failed to get uploaded documents')}")
            else:
                uploaded_files=json_response['documents']
        except ConnectionError as e:
            # Avoid playground crash when chain server starts after rag-playground
            logger.error(f"Failed to connect /documents endpoint of chain-server. Error details: {e}.")
        except Exception as e:
            logger.error(f"Failed to get response from /documents endpoint of chain-server. Error details: {e}. Refer to chain-server logs for details.")
            raise ValueError(f"{e}")
        return uploaded_files