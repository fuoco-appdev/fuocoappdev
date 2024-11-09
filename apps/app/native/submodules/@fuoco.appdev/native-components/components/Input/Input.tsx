import {
  FlexStyle,
  GestureResponderEvent,
  ImageStyle,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TextStyle,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
  useColorScheme,
  TextInput,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputFocusEventData,
  KeyboardTypeOptions,
  ColorValue,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { animated, useSpring } from '@react-spring/native';
import Colors from '../Themes/colors';
import MarginsPaddings from '../Themes/margins_paddings';
import Globals from '../Themes/globals';
import Button, { ButtonStyles } from '../Button/Button';
import { FormLayout, FormLayoutStyles } from '../FormLayout/FormLayout';
import {
  ContentCopy,
  ErrorOutline,
  Visibility,
  VisibilityOff,
} from '../Icon/Icons/Line';
import { useState } from 'react';
import Typography from '../Typography/Typography';

export interface InputStyles {
  root?: ViewStyle;
  container?: ViewStyle | TextStyle | ImageStyle;
  error?: ViewStyle | TextStyle | ImageStyle;
  withIcon?: ViewStyle | TextStyle | ImageStyle;
  borderless?: ViewStyle | TextStyle | ImageStyle;
  iconContainer?: ViewStyle | TextStyle | ImageStyle;
  input?: ViewStyle | TextStyle | ImageStyle;
  actionsContainer?: ViewStyle | TextStyle | ImageStyle;
}

export interface ExtraInputStyles {
  formLayout?: FormLayoutStyles;
  revealButton?: ButtonStyles;
}

export interface InputProps {
  autoComplete?:
    | 'additional-name'
    | 'address-line1'
    | 'address-line2'
    | 'birthdate-day'
    | 'birthdate-full'
    | 'birthdate-month'
    | 'birthdate-year'
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-day'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-number'
    | 'cc-name'
    | 'cc-given-name'
    | 'cc-middle-name'
    | 'cc-family-name'
    | 'cc-type'
    | 'country'
    | 'current-password'
    | 'email'
    | 'family-name'
    | 'gender'
    | 'given-name'
    | 'honorific-prefix'
    | 'honorific-suffix'
    | 'name'
    | 'name-family'
    | 'name-given'
    | 'name-middle'
    | 'name-middle-initial'
    | 'name-prefix'
    | 'name-suffix'
    | 'new-password'
    | 'nickname'
    | 'one-time-code'
    | 'organization'
    | 'organization-title'
    | 'password'
    | 'password-new'
    | 'postal-address'
    | 'postal-address-country'
    | 'postal-address-extended'
    | 'postal-address-extended-postal-code'
    | 'postal-address-locality'
    | 'postal-address-region'
    | 'postal-code'
    | 'street-address'
    | 'sms-otp'
    | 'tel'
    | 'tel-country-code'
    | 'tel-national'
    | 'tel-device'
    | 'url'
    | 'username'
    | 'username-new'
    | 'off';
  autoFocus?: boolean;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  placeholder?: string;
  placeholderTextColor?: ColorValue;
  type?: KeyboardTypeOptions;
  value?: string;
  customStyles?: InputStyles;
  customLightStyles?: InputStyles;
  customDarkStyles?: InputStyles;
  customExtraStyles?: ExtraInputStyles;
  customExtraDarkStyles?: ExtraInputStyles;
  customExtraLightStyles?: ExtraInputStyles;
  copy?: boolean;
  password?: boolean;
  defaultValue?: string;
  descriptionText?: string;
  disabled?: boolean;
  error?: string;
  icon?: any;
  inputRef?: React.RefObject<HTMLInputElement>;
  label?: string;
  afterLabel?: string;
  beforeLabel?: string;
  labelOptional?: string;
  reveal?: boolean;
  actions?: React.ReactNode;
  borderless?: boolean;
  shakeInterpolationCount?: number;
  shakeDistance?: number;
  textInputProps?: TextInputProps;
}

const inputStyles = StyleSheet.create<InputStyles>({
  root: {},
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: Globals.rounded_md,
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
  },
  error: {
    borderColor: Colors.red_500,
    borderWidth: 1,
    borderStyle: 'solid',
    fontFamily: Globals.font_family,
  },
  withIcon: {},
  borderless: {},
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginRight: MarginsPaddings.mp_4,
  },
  input: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
    paddingTop: MarginsPaddings.mp_4,
    paddingBottom: MarginsPaddings.mp_4,
    width: '100%',
    fontSize: Globals.font_size_sm,
    lineHeight: Globals.font_line_height_sm,
    fontFamily: Globals.font_family,
  },
  actionsContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: MarginsPaddings.mp_4,
    top: 0,
    bottom: 0,
    right: 0,
    paddingRight: MarginsPaddings.mp_5,
    paddingLeft: MarginsPaddings.mp_5,
  },
});
const inputLightStyles = StyleSheet.create<InputStyles>({
  root: {},
  container: {
    backgroundColor: Colors.gray_100,
  },
  error: {},
  withIcon: {},
  borderless: {},
  iconContainer: {
    color: Colors.gray_900,
  },
  input: {
    color: Colors.gray_900,
  },
  actionsContainer: {
    color: Colors.gray_900,
  },
});
const inputDarkStyles = StyleSheet.create<InputStyles>({
  root: {},
  container: {
    backgroundColor: Colors.dark_1,
  },
  error: {},
  withIcon: {},
  borderless: {},
  iconContainer: {
    color: Colors.gray_100,
  },
  input: {
    color: Colors.gray_100,
  },
  actionsContainer: {
    color: Colors.gray_100,
  },
});

