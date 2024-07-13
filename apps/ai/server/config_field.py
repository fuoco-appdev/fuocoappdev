from typing import Any, Callable, Dict, List, Optional, TextIO, Tuple, Union
from dataclass_wizard.models import JSONField
from dataclass_wizard.utils.string_conv import to_camel_case
from dataclass_wizard import (
    JSONWizard,
    LoadMeta,
    YAMLWizard,
    errors,
    fromdict,
    json_field,
)

def config_field(
    name: str,
    *,
    env: bool = True,
    help_text: str = "",
    **kwargs: Any
) -> JSONField:
    if not isinstance(name, str):
        raise TypeError("Provided name must be a string.")
    
    json_name = to_camel_case(name)
    meta = kwargs.get("metadata", {})
    meta["env"] = env
    meta["help"] = help_text
    kwargs["metadata"] = meta

    field = json_field(json_name, **kwargs)
    return field