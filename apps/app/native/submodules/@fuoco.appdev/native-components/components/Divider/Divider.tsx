import {
  ImageStyle,
  StyleSheet,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import Typography, { TypographyStyles } from '../Typography/Typography';
import { TextStyles } from '../Typography/Text';
import Colors from '../Themes/colors';
import MarginsPaddings from '../Themes/margins_paddings';

export interface DividerStyles {
  root?: ViewStyle | TextStyle | ImageStyle;
  leftSeperator?: ViewStyle | TextStyle | ImageStyle;
  rightSeperator?: ViewStyle | TextStyle | ImageStyle;
}

export interface ExtraDividerStyles {
  typography?: TextStyles;
}

export interface DividerProps {
  children?: React.ReactNode;
  orientation?: 'left' | 'right' | 'center';
  customStyles?: DividerStyles;
  customDarkStyles?: DividerStyles;
  customLightStyles?: DividerStyles;
  customExtraStyles?: ExtraDividerStyles;
  customExtraDarkStyles?: ExtraDividerStyles;
  customExtraLightStyles?: ExtraDividerStyles;
}

const styles = StyleSheet.create<DividerStyles>({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none',
    flexDirection: 'row',
  },
  leftSeperator: {
    height: 1,
  },
  rightSeperator: {
    height: 1,
  },
});
const lightStyles = StyleSheet.create<DividerStyles>({
  root: {},
  leftSeperator: {
    backgroundColor: Colors.gray_200,
  },
  rightSeperator: {
    backgroundColor: Colors.gray_200,
  },
});
const darkStyles = StyleSheet.create<DividerStyles>({
  root: {},
  leftSeperator: {
    backgroundColor: Colors.gray_500,
  },
  rightSeperator: {
    backgroundColor: Colors.gray_500,
  },
});

const typographyStyles = StyleSheet.create<TypographyStyles>({
  root: {
    padding: MarginsPaddings.mp_5,
  },
});
const typographyLightStyles = StyleSheet.create<TypographyStyles>({
  root: {
    color: Colors.gray_800,
  },
});
const typographyDarkStyles = StyleSheet.create<TypographyStyles>({
  root: {
    color: Colors.gray_200,
  },
});

export default function Divider({
  customStyles,
  customDarkStyles,
  customLightStyles,
  customExtraStyles,
  customExtraDarkStyles,
  customExtraLightStyles,
  children,
  orientation = 'center',
}: DividerProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  let leftOrientationStyles: ViewStyle = {};
  let rightOrientationStyles: ViewStyle = {};
  if (orientation === 'center') {
    leftOrientationStyles = {
      flex: 1,
    };
    rightOrientationStyles = {
      flex: 1,
    };
  } else if (orientation === 'left') {
    leftOrientationStyles = {
      flex: 0,
    };
    rightOrientationStyles = {
      flex: 1,
    };
  } else if (orientation === 'right') {
    leftOrientationStyles = {
      flex: 1,
    };
    rightOrientationStyles = {
      flex: 0,
    };
  }

  return (
    <View
      style={[
        ...(isDarkTheme
          ? [{ ...darkStyles?.root, ...(customDarkStyles?.root ?? {}) }]
          : [{ ...lightStyles?.root, ...(customLightStyles?.root ?? {}) }]),
        { ...styles.root, ...(customStyles?.root ?? {}) },
      ]}
    >
      <View
        style={[
          ...(isDarkTheme
            ? [
                {
                  ...darkStyles?.leftSeperator,
                  ...(customDarkStyles?.leftSeperator ?? {}),
                },
              ]
            : [
                {
                  ...lightStyles?.leftSeperator,
                  ...(customLightStyles?.leftSeperator ?? {}),
                },
              ]),
          { ...styles.leftSeperator, ...(customStyles?.leftSeperator ?? {}) },
          leftOrientationStyles,
        ]}
      />
      {children && (
        <Typography.Text
          customStyles={{
            ...customExtraStyles?.typography,
            ...typographyStyles,
          }}
          customDarkStyles={{
            ...typographyDarkStyles,
            ...customExtraDarkStyles?.typography,
          }}
          customLightStyles={{
            ...typographyLightStyles,
            ...customExtraLightStyles?.typography,
          }}
        >
          {children}
        </Typography.Text>
      )}
      <View
        style={[
          ...(isDarkTheme
            ? [
                {
                  ...darkStyles?.rightSeperator,
                  ...(customDarkStyles?.rightSeperator ?? {}),
                },
              ]
            : [
                {
                  ...lightStyles?.rightSeperator,
                  ...(customLightStyles?.rightSeperator ?? {}),
                },
              ]),
          { ...styles.rightSeperator, ...(customStyles?.rightSeperator ?? {}) },
          rightOrientationStyles,
        ]}
      />
    </View>
  );
}
