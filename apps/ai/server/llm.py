import os
import torch
import logging
import langchain.llms.base
import langchain_core.language_models.chat_models
logger = logging.getLogger(__name__)

from functools import lru_cache, wraps
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from langchain_community.llms import HuggingFacePipeline
from langchain.callbacks.base import BaseCallbackHandler
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.messages import HumanMessage
from langchain_nvidia_ai_endpoints import ChatNVIDIA
from wrappers.convert_to_hashable_args_wrapper import convert_to_hashable_args_wrapper
from config_wizards.server_config_wizard import ServerConfigWizard

class LLM:
    def __init__(
            self, 
            model_name="mixtral_8x7b", 
            model_type="NVIDIA", 
            is_response_generator=False, 
            callback_handler=BaseCallbackHandler, 
            **kwargs
        ):
        self.llm = self.create_llm(
            model_name, 
            model_type, 
            is_response_generator, 
            **kwargs
        )
        self.callback_handler = callback_handler

    def chat_with_prompt(self, system_prompt, prompt):
        langchain_prompt = ChatPromptTemplate.from_messages([("system", system_prompt), ("user", "{input}")])
        chain = langchain_prompt | self.llm | StrOutputParser()
        logger.info(f"Prompt used for response generation: {langchain_prompt.format(input=prompt)}")
        response = chain.stream({"input": prompt}, config={"callbacks": [self.callback_handler]})
        return response

    def multimodal_invoke(self, b64_string, steer=False, creativity=0, quality=9, complexity=0, verbosity=8):
        message = HumanMessage(
            content=[
                {"type": "text", "text": "Describe this image in detail:"},
                {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{b64_string}"}}
            ]
        )
        if steer:
            return self.llm.invoke([message], labels={"creativity": creativity, "quality": quality, "complexity": complexity, "verbosity": verbosity}, callbacks=[self.callback_handler])
        else:
            return self.llm.invoke([message])

    @classmethod    
    @convert_to_hashable_args_wrapper
    @lru_cache()
    def get_llm(cls, model_name, callback_handler, is_response_generator=False, **kwargs):
        return LLM(
            model_name=model_name, 
            is_response_generator=is_response_generator, 
            callback_handler=callback_handler,
            **kwargs
        )
    
    @classmethod
    def create_llm(cls, model_name: str, model_type="NVIDIA", is_response_generator=False, **kwargs):
        if model_type == "NVIDIA":
            llm = cls.get_nvidia_llm(model_name, is_response_generator, **kwargs)
        elif model_type == "LOCAL":
            llm = cls.get_local_llm(model_name, **kwargs)
        else:
            print("Error! Need model_name and model_type!")
            exit()

        return llm
    
    @classmethod
    def get_nvidia_llm(cls, model_name: str, is_response_generator: bool = False, **kwargs):
        if is_response_generator:
            return cls.get_nvidia_llm_with_settings(**kwargs)
        else:
            return ChatNVIDIA(
                model=model_name,
                temperature = kwargs.get('temperature', None),
                top_p = kwargs.get('top_p', None),
                max_tokens = kwargs.get('max_tokens', None),
            )
        
    @classmethod
    def get_local_llm(cls, model_path, **kwargs):
        tokenizer = AutoTokenizer.from_pretrained(model_path, trust_remote_code=True)
        model = AutoModelForCausalLM.from_pretrained(
            model_path, 
            torch_dtype=torch.float16,
            trust_remote_code=True,
            device_map="auto"
            )

        pipe = pipeline(
            "text-generation",
            model=model,
            tokenizer=tokenizer,
            max_length=kwargs.get('max_tokens',1024),
            temperature=kwargs.get('temperature', 0.6),
            top_p=kwargs.get('top_p', 0.3),
            repetition_penalty=1.0
        )

        return HuggingFacePipeline(pipeline=pipe)
    
    @classmethod
    @convert_to_hashable_args_wrapper
    @lru_cache()
    def get_nvidia_llm_with_settings(cls, **kwargs) -> langchain.llms.base.LLM | langchain_core.language_models.chat_models.SimpleChatModel:
        settings = ServerConfigWizard.get_config()

        logger.info(f"Using {settings.llm.model_engine} as model engine for llm. Model name: {settings.llm.model_name}")
        if settings.llm.model_engine == "nvidia-ai-endpoints":
            unused_params = [key for key in kwargs.keys() if key not in ['temperature', 'top_p', 'max_tokens']]
            if unused_params:
                logger.warning(f"The following parameters from kwargs are not supported: {unused_params} for {settings.llm.model_engine}")
            if settings.llm.server_url:
                logger.info(f"Using llm model {settings.llm.model_name} hosted at {settings.llm.server_url}")
                return ChatNVIDIA(
                    base_url=f"http://{settings.llm.server_url}/v1",
                    model=settings.llm.model_name,
                    temperature = kwargs.get('temperature', None),
                    top_p = kwargs.get('top_p', None),
                    max_tokens = kwargs.get('max_tokens', None),
                )
            else:
                logger.info(f"Using llm model {settings.llm.model_name} from api catalog")
                return ChatNVIDIA(
                    model=settings.llm.model_name,
                    temperature = kwargs.get('temperature', None),
                    top_p = kwargs.get('top_p', None),
                    max_tokens = kwargs.get('max_tokens', None),
                )
        else:
            raise RuntimeError("Unable to find any supported Large Language Model server. Supported engine name is nvidia-ai-endpoints.")
        

if __name__ == "__main__":
    llm = LLM.get_llm("gpt2", "LOCAL")

    from langchain_core.output_parsers import StrOutputParser
    from langchain_core.prompts import ChatPromptTemplate
    from langchain import LLMChain

    system_prompt = ""
    prompt = "who are you"
    langchain_prompt = ChatPromptTemplate.from_messages([("system", system_prompt), ("user", "{input}")])
    chain = langchain_prompt | llm | StrOutputParser()

    response = chain.stream({"input": prompt})

    for chunk in response:
        print(chunk)