function Input({
  autoComplete,
  autoFocus,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  placeholderTextColor,
  value,
  type,
  customStyles = {},
  customLightStyles = {},
  customDarkStyles = {},
  customExtraStyles = {},
  customExtraDarkStyles = {},
  customExtraLightStyles = {},
  copy,
  password,
  defaultValue,
  descriptionText,
  disabled,
  error,
  icon,
  inputRef,
  label,
  afterLabel,
  beforeLabel,
  labelOptional,
  reveal = false,
  actions,
  borderless = false,
  shakeInterpolationCount = 3,
  shakeDistance = 6,
  textInputProps,
}: InputProps) {
  const theme = useColorScheme();
  const [copyLabel, setCopyLabel] = useState('Copy');
  const [isHidden, setIsHidden] = useState(password);
  const isDarkTheme = theme === 'dark';

  const { x } = useSpring({
    from: { x: 0 },
    to: error ? { x: 1 } : { x: 0 },
    config: { mass: 1, tension: 500, friction: 100 },
  });

  const onCopy = (value: any) => {
    Clipboard.setString(value);
    setCopyLabel('Copied');
    setTimeout(() => {
      setCopyLabel('Copy');
    }, 3000);
  };

  const onReveal = () => {
    setIsHidden(!isHidden);
  };

  const interpolation: number[] = [];
  interpolation.push(0);

  for (let i = 0; i < shakeInterpolationCount; i++) {
    interpolation.push(-shakeDistance);
    interpolation.push(shakeDistance);
  }

  interpolation.push(0);

  return (
    <animated.View
      style={[
        {
          x: x.to([0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1], interpolation),
        },
        inputStyles.root as any,
        customStyles?.root ?? {},
        ...(isDarkTheme
          ? [inputDarkStyles?.root, customDarkStyles?.root ?? {}]
          : [inputLightStyles?.root, customLightStyles?.root ?? {}]),
      ]}
    >
      <FormLayout
        label={label}
        afterLabel={afterLabel}
        beforeLabel={beforeLabel}
        labelOptional={labelOptional}
        error={error}
        descriptionText={descriptionText}
        customStyles={customExtraStyles.formLayout}
        customDarkStyles={customExtraDarkStyles.formLayout}
        customLightStyles={customExtraLightStyles.formLayout}
      >
        <View
          style={[
            inputStyles.container,
            customStyles?.container ?? {},
            error ? inputStyles.error : {},
            ...(isDarkTheme
              ? [
                  inputDarkStyles?.container,
                  error ? inputDarkStyles.error : {},
                  customDarkStyles?.container ?? {},
                ]
              : [
                  inputLightStyles?.container,
                  error ? inputLightStyles.error : {},
                  customLightStyles?.container ?? {},
                ]),
          ]}
        >
          {icon && (
            <View
              style={[
                inputStyles.iconContainer,
                customStyles?.iconContainer ?? {},
                ...(isDarkTheme
                  ? [
                      inputDarkStyles?.iconContainer,
                      customDarkStyles?.iconContainer ?? {},
                    ]
                  : [
                      inputLightStyles?.iconContainer,
                      customLightStyles?.iconContainer ?? {},
                    ]),
              ]}
            >
              {icon}
            </View>
          )}
          <TextInput
            style={[
              inputStyles.input,
              customStyles?.input ?? {},
              ...(isDarkTheme
                ? [inputDarkStyles?.input, customDarkStyles?.input ?? {}]
                : [inputLightStyles?.input, customLightStyles?.input ?? {}]),
            ]}
            value={value}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            placeholderTextColor={
              placeholderTextColor ?? isDarkTheme
                ? Colors.gray_400
                : Colors.gray_600
            }
            defaultValue={defaultValue}
            editable={!disabled}
            selectTextOnFocus={!disabled}
            onChange={onChange ? (event) => onChange(event) : undefined}
            onFocus={onFocus ? (event) => onFocus(event) : undefined}
            onBlur={onBlur ? (event) => onBlur(event) : undefined}
            placeholder={placeholder}
            secureTextEntry={isHidden}
            keyboardType={type}
            {...textInputProps}
          />
          {copy || error || actions || password ? (
            <View
              style={[
                inputStyles.actionsContainer,
                customStyles?.actionsContainer ?? {},
                ...(isDarkTheme
                  ? [
                      inputDarkStyles?.actionsContainer,
                      customDarkStyles?.actionsContainer ?? {},
                    ]
                  : [
                      inputLightStyles?.actionsContainer,
                      customLightStyles?.actionsContainer ?? {},
                    ]),
              ]}
            >
              {reveal ? (
                <Button
                  customStyles={customExtraStyles.revealButton}
                  customDarkStyles={customExtraDarkStyles.revealButton}
                  customLightStyles={customExtraLightStyles.revealButton}
                  size={'tiny'}
                  type={'text'}
                  rounded={true}
                  icon={
                    isHidden ? (
                      <Visibility
                        size={21}
                        color={isDarkTheme ? Colors.gray_100 : Colors.gray_900}
                      />
                    ) : (
                      <VisibilityOff
                        size={21}
                        color={isDarkTheme ? Colors.gray_100 : Colors.gray_900}
                      />
                    )
                  }
                  onPress={onReveal}
                />
              ) : null}
              {error && (
                <ErrorOutline
                  size={21}
                  color={Colors.red_500}
                  strokeWidth={0}
                />
              )}
              {copy && (
                <Button
                  size={'tiny'}
                  type={'default'}
                  rounded={true}
                  onPress={() => onCopy(value)}
                  icon={
                    <ContentCopy
                      size={21}
                      color={isDarkTheme ? Colors.gray_100 : Colors.gray_900}
                    />
                  }
                >
                  {copyLabel}
                </Button>
              )}
              {actions && actions}
            </View>
          ) : null}
        </View>
      </FormLayout>
    </animated.View>
  );
}

