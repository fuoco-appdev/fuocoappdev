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

export interface ResetPasswordProps {
  navigation: any;
}

export interface ResetPasswordStyles {
  root?: ViewStyle;
  content?: ViewStyle;
  title?: TextStyle;
  cardTopShadow?: ViewStyle;
  cardBottomShadow?: ViewStyle;
  card?: ViewStyle;
}

const styles = StyleSheet.create<ResetPasswordStyles>({
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
const lightStyles = StyleSheet.create<ResetPasswordStyles>({
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

const darkStyles = StyleSheet.create<ResetPasswordStyles>({
  root: {},
  card: {
    backgroundColor: Colors.dark_1,
  },
});

function ResetPasswordComponent({ navigation }: ResetPasswordProps) {
  const {
    ResetPasswordController,
    WindowController,
    EmailConfirmationController,
    SupabaseService,
  } = useContext(DIContext);
  const { password } = ResetPasswordController.model;
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const { url: initialUrl, processing } = useInitialURL();
  const [authError, setAuthError] = useState<AuthError | null>(null);
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const { t } = useTranslation();

  useEffect(() => {
    runInAction(() => {
      ResetPasswordController.load(1);
    });

    return () => {
      ResetPasswordController.disposeLoad(1);
    };
  }, []);

  useEffect(() => {
    runInAction(() => {
      if (authError) {
        // windowController.addToast({
        //   key: `reset-password-${Math.random()}`,
        //   message: authError?.name,
        //   description: authError?.message,
        //   type: 'error',
        // });
      } else {
        setPasswordError('');
        setConfirmPasswordError('');
      }
    });
  }, [authError, password]);

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
                  {t('resetPassword')}
                </Typography.Title>
                {SupabaseService.supabaseClient && (
                  <Auth.ResetPassword
                    supabaseClient={SupabaseService.supabaseClient}
                    passwordErrorMessage={passwordError}
                    confirmPasswordErrorMessage={confirmPasswordError}
                    strings={{
                      emailAddress: t('emailAddress') ?? '',
                      yourEmailAddress: t('yourEmailAddress') ?? '',
                      sendResetPasswordInstructions:
                        t('sendResetPasswordInstructions') ?? '',
                      goBackToSignIn: t('goBackToSignIn') ?? '',
                    }}
                    onPasswordUpdated={() => {
                      // windowController.addToast({
                      //   key: `password-updated`,
                      //   message: t('passwordUpdated') ?? '',
                      //   description: t('passwordUpdatedDescription') ?? '',
                      //   type: 'success',
                      //   closable: true,
                      // });
                      setAuthError(null);
                      navigation.navigate(RoutePathsType.Account);
                    }}
                    onResetPasswordError={setAuthError}
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

export default observer(ResetPasswordComponent);
