import {
  Auth,
  Colors,
  Globals,
  MarginsPaddings,
  Typography,
} from '@fuoco.appdev/native-components';
import { AuthError } from '@supabase/auth-js';
import LottieView from 'lottie-react-native';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import { RoutePathsType } from '../../shared/route-paths-type';
import { DIContext } from '../App';
import { useInitialURL } from '../hooks/InitialUrl';

export interface SigninProps {
  navigation: any;
}

export interface SigninStyles {
  root?: ViewStyle;
  content?: ViewStyle;
  title?: TextStyle;
  cardTopShadow?: ViewStyle;
  cardBottomShadow?: ViewStyle;
  card?: ViewStyle;
}

const styles = StyleSheet.create<SigninStyles>({
  root: {
    height: '100%',
  },
  content: {
    paddingTop: MarginsPaddings.mp_8,
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
  },
  cardTopShadow: {
    borderRadius: MarginsPaddings.mp_6,
  },
  cardBottomShadow: {
    borderRadius: MarginsPaddings.mp_6,
  },
  card: {
    width: '100%',
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
    paddingTop: MarginsPaddings.mp_6,
    paddingBottom: MarginsPaddings.mp_6,
    borderRadius: MarginsPaddings.mp_6,
    overflow: 'hidden',
  },
});
const lightStyles = StyleSheet.create<SigninStyles>({
  root: {
    backgroundColor: 'rgba(179, 229, 252, .13)',
  },
  content: {},
  cardTopShadow: {
    shadowOffset: {
      width: -MarginsPaddings.mp_1,
      height: -MarginsPaddings.mp_1,
    },
    shadowColor: '#FFFFFF',
    shadowOpacity: 1,
    shadowRadius: MarginsPaddings.mp_2,
    elevation: 8,
  },
  cardBottomShadow: {
    shadowOffset: { width: MarginsPaddings.mp_1, height: MarginsPaddings.mp_1 },
    shadowColor: 'rgba(1, 87, 155, .13)',
    shadowOpacity: 1,
    shadowRadius: MarginsPaddings.mp_2,
    elevation: 8,
  },
  card: {
    backgroundColor: '#fff',
  },
});

const darkStyles = StyleSheet.create<SigninStyles>({
  root: {},
  card: {
    backgroundColor: Colors.dark_1,
  },
});

