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
import React, { useState } from 'react';
import Typography from '../Typography/Typography';
import NativeDatePicker from 'react-native-date-picker';
import moment from 'moment';

export interface DatePickerStyles {
  root?: ViewStyle;
  container?: ViewStyle | TextStyle | ImageStyle;
  error?: ViewStyle | TextStyle | ImageStyle;
  withIcon?: ViewStyle | TextStyle | ImageStyle;
  borderless?: ViewStyle | TextStyle | ImageStyle;
  iconContainer?: ViewStyle | TextStyle | ImageStyle;
  input?: ViewStyle | TextStyle | ImageStyle;
  actionsContainer?: ViewStyle | TextStyle | ImageStyle;
}

export interface ExtraDatePickerStyles {
  formLayout?: FormLayoutStyles;
  button?: ButtonStyles;
}

export interface DatePickerProps {
  children?: React.ReactNode | string;
  date?: Date;
  locale?: string;
  mode?: 'time' | 'date' | 'datetime';
  customStyles?: DatePickerStyles;
  customLightStyles?: DatePickerStyles;
  customDarkStyles?: DatePickerStyles;
  customExtraStyles?: ExtraDatePickerStyles;
  customExtraDarkStyles?: ExtraDatePickerStyles;
  customExtraLightStyles?: ExtraDatePickerStyles;
  descriptionText?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  beforeLabel?: string;
  afterLabel?: string;
  labelOptional?: string;
  shakeInterpolationCount?: number;
  shakeDistance?: number;
  onChange?: (value: Date) => void;
}

const styles = StyleSheet.create<DatePickerStyles>({
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
const lightStyles = StyleSheet.create<DatePickerStyles>({
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
const darkStyles = StyleSheet.create<DatePickerStyles>({
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

function DatePicker({
  date = new Date(Date.now()),
  children,
  locale,
  mode = 'date',
  customStyles = {},
  customLightStyles = {},
  customDarkStyles = {},
  customExtraStyles = {},
  customExtraDarkStyles = {},
  customExtraLightStyles = {},
  descriptionText,
  disabled,
  error,
  label,
  beforeLabel,
  afterLabel,
  labelOptional,
  shakeInterpolationCount = 3,
  shakeDistance = 6,
  onChange,
}: DatePickerProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const [open, setOpen] = useState<boolean>(false);

  const { x } = useSpring({
    from: { x: 0 },
    to: error ? { x: 1 } : { x: 0 },
    config: { mass: 1, tension: 500, friction: 100 },
  });

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
        styles.root as any,
        customStyles?.root ?? {},
        ...(isDarkTheme
          ? [darkStyles?.root, customDarkStyles?.root ?? {}]
          : [lightStyles?.root, customLightStyles?.root ?? {}]),
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
        <Button
          customStyles={{
            ...{
              button: {
                paddingTop: MarginsPaddings.mp_5,
                paddingBottom: MarginsPaddings.mp_5,
              },
            },
            ...customExtraStyles.button,
          }}
          customDarkStyles={customExtraDarkStyles.button}
          customLightStyles={customExtraLightStyles.button}
          type={'default'}
          size={'full'}
          onPress={() => setOpen(true)}
          disabled={disabled}
        >
          {children}
        </Button>
        <NativeDatePicker
          modal={true}
          open={open}
          date={date}
          locale={locale}
          theme={isDarkTheme ? 'dark' : 'light'}
          mode={mode}
          onConfirm={(date: Date) => {
            setOpen(false);
            onChange?.(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </FormLayout>
    </animated.View>
  );
}

export default DatePicker;
