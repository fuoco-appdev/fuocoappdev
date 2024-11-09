import {
  Auth,
  Colors,
  Globals,
  MarginsPaddings,
  Typography,
} from '@fuoco.appdev/native-components';
import { AuthError } from '@supabase/auth-js';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Linking,
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

export interface ForgotPasswordProps {
  navigation: any;
}

export interface ForgotPasswordStyles {
  root?: ViewStyle;
  content?: ViewStyle;
  title?: TextStyle;
  cardTopShadow?: ViewStyle;
  cardBottomShadow?: ViewStyle;
  card?: ViewStyle;
}

const styles = StyleSheet.create<ForgotPasswordStyles>({
  root: {
    paddingTop: MarginsPaddings.mp_8,
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
    height: '100%',
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
const lightStyles = StyleSheet.create<ForgotPasswordStyles>({
  root: {
    backgroundColor: 'rgba(179, 229, 252, .13)',
  },
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

const darkStyles = StyleSheet.create<ForgotPasswordStyles>({
  root: {},
  card: {
    backgroundColor: Colors.dark_1,
  },
});

function ForgotPasswordComponent({ navigation }: ForgotPasswordProps) {
  const {
    ForgotPasswordController,
    WindowController,
    EmailConfirmationController,
    SupabaseService,
  } = useContext(DIContext);
  const { email } = ForgotPasswordController.model;
  const { url: initialUrl, processing } = useInitialURL();
  const [authError, setAuthError] = useState<AuthError | null>(null);
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const { t } = useTranslation();

  useEffect(() => {
    runInAction(() => {
      ForgotPasswordController.load(1);
    });

    return () => {
      ForgotPasswordController.disposeLoad(1);
    };
  }, []);

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
                  {t('forgotYourPassword')}
                </Typography.Title>
                {SupabaseService.supabaseClient && (
                  <Auth.ForgottenPassword
                    supabaseClient={SupabaseService.supabaseClient}
                    email={email}
                    strings={{
                      emailAddress: t('emailAddress') ?? '',
                      yourEmailAddress: t('yourEmailAddress') ?? '',
                      sendResetPasswordInstructions:
                        t('sendResetPasswordInstructions') ?? '',
                      goBackToSignIn: t('goBackToSignIn') ?? '',
                    }}
                    onResetPasswordSent={() => {
                      // windowController.addToast({
                      //   key: 'reset-password-sent',
                      //   message: t('passwordReset') ?? '',
                      //   description: t('passwordResetDescription') ?? '',
                      //   type: 'loading',
                      // });
                      setAuthError(null);
                      Linking.openURL(`mailto:${email}`);
                    }}
                    onSigninRedirect={() =>
                      navigation.navigate(RoutePathsType.Signin)
                    }
                    emailErrorMessage={
                      authError ? t('emailErrorMessage') ?? '' : undefined
                    }
                    onResetPasswordError={(error: AuthError) =>
                      setAuthError(error)
                    }
                    redirectTo={`${initialUrl ?? ''}${
                      RoutePathsType.ResetPassword
                    }`}
                    onEmailChanged={(value) =>
                      ForgotPasswordController.updateEmail(value)
                    }
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

export default observer(ForgotPasswordComponent);