function SiginComponent({ navigation }: SigninProps) {
  const {
    SigninController,
    WindowController,
    EmailConfirmationController,
    SupabaseService,
  } = useContext(DIContext);
  const { email, password } = SigninController.model;
  const { url: initialUrl, processing } = useInitialURL();
  const [authError, setAuthError] = useState<AuthError | null>(null);
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const { t } = useTranslation();

  useEffect(() => {
    runInAction(() => {
      SigninController.load(1);
    });

    return () => {
      SigninController.disposeLoad(1);
    };
  }, []);

  useEffect(() => {
    runInAction(() => {
      if (authError?.message === 'Invalid login credentials') {
        setEmailError(t('invalidLoginCredentials') ?? '');
        setPasswordError(t('invalidLoginCredentials') ?? '');
      } else if (authError?.message === 'Email not confirmed') {
        setEmailError(t('emailNotConfirmed') ?? '');
        setPasswordError('');
        SigninController.resendEmailConfirmationAsync(email ?? '', () => {
          // windowController.addToast({
          //   key: `signin-email-confirmation-sent-${Math.random()}`,
          //   message: t('emailConfirmation') ?? '',
          //   description: t('emailConfirmationDescription') ?? '',
          //   type: 'success',
          // });
        });
        EmailConfirmationController.updateEmail(email);
        navigation.navigate(RoutePathsType.EmailConfirmation);
      } else {
        if (authError) {
          // windowController.addToast({
          //   key: `signin-${Math.random()}`,
          //   message: authError?.name,
          //   description: authError?.message,
          //   type: 'error',
          // });
        }

        setEmailError('');
        setPasswordError('');
      }
    });
  }, [authError, email]);

  return (
    <SafeAreaView>
      <ScrollView
        style={[
          ...(isDarkTheme ? [darkStyles?.root] : [lightStyles?.root]),
          { ...styles.root },
        ]}
      >
        <View
          style={[
            ...(isDarkTheme ? [darkStyles?.content] : [lightStyles?.content]),
            { ...styles.content },
          ]}
        >
          <Typography.Title
            customStyles={{
              root: {
                paddingTop: MarginsPaddings.mp_7,
                paddingBottom: MarginsPaddings.mp_7,
                textAlign: 'center',
                fontFamily: 'Lora',
              },
            }}
          >
            {t('transformYourSubconcious')}
          </Typography.Title>
          <View
            style={[
              ...(isDarkTheme
                ? [darkStyles?.cardTopShadow]
                : [lightStyles?.cardTopShadow]),
              { ...styles.cardTopShadow },
            ]}
          >
            <View
              style={[
                ...(isDarkTheme
                  ? [darkStyles?.cardBottomShadow]
                  : [lightStyles?.cardBottomShadow]),
                { ...styles.cardBottomShadow },
              ]}
            >
              <View
                style={[
                  ...(isDarkTheme ? [darkStyles?.card] : [lightStyles?.card]),
                  { ...styles.card },
                ]}
              >
                <Typography.Title
                  customStyles={{
                    root: {
                      paddingBottom: MarginsPaddings.mp_5,
                      textAlign: 'center',
                      fontWeight: Globals.font_weight_bold,
                    },
                  }}
                  level={4}
                >
                  {t('joinToday')}
                </Typography.Title>
                {SupabaseService.supabaseClient && (
                  <Auth
                    supabaseClient={SupabaseService.supabaseClient}
                    providers={['google']}
                    view={'sign_in'}
                    emailValue={email ?? ''}
                    passwordValue={password ?? ''}
                    strings={{
                      signInWith: t('signInWith') ?? '',
                      orContinueWith: t('orContinueWith') ?? '',
                      emailAddress: t('emailAddress') ?? '',
                      password: t('password') ?? '',
                      rememberMe: t('rememberMe') ?? '',
                      forgotYourPassword: t('forgotYourPassword') ?? '',
                      signIn: t('signIn') ?? '',
                      dontHaveAnAccount: t('dontHaveAnAccount') ?? '',
                    }}
                    emailErrorMessage={emailError}
                    passwordErrorMessage={passwordError}
                    onEmailChanged={(e) =>
                      SigninController.updateEmail(e.nativeEvent.text)
                    }
                    onPasswordChanged={(e) =>
                      SigninController.updatePassword(e.nativeEvent.text)
                    }
                    onForgotPasswordRedirect={() =>
                      navigation.navigate(RoutePathsType.ForgotPassword)
                    }
                    onTermsOfServiceRedirect={() =>
                      navigation.navigate(RoutePathsType.TermsOfService)
                    }
                    onPrivacyPolicyRedirect={() =>
                      navigation.navigate(RoutePathsType.PrivacyPolicy)
                    }
                    onSigninRedirect={() =>
                      navigation.navigate(RoutePathsType.Signin)
                    }
                    onSignupRedirect={() =>
                      navigation.navigate(RoutePathsType.Signup)
                    }
                    onSigninError={(error: AuthError) => setAuthError(error)}
                    socialLoadingComponent={
                      <LottieView
                        source={require('../../shared/assets/lottie/loading-dark.json')}
                        style={{ width: 21, height: 21 }}
                        autoPlay={true}
                        loop={true}
                      />
                    }
                    emailLoadingComponent={
                      <LottieView
                        source={require('../../shared/assets/lottie/loading-light.json')}
                        style={{ width: 21, height: 21 }}
                        autoPlay={true}
                        loop={true}
                      />
                    }
                    redirectTo={initialUrl ?? ''}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default observer(SiginComponent);