export interface TextAreaStyles {
  root?: ViewStyle | TextStyle | ImageStyle;
  container?: ViewStyle | TextStyle | ImageStyle;
  input?: ViewStyle | TextStyle | ImageStyle;
  error?: ViewStyle | TextStyle | ImageStyle;
  withIcon?: ViewStyle | TextStyle | ImageStyle;
  borderless?: ViewStyle | TextStyle | ImageStyle;
  actionsContainer?: ViewStyle | TextStyle | ImageStyle;
}

export interface ExtraTextAreaStyles {
  formLayoutStyles?: FormLayoutStyles;
  formLayoutDarkStyles?: FormLayoutStyles;
  formLayoutLightStyles?: FormLayoutStyles;
}

export interface TextAreaProps {
  autoComplete?:
    | 'additional-name'
    | 'address-line1'
    | 'address-line2'
    | 'birthdate-day'
    | 'birthdate-full'
    | 'birthdate-month'
    | 'birthdate-year'
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-day'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-number'
    | 'cc-name'
    | 'cc-given-name'
    | 'cc-middle-name'
    | 'cc-family-name'
    | 'cc-type'
    | 'country'
    | 'current-password'
    | 'email'
    | 'family-name'
    | 'gender'
    | 'given-name'
    | 'honorific-prefix'
    | 'honorific-suffix'
    | 'name'
    | 'name-family'
    | 'name-given'
    | 'name-middle'
    | 'name-middle-initial'
    | 'name-prefix'
    | 'name-suffix'
    | 'new-password'
    | 'nickname'
    | 'one-time-code'
    | 'organization'
    | 'organization-title'
    | 'password'
    | 'password-new'
    | 'postal-address'
    | 'postal-address-country'
    | 'postal-address-extended'
    | 'postal-address-extended-postal-code'
    | 'postal-address-locality'
    | 'postal-address-region'
    | 'postal-code'
    | 'street-address'
    | 'sms-otp'
    | 'tel'
    | 'tel-country-code'
    | 'tel-national'
    | 'tel-device'
    | 'url'
    | 'username'
    | 'username-new'
    | 'off';
  autoFocus?: boolean;
  placeholderTextColor?: ColorValue;
  customStyles?: TextAreaStyles;
  customLightStyles?: TextAreaStyles;
  customDarkStyles?: TextAreaStyles;
  customExtraStyles?: ExtraTextAreaStyles;
  autofocus?: boolean;
  type?: KeyboardTypeOptions;
  numberOfLines?: number;
  descriptionText?: string;
  defaultValue?: string;
  disabled?: boolean;
  error?: string;
  icon?: any;
  id?: string;
  label?: string;
  afterLabel?: string;
  beforeLabel?: string;
  labelOptional?: string;
  name?: string;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  placeholder?: string;
  value?: any;
  style?: React.CSSProperties;
  limit?: number;
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge';
  borderless?: boolean;
  shakeInterpolationCount?: number;
  shakeDistance?: number;
  textInputProps?: TextInputProps;
}

