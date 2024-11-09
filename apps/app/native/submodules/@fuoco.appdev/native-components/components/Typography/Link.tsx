import { useCallback } from 'react';
import {
  GestureResponderEvent,
  Text,
  Linking,
  Alert,
  TextStyle,
  useColorScheme,
  StyleSheet,
} from 'react-native';
import Globals from '../Themes/globals';
import Colors from '../Themes/colors';

export interface LinkStyles {
  root?: TextStyle;
}

export interface LinkProps {
  customStyles?: LinkStyles;
  customDarkStyles?: LinkStyles;
  customLightStyles?: LinkStyles;
  url?: string;
  children?: React.ReactNode;
  target?: '_blank' | '_self' | '_parent' | '_top' | 'framename';
  onPress?: (event: GestureResponderEvent) => void;
}

const styles = StyleSheet.create<LinkStyles>({
  root: {
    fontSize: Globals.font_size_sm,
    lineHeight: Globals.font_line_height_sm,
    fontFamily: Globals.font_family,
  },
});
const lightStyles = StyleSheet.create<LinkStyles>({
  root: {
    color: Colors.brand_500,
  },
});

const darkStyles = StyleSheet.create<LinkStyles>({
  root: {
    color: Colors.brand_100,
  },
});

export default function Link({
  customStyles,
  customDarkStyles,
  customLightStyles,
  children,
  target,
  url,
  onPress,
}: LinkProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const onLinkPressed = useCallback(
    async (event: GestureResponderEvent) => {
      onPress?.(event);

      if (!url) {
        return;
      }
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.error(`Don't know how to open this URL: ${url}`);
      }
    },
    [url]
  );
  return (
    <Text
      onPress={onLinkPressed}
      style={[
        ...(isDarkTheme
          ? [{ ...darkStyles?.root, ...(customDarkStyles?.root ?? {}) }]
          : [{ ...lightStyles?.root, ...(customLightStyles?.root ?? {}) }]),
        { ...styles.root, ...(customStyles?.root ?? {}) },
      ]}
    >
      {children}
    </Text>
  );
}
