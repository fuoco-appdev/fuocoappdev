import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { ButtonStyles } from '../Button/Button';
import { InputStyles } from '../Input/Input';

export interface MagicLinkStyles {
  buttonContainer?: ViewStyle | TextStyle | ImageStyle;
  buttonContent?: ViewStyle | TextStyle | ImageStyle;
  buttonIcon?: ViewStyle | TextStyle | ImageStyle;
  link?: ViewStyle | TextStyle | ImageStyle;
}

export interface ExtraMagicLinkStyles {
  input?: InputStyles;
  button?: ButtonStyles;
}