const textAreaStyles = StyleSheet.create<TextAreaStyles>({
  root: {},
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: Globals.rounded_md,
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
  },
  error: {
    borderColor: Colors.red_500,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  withIcon: {},
  borderless: {},
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginRight: MarginsPaddings.mp_4,
  },
  input: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
    paddingTop: MarginsPaddings.mp_5,
    paddingBottom: MarginsPaddings.mp_5,
    width: '100%',
    height: '100%',
    fontSize: Globals.font_size_sm,
    lineHeight: Globals.font_line_height_sm,
  },
  actionsContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: MarginsPaddings.mp_4,
    top: 0,
    bottom: 0,
    right: 0,
    paddingRight: MarginsPaddings.mp_5,
    paddingLeft: MarginsPaddings.mp_5,
  },
});
const textAreaLightStyles = StyleSheet.create<TextAreaStyles>({
  root: {},
  container: {
    backgroundColor: Colors.gray_100,
  },
  error: {},
  withIcon: {},
  borderless: {},
  iconContainer: {
    color: Colors.gray_900,
  },
  input: {
    color: Colors.gray_900,
  },
  actionsContainer: {
    color: Colors.gray_900,
  },
});
const textAreaDarkStyles = StyleSheet.create<TextAreaStyles>({
  root: {},
  container: {
    backgroundColor: Colors.dark_1,
  },
  error: {},
  withIcon: {},
  borderless: {},
  iconContainer: {
    color: Colors.gray_100,
  },
  input: {
    color: Colors.gray_100,
  },
  actionsContainer: {
    color: Colors.gray_100,
  },
});

