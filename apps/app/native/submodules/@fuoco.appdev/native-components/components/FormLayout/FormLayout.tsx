import {
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import Colors from '../Themes/colors';
import MarginsPaddings from '../Themes/margins_paddings';
import Globals from '../Themes/globals';

export interface FormLayoutStyles {
  root?: ViewStyle;
  flex?: ViewStyle;
  flexLeft?: TextStyle;
  flexRight?: TextStyle;
  labelContainerHorizontal?: ViewStyle;
  labelContainerVertical?: ViewStyle;
  label?: TextStyle;
  labelBefore?: TextStyle;
  labelAfter?: TextStyle;
  labelOptional?: TextStyle;
  contentContainerHorizontal?: ViewStyle;
  contentContainerVertical?: ViewStyle;
  contentContainerVerticalAlignRight?: ViewStyle;
  error?: TextStyle;
  description?: TextStyle;
}

const styles = StyleSheet.create<FormLayoutStyles>({
  root: {
    marginBottom: MarginsPaddings.mp_5,
    height: 'auto',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  flexLeft: {
    textAlign: 'left',
    fontFamily: Globals.font_family,
  },
  flexRight: {
    textAlign: 'right',
    fontFamily: Globals.font_family,
  },
  labelContainerHorizontal: {},
  labelContainerVertical: {},
  label: {
    display: 'flex',
    fontSize: Globals.font_size_sm,
    lineHeight: Globals.font_line_height_sm,
    marginBottom: MarginsPaddings.mp_3,
    fontFamily: Globals.font_family,
  },
  labelBefore: {
    fontSize: Globals.font_size_sm,
    lineHeight: Globals.font_line_height_sm,
    fontFamily: Globals.font_family,
  },
  labelAfter: {
    fontSize: Globals.font_size_sm,
    lineHeight: Globals.font_line_height_sm,
    textAlign: 'right',
    fontFamily: Globals.font_family,
  },
  labelOptional: {
    paddingBottom: MarginsPaddings.mp_4,
    fontFamily: Globals.font_family,
  },
  contentContainerHorizontal: {},
  contentContainerVertical: {},
  contentContainerVerticalAlignRight: {},
  error: {
    marginTop: MarginsPaddings.mp_2,
    fontSize: Globals.font_size_sm,
    lineHeight: Globals.font_line_height_sm,
    color: Colors.red_500,
    fontFamily: Globals.font_family,
  },
  description: {
    marginTop: MarginsPaddings.mp_2,
    fontSize: Globals.font_size_sm,
    lineHeight: Globals.font_line_height_sm,
    fontFamily: Globals.font_family,
  },
});

const lightStyles = StyleSheet.create<FormLayoutStyles>({
  root: {},
  flex: {},
  flexLeft: {},
  flexRight: {},
  labelContainerHorizontal: {},
  labelContainerVertical: {},
  label: {
    color: Colors.gray_900,
  },
  labelBefore: {
    color: Colors.gray_900,
  },
  labelAfter: {
    color: Colors.gray_900,
  },
  labelOptional: {
    color: Colors.gray_700,
  },
  contentContainerHorizontal: {},
  contentContainerVertical: {},
  contentContainerVerticalAlignRight: {},
  error: {},
  description: {
    color: Colors.gray_900,
  },
});

const darkStyles = StyleSheet.create<FormLayoutStyles>({
  root: {},
  flex: {},
  flexLeft: {},
  flexRight: {},
  labelContainerHorizontal: {},
  labelContainerVertical: {},
  label: {
    color: Colors.gray_100,
  },
  labelBefore: {
    color: Colors.gray_100,
  },
  labelAfter: {
    color: Colors.gray_100,
  },
  labelOptional: {
    color: Colors.gray_300,
  },
  contentContainerHorizontal: {},
  contentContainerVertical: {},
  contentContainerVerticalAlignRight: {},
  error: {},
  description: {
    color: Colors.gray_100,
  },
});

export interface FormLayoutProps {
  customStyles?: FormLayoutStyles;
  customLightStyles?: FormLayoutStyles;
  customDarkStyles?: FormLayoutStyles;
  align?: string;
  children?: any;
  descriptionText?: string;
  error?: string;
  id?: string;
  label?: string;
  labelOptional?: string;
  style?: React.CSSProperties;
  flex?: boolean;
  responsive?: boolean;
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge';
  beforeLabel?: string;
  afterLabel?: string;
}

export function FormLayout({
  customStyles = {},
  customLightStyles = {},
  customDarkStyles = {},
  size = 'medium',
  label,
  beforeLabel,
  afterLabel,
  labelOptional,
  children,
  error,
  descriptionText,
}: FormLayoutProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const labelled = Boolean(label || beforeLabel || afterLabel);

  let textSizeStyle: TextStyle = {};
  if (size === 'tiny') {
    textSizeStyle = {
      fontSize: Globals.font_size_xs,
      lineHeight: Globals.font_line_height_xs,
    };
  } else if (size === 'small') {
    textSizeStyle = {
      fontSize: Globals.font_size_sm,
      lineHeight: Globals.font_line_height_sm,
    };
  } else if (size === 'medium') {
    textSizeStyle = {
      fontSize: Globals.font_size_sm,
      lineHeight: Globals.font_line_height_sm,
    };
  } else if (size === 'large') {
    textSizeStyle = {
      fontSize: Globals.font_size_base,
      lineHeight: Globals.font_line_height_base,
    };
  } else if (size === 'xlarge') {
    textSizeStyle = {
      fontSize: Globals.font_size_base,
      lineHeight: Globals.font_line_height_base,
    };
  }

  return (
    <View
      style={[
        ...(isDarkTheme
          ? [{ ...darkStyles?.root, ...(customDarkStyles?.root ?? {}) }]
          : [{ ...lightStyles?.root, ...(customLightStyles?.root ?? {}) }]),
        { ...styles.root, ...customStyles.root },
      ]}
    >
      {labelled && (
        <Text
          style={[
            ...(isDarkTheme
              ? [{ ...darkStyles?.label, ...(customDarkStyles?.label ?? {}) }]
              : [
                  {
                    ...lightStyles?.label,
                    ...(customLightStyles?.label ?? {}),
                  },
                ]),
            { ...styles.label, ...customStyles.label },
            textSizeStyle,
          ]}
        >
          {beforeLabel && (
            <Text
              style={[
                ...(isDarkTheme
                  ? [
                      {
                        ...darkStyles?.labelBefore,
                        ...(customDarkStyles?.labelBefore ?? {}),
                      },
                    ]
                  : [
                      {
                        ...lightStyles?.labelBefore,
                        ...(customLightStyles?.labelBefore ?? {}),
                      },
                    ]),
                { ...styles.labelBefore, ...customStyles.labelBefore },
              ]}
            >
              {beforeLabel}
            </Text>
          )}
          {label}
          {afterLabel && (
            <Text
              style={[
                ...(isDarkTheme
                  ? [
                      {
                        ...darkStyles?.labelAfter,
                        ...(customDarkStyles?.labelAfter ?? {}),
                      },
                    ]
                  : [
                      {
                        ...lightStyles?.labelAfter,
                        ...(customLightStyles?.labelAfter ?? {}),
                      },
                    ]),
                { ...styles.labelAfter, ...customStyles.labelAfter },
              ]}
            >
              {afterLabel}
            </Text>
          )}
        </Text>
      )}
      {labelOptional && (
        <Text
          style={[
            ...(isDarkTheme
              ? [
                  {
                    ...darkStyles?.labelOptional,
                    ...(customDarkStyles?.labelOptional ?? {}),
                  },
                ]
              : [
                  {
                    ...lightStyles?.labelOptional,
                    ...(customLightStyles?.labelOptional ?? {}),
                  },
                ]),
            { ...styles.labelOptional, ...customStyles.labelOptional },
          ]}
        >
          {labelOptional}
        </Text>
      )}
      {children}
      {error && (
        <Text
          style={[
            ...(isDarkTheme
              ? [{ ...darkStyles?.error, ...(customDarkStyles?.error ?? {}) }]
              : [
                  {
                    ...lightStyles?.error,
                    ...(customLightStyles?.error ?? {}),
                  },
                ]),
            { ...styles.error, ...customStyles.error },
          ]}
        >
          {error}
        </Text>
      )}
      {descriptionText && (
        <Text
          style={[
            ...(isDarkTheme
              ? [
                  {
                    ...darkStyles?.description,
                    ...(customDarkStyles?.description ?? {}),
                  },
                ]
              : [
                  {
                    ...lightStyles?.description,
                    ...(customLightStyles?.description ?? {}),
                  },
                ]),
            { ...styles.description, ...customStyles.description },
          ]}
        >
          {descriptionText}
        </Text>
      )}
    </View>
  );
}
