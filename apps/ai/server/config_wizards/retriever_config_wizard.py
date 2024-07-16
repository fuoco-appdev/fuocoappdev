from config_wizard import ConfigWizard
from dataclasses import dataclass
from config_field import config_field

@dataclass(frozen=True)
class RetrieverConfigWizard(ConfigWizard):
    top_k: int = config_field(
        "top-k",
        default=4,
        help_text="Number of relevant results to retrieve",
    )
    score_threshold: float = config_field(
        "score-threshold",
        default=0.25,
        help_text="The minimum confidence score for the retrieved values to be considered",
    )
    nr_url: str = config_field(
        "nr-url",
        default='http://retrieval-ms:8000',
        help_text="The nemo retriever microservice url",
    )
    nr_pipeline: str = config_field(
        "nr-pipeline",
        default='ranked_hybrid',
        help_text="The name of the nemo retriever pipeline one of ranked_hybrid or hybrid",
    )