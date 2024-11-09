import ReactNative, {
  StyleSheet,
  TextStyle,
  useColorScheme,
} from 'react-native';
import Colors from '../Themes/colors';
import Globals from '../Themes/globals';

export interface TextStyles {
  root?: ReactNative.TextStyle;
}

export interface TextProps {
  children?: React.ReactNode;
  type?: 'default' | 'secondary' | 'success' | 'warning' | 'danger';
  align?: 'center' | 'left' | 'right';
  disabled?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  strong?: boolean;
  customStyles?: TextStyles;
  customLightStyles?: TextStyles;
  customDarkStyles?: TextStyles;
}

const styles = StyleSheet.create<TextStyles>({
  root: {
    fontSize: Globals.font_size_sm,
    lineHeight: Globals.font_line_height_sm,
    fontFamily: Globals.font_family,
  },
});
const lightStyles = StyleSheet.create<TextStyles>({
  root: {
    color: Colors.gray_900,
  },
});

const darkStyles = StyleSheet.create<TextStyles>({
  root: {
    color: Colors.gray_100,
  },
});

function Text({
  children,
  customStyles,
  customDarkStyles,
  customLightStyles,
  type,
  align = 'left',
  disabled,
  underline,
  strikethrough,
  strong,
}: TextProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  let typeStyle: TextStyle = {};
  if (type === 'danger') {
    typeStyle = {
      color: Colors.red_500,
    };
  } else if (type === 'secondary') {
    typeStyle = {
      color: Colors.gray_500,
    };
  } else if (type === 'success') {
    typeStyle = {
      color: Colors.green_500,
    };
  } else if (type === 'warning') {
    typeStyle = {
      color: Colors.yellow_500,
    };
  }

  let alignStyle: TextStyle = {};
  if (align === 'center') {
    alignStyle = {
      alignSelf: 'center',
    };
  } else if (align === 'left') {
    alignStyle = {
      alignSelf: 'flex-start',
    };
  } else if (align === 'right') {
    alignStyle = {
      alignSelf: 'flex-end',
    };
  }

  return (
    <ReactNative.Text
      style={[
        styles.root,
        customStyles?.root ?? {},
        ...(isDarkTheme
          ? [darkStyles?.root, customDarkStyles?.root ?? {}]
          : [lightStyles?.root, customLightStyles?.root ?? {}]),
        typeStyle,
        alignStyle,
        disabled && {
          color: Colors.gray_400,
        },
        underline && {
          textDecorationLine: 'underline',
        },
        strikethrough && {
          textDecorationLine: 'line-through',
        },
        strong && {
          fontWeight: Globals.font_weight_bold,
        },
      ]}
    >
      {children}
    </ReactNative.Text>
  );
}

export default Text;
