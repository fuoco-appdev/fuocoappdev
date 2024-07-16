from functools import lru_cache, wraps
from dataclasses import _MISSING_TYPE, dataclass
from typing import Any, Callable, Dict, List, Optional, TextIO, Tuple, Union
from dataclass_wizard import (
    JSONWizard,
    LoadMeta,
    YAMLWizard,
    errors,
    fromdict,
    json_field,
)
from shell_color import ShellColor
import os
import json
import logging
import yaml

@dataclass(frozen=True)
class ConfigWizard(JSONWizard, YAMLWizard):
    logger = logging.getLogger(__name__)

    @classmethod
    def print_help(
        cls,
        help_printer: Callable[[str], Any],
        *,
        env_parent: Optional[str] = None,
        json_parent: Optional[Tuple[str, ...]] = None
    ) -> None:
        if not env_parent:
            env_parent = ""
            help_printer("---\n")
        if not json_parent:
            json_parent = ()

        for (_, value) in (cls.__dataclass_fields__.items()):
            json_name = value.json.keys[0]
            env_name = json_name.upper()
            full_env_name = f"SERVER{env_parent}_{env_name}"
            is_embedded_config = hasattr(value.type, "envvars")

            indent = len(json_parent) * 2
            if is_embedded_config:
                default = ""
            elif not isinstance(value.default_factory, _MISSING_TYPE):
                default = value.default_factory()
            elif isinstance(value.default, _MISSING_TYPE):
                default = "NO-DEFAULT-VALUE"
            else:
                default = value.default
            
            help_printer(
                f"{ShellColor.BOLD}{' ' * indent}{json_name}:{ShellColor.END} {default}\n"
            )

            if is_embedded_config:
                indent += 2
            
            if value.metadata.get("help"):
                help_printer(f"{' ' + indent}# {value.metadata['help']}\n")

            if not is_embedded_config:
                type_string = getattr(value.type, "__name__", None) or str(value.type).replace("typing.", "")
                help_printer(f"{' ' * indent}# Type: {type_string}\n")

            if value.metadata.get("env", True):
                help_printer(f"{' ' * indent}# ENV Variable: {full_env_name}\n")

            help_printer("\n")

            if is_embedded_config:
                new_env_parent = f"{env_parent}_{env_name}"
                new_json_parent = json_parent + (json_name,)
                value.type.print_help(
                    help_printer, env_parent=env_parent, json_parent=new_json_parent
                )

        help_printer("\n")

    @classmethod
    def get_envvars(
        cls,
        env_parent: Optional[str] = None,
        json_parent: Optional[Tuple[str, ...]] = None,
    ) -> List[Tuple[str, Tuple[str, ...], type]]:
        if not env_parent:
            env_parent = ""
        if not json_parent:
            json_parent = ()
        output = []

        for (
            _,
            value,
        ) in (
            cls.__dataclass_fields__.items()  # pylint: disable=no-member; false positive
        ):  # pylint: disable=no-member; member is added by dataclass.
            jsonname = value.json.keys[0]
            envname = jsonname.upper()
            full_envname = f"SERVER{env_parent}_{envname}"
            is_embedded_config = hasattr(value.type, "envvars")

            # add entry to output list
            if is_embedded_config:
                new_env_parent = f"{env_parent}_{envname}"
                new_json_parent = json_parent + (jsonname,)
                output += value.type.envvars(
                    env_parent=new_env_parent, json_parent=new_json_parent
                )
            elif value.metadata.get("env", True):
                output += [(full_envname, json_parent + (jsonname,), value.type)]

        return output
    
    @classmethod
    def create_from_dict(cls, data: Dict[str, Any]) -> "ConfigWizard":
        if not data:
            data = {}
        if not isinstance(data, dict):
            raise RuntimeError("Configuration data is not a dictionary.")

        for envvar in cls.get_envvars():
            var_name, conf_path, var_type = envvar
            var_value = os.environ.get(var_name)
            if var_value:
                var_value = cls.try_json_load(var_value)
                cls.update_dict(data, conf_path, var_value)
                cls.logger.debug(
                    "Found EnvVar Config - %s:%s = %s",
                    var_name,
                    str(var_type),
                    repr(var_value),
                )

        LoadMeta(key_transform="CAMEL").bind_to(cls)
        return fromdict(cls, data)
    
    @classmethod
    def create_from_file(cls, filepath: str) -> Optional["ConfigWizard"]:
        try:
            file = open(filepath, encoding="utf-8")
        except FileNotFoundError:
            cls.logger.error("The configuration file cannot be found.")
            file = None
        except PermissionError:
            cls.logger.error(
                "Permission denied when trying to read the configuration file."
            )
            file = None
        if not file:
            return None

        # read the file
        try:
            data = cls.read_json_or_yaml(file)
        except ValueError as err:
            cls.logger.error(
                "Configuration file must be valid JSON or YAML. The following errors occured:\n%s",
                str(err),
            )
            data = None
            config = None
        finally:
            file.close()

        # parse the file
        if data:
            try:
                config = cls.create_from_dict(data)
            except errors.MissingFields as err:
                cls.logger.error(
                    "Configuration is missing required fields: \n%s", str(err)
                )
                config = None
            except errors.ParseError as err:
                cls.logger.error("Invalid configuration value provided:\n%s", str(err))
                config = None
        else:
            config = cls.create_from_dict({})

        return config
    
    @classmethod
    def read_json_or_yaml(cls, stream: TextIO) -> Dict[str, Any]:
        exceptions: Dict[str, Union[None, ValueError, yaml.error.YAMLError]] = {
            "JSON": None,
            "YAML": None,
        }
        data: Dict[str, Any]

        # ensure we can rewind the file
        if not stream.seekable():
            raise ValueError("The provided stream must be seekable.")

        # attempt to read json
        try:
            data = json.loads(stream.read())
        except ValueError as err:
            exceptions["JSON"] = err
        else:
            return data
        finally:
            stream.seek(0)

        # attempt to read yaml
        try:
            data = yaml.safe_load(stream.read())
        except (yaml.error.YAMLError, ValueError) as err:
            exceptions["YAML"] = err
        else:
            return data

        # neither json nor yaml
        err_msg = "\n\n".join(
            [key + " Parser Errors:\n" + str(val) for key, val in exceptions.items()]
        )
        raise ValueError(err_msg)
    
    @classmethod
    def try_json_load(cls, value: str) -> Any:
        try:
            return json.loads(value)
        except json.JSONDecodeError:
            return value

    @classmethod   
    def update_dict(
        cls,
        data: Dict[str, Any],
        path: Tuple[str, ...],
        value: Any,
        overwrite: bool = False,
    ) -> None:
        end = len(path)
        target = data
        for idx, key in enumerate(path, 1):
            # on the last field in path, update the dict if necessary
            if idx == end:
                if overwrite or not target.get(key):
                    target[key] = value
                return

            # verify the next hop exists
            if not target.get(key):
                target[key] = {}

            # if the next hop is not a dict, exit
            if not isinstance(target.get(key), dict):
                return

            # get next hop
            target = target.get(key)  # type: ignore[assignment] # type has already been enforced.
