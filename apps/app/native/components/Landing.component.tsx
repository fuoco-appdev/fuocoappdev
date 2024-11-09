import {
  Button,
  Colors,
  Globals,
  MarginsPaddings,
  Typography,
} from '@fuoco.appdev/native-components';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  StyleSheet,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import { RoutePathsType } from '../../shared/route-paths-type';

export interface LandingProps {
  navigation: any;
}

export interface LandingStyles {
  root?: ViewStyle;
  logoContainer?: ViewStyle;
  logo?: ViewStyle;
  textContainer?: ViewStyle;
  title?: TextStyle;
  description?: TextStyle;
  buttonContainer?: ViewStyle;
}

const styles = StyleSheet.create<LandingStyles>({
  root: {
    paddingTop: MarginsPaddings.mp_8,
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
    height: '100%',
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 145,
    height: 145,
    backgroundColor: '#fff',
    borderRadius: 145,
  },
  textContainer: {
    width: '100%',
    paddingTop: MarginsPaddings.mp_8,
    paddingBottom: MarginsPaddings.mp_8,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Lora',
    fontWeight: Globals.font_weight_bold,
  },
  description: {
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Lora',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: MarginsPaddings.mp_4,
    paddingTop: MarginsPaddings.mp_6,
    paddingBottom: MarginsPaddings.mp_6,
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
  },
});
const lightStyles = StyleSheet.create<LandingStyles>({
  root: {
    backgroundColor: Colors.brand_100,
  },
});

const darkStyles = StyleSheet.create<LandingStyles>({
  root: {},
});

function LandingComponent({ navigation }: LandingProps) {
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
      >
        <View
          style={[
            ...(isDarkTheme
              ? [darkStyles?.logoContainer]
              : [lightStyles?.logoContainer]),
            { ...styles.logoContainer },
          ]}
        >
          <View
            style={[
              ...(isDarkTheme ? [darkStyles?.logo] : [lightStyles?.logo]),
              { ...styles.logo },
            ]}
          ></View>
        </View>
        <View
          style={[
            ...(isDarkTheme
              ? [darkStyles?.textContainer]
              : [lightStyles?.textContainer]),
            { ...styles.textContainer },
          ]}
        >
          <Typography.Title
            level={3}
            customStyles={{
              root: styles.title,
            }}
          >
            {t('buildYourMind')}
          </Typography.Title>
          <Typography.Text
            customStyles={{
              root: styles.description,
            }}
          >
            {t('buildYourMindDescription')}
          </Typography.Text>
        </View>
        <View
          style={[
            ...(isDarkTheme
              ? [darkStyles?.buttonContainer]
              : [lightStyles?.buttonContainer]),
            { ...styles.buttonContainer },
          ]}
        >
          <Button
            size={'full'}
            onPress={() => navigation.navigate(RoutePathsType.Signup)}
          >
            {t('signup')}
          </Button>
          <Button
            size={'full'}
            type={'default'}
            onPress={() => navigation.navigate(RoutePathsType.Signin)}
          >
            {t('signin')}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default observer(LandingComponent);