function TextArea({
  autoComplete,
  autoFocus,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  placeholderTextColor,
  value,
  defaultValue,
  type,
  numberOfLines = 4,
  customStyles = {},
  customLightStyles = {},
  customDarkStyles = {},
  customExtraStyles = {},
  descriptionText,
  disabled,
  error,
  icon,
  limit,
  label,
  afterLabel,
  beforeLabel,
  labelOptional,
  borderless = false,
  shakeInterpolationCount = 3,
  shakeDistance = 6,
  textInputProps,
}: TextAreaProps) {
  const [charLength, setCharLength] = useState(0);
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  const { x } = useSpring({
    from: { x: 0 },
    to: error ? { x: 1 } : { x: 0 },
    config: { mass: 1, tension: 500, friction: 100 },
  });

  const onInputChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setCharLength(e.nativeEvent.text.length);
    if (onChange) {
      onChange(e);
    }
  };

  const interpolation: number[] = [];
  interpolation.push(0);

  for (let i = 0; i < shakeInterpolationCount; i++) {
    interpolation.push(-shakeDistance);
    interpolation.push(shakeDistance);
  }

  interpolation.push(0);

  return (
    <animated.View
      style={[
        {
          x: x.to([0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1], interpolation),
        },
        textAreaStyles.root as any,
        customStyles?.root ?? {},
        ...(isDarkTheme
          ? [textAreaDarkStyles?.root, customDarkStyles?.root ?? {}]
          : [textAreaLightStyles?.root, customLightStyles?.root ?? {}]),
      ]}
    >
      <FormLayout
        label={label}
        afterLabel={afterLabel}
        beforeLabel={beforeLabel}
        labelOptional={labelOptional}
        error={error}
        descriptionText={descriptionText}
        customStyles={customExtraStyles.formLayoutStyles}
        customDarkStyles={customExtraStyles.formLayoutDarkStyles}
        customLightStyles={customExtraStyles.formLayoutLightStyles}
      >
        <View
          style={[
            textAreaStyles.container,
            customStyles?.container ?? {},
            error ? textAreaStyles.error : {},
            ...(isDarkTheme
              ? [
                  textAreaDarkStyles?.container,
                  error ? textAreaDarkStyles.error : {},
                  customDarkStyles?.container ?? {},
                ]
              : [
                  textAreaLightStyles?.container,
                  error ? textAreaLightStyles.error : {},
                  customLightStyles?.container ?? {},
                ]),
          ]}
        >
          <TextInput
            style={[
              textAreaStyles.input,
              customStyles?.input ?? {},
              ...(isDarkTheme
                ? [textAreaDarkStyles?.input, customDarkStyles?.input ?? {}]
                : [textAreaLightStyles?.input, customLightStyles?.input ?? {}]),
            ]}
            multiline={true}
            value={value}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            textAlignVertical={'top'}
            placeholderTextColor={
              placeholderTextColor ?? isDarkTheme
                ? Colors.gray_400
                : Colors.gray_600
            }
            numberOfLines={numberOfLines}
            maxLength={limit}
            defaultValue={defaultValue}
            editable={!disabled}
            selectTextOnFocus={!disabled}
            onChange={(event) => onInputChange(event)}
            onFocus={onFocus ? (event) => onFocus(event) : undefined}
            onBlur={onBlur ? (event) => onBlur(event) : undefined}
            placeholder={placeholder}
            keyboardType={type}
            {...textInputProps}
          />
          {error && (
            <View
              style={[
                textAreaStyles.actionsContainer,
                customStyles?.actionsContainer ?? {},
                ...(isDarkTheme
                  ? [
                      textAreaDarkStyles?.actionsContainer,
                      customDarkStyles?.actionsContainer ?? {},
                    ]
                  : [
                      textAreaLightStyles?.actionsContainer,
                      customLightStyles?.actionsContainer ?? {},
                    ]),
              ]}
            >
              <ErrorOutline size={21} color={Colors.red_500} />
            </View>
          )}
        </View>
        {limit && (
          <Typography.Text>
            {charLength}/{limit}
          </Typography.Text>
        )}
      </FormLayout>
    </animated.View>
  );
}

Input.TextArea = TextArea;

export default Input;
