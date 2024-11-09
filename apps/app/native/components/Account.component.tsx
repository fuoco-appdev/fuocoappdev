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

export interface AccountProps {
  navigation: any;
}

export interface AccountStyles {
  root?: ViewStyle;
}

const styles = StyleSheet.create<AccountStyles>({
  root: {
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
    height: '100%',
  },
});
const lightStyles = StyleSheet.create<AccountStyles>({
  root: {},
});

const darkStyles = StyleSheet.create<AccountStyles>({
  root: {},
});

function AccountComponent({ navigation }: AccountProps) {
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

export default observer(AccountComponent);
