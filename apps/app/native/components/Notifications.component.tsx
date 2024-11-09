import { MarginsPaddings } from '@fuoco.appdev/native-components';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';

export interface NotificationsProps {
  navigation: any;
}

export interface NotificationsStyles {
  root?: ViewStyle;
}

const styles = StyleSheet.create<NotificationsStyles>({
  root: {
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
    height: '100%',
  },
});
const lightStyles = StyleSheet.create<NotificationsStyles>({
  root: {},
});

const darkStyles = StyleSheet.create<NotificationsStyles>({
  root: {},
});

function NotificationsComponent({ navigation }: NotificationsProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const { t } = useTranslation();
  return (
    <SafeAreaView>
      <View
        style={[
          ...(isDarkTheme ? [darkStyles?.root] : [lightStyles?.root]),
          { ...styles.root },
        ]}
      ></View>
    </SafeAreaView>
  );
}

export default observer(NotificationsComponent);
