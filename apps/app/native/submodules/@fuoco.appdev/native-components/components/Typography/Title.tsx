import { StyleSheet, Text, TextStyle, useColorScheme } from 'react-native';
import Colors from '../Themes/colors';
import Globals from '../Themes/globals';

export interface TitleStyles {
  root?: TextStyle;
}

export interface TitleProps {
  level?: 1 | 2 | 3 | 4 | 5;
  children?: React.ReactNode;
  customStyles?: TitleStyles;
  customLightStyles?: TitleStyles;
  customDarkStyles?: TitleStyles;
}

const styles = StyleSheet.create<TitleStyles>({
  root: {
    fontSize: Globals.font_size_base,
    lineHeight: Globals.font_line_height_base,
    fontFamily: Globals.font_family,
    fontWeight: Globals.font_weight_bold,
  },
});
const lightStyles = StyleSheet.create<TitleStyles>({
  root: {
    color: Colors.gray_900,
  },
});

const darkStyles = StyleSheet.create<TitleStyles>({
  root: {
    color: Colors.gray_100,
  },
});

function Title({
  level,
  children,
  customStyles,
  customDarkStyles,
  customLightStyles,
}: TitleProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  let levelStyle: TextStyle = {};
  if (level === 1) {
    levelStyle = {
      fontSize: Globals.font_size_xl,
      lineHeight: Globals.font_line_height_xl,
    };
  } else if (level === 2) {
    levelStyle = {
      fontSize: Globals.font_size_lg,
      lineHeight: Globals.font_line_height_lg,
    };
  } else if (level === 3) {
    levelStyle = {
      fontSize: Globals.font_size_base,
      lineHeight: Globals.font_line_height_base,
    };
  } else if (level === 4) {
    levelStyle = {
      fontSize: Globals.font_size_sm,
      lineHeight: Globals.font_line_height_sm,
    };
  } else if (level === 5) {
    levelStyle = {
      fontSize: Globals.font_size_xs,
      lineHeight: Globals.font_line_height_xs,
    };
  }

  return (
    <Text
      style={[
        styles.root,
        levelStyle,
        customStyles?.root ?? {},
        ...(isDarkTheme
          ? [darkStyles?.root, customDarkStyles?.root ?? {}]
          : [lightStyles?.root, customLightStyles?.root ?? {}]),
      ]}
    >
      {children}
    </Text>
  );
}

export default Title;
