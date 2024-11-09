import ReactNative from 'react-native';
import React from 'react';
import Colors from '../Themes/colors';
import Globals from '../Themes/globals';
import Title from './Title';
import Text from './Text';
import Link from './Link';

export interface TypographyStyles {
  root?: ReactNative.TextStyle;
}

export interface TypographyProps {
  children?: React.ReactNode;
  customStyles?: TypographyStyles;
  customLightStyles?: TypographyStyles;
  customDarkStyles?: TypographyStyles;
}

const styles = ReactNative.StyleSheet.create<TypographyStyles>({
  root: {
    fontSize: Globals.font_size_base,
    lineHeight: Globals.font_line_height_base,
  },
});
const lightStyles = ReactNative.StyleSheet.create<TypographyStyles>({
  root: {
    color: Colors.gray_900,
  },
});

const darkStyles = ReactNative.StyleSheet.create<TypographyStyles>({
  root: {
    color: Colors.gray_100,
  },
});

function Typography({
  children,
  customStyles,
  customDarkStyles,
  customLightStyles,
}: TypographyProps) {
  const theme = ReactNative.useColorScheme();
  const isDarkTheme = theme === 'dark';

  return (
    <ReactNative.Text
      style={[
        ...(isDarkTheme
          ? [darkStyles?.root, customDarkStyles?.root ?? {}]
          : [lightStyles?.root, customLightStyles?.root ?? {}]),
        { ...styles.root, ...(customStyles?.root ?? {}) },
      ]}
    >
      {children}
    </ReactNative.Text>
  );
}

Typography.Title = Title;
Typography.Text = Text;
Typography.Link = Link;

export default Typography;
