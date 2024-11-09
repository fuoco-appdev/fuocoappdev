import {
  GestureResponderEvent,
  ImageStyle,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputChangeEventData,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import Button, { ButtonStyles } from '../Button/Button';
import Input, { InputStyles } from '../Input/Input';
import { AuthStrings, RedirectTo, VIEWS, ViewType } from './Auth';
import { AuthError, SupabaseClient } from '@supabase/supabase-js';
import { useState } from 'react';
import { Email, Key, Lock } from '../Icon/Icons/Line';
import { Checkbox, CheckboxStyles } from '../Checkbox/Checkbox';
import Typography from '../Typography/Typography';
import { darkTheme } from '@storybook/react-native-theming';
import Colors from '../Themes/colors';
import MarginsPaddings from '../Themes/margins_paddings';

export interface EmailAuthStyles {
  buttonContainer?: ViewStyle | TextStyle | ImageStyle;
  rememberMeContainer?: ViewStyle | TextStyle | ImageStyle;
  linkContainer?: ViewStyle | TextStyle | ImageStyle;
  emailButtonContainer?: ViewStyle | TextStyle | ImageStyle;
  emailButtonContent?: ViewStyle | TextStyle | ImageStyle;
  buttonIcon?: ViewStyle | TextStyle | ImageStyle;
}

export interface ExtraEmailAuthStyles {
  input?: InputStyles;
  checkbox?: CheckboxStyles;
  emailButton?: ButtonStyles;
}

export interface EmailAuthProps {
  customStyles?: EmailAuthStyles;
  customDarkStyles?: EmailAuthStyles;
  customLightStyles?: EmailAuthStyles;
  extraCustomStyles?: ExtraEmailAuthStyles;
  extraCustomDarkStyles?: ExtraEmailAuthStyles;
  extraCustomLightStyles?: ExtraEmailAuthStyles;
  emailValue?: string;
  passwordValue?: string;
  confirmPasswordValue?: string;
  loadingComponent?: JSX.Element;
  authView: ViewType;
  strings: AuthStrings;
  setAuthView: any;
  supabaseClient: SupabaseClient;
  magicLink?: boolean;
  emailErrorMessage?: string;
  passwordErrorMessage?: string;
  confirmPasswordErrorMessage?: string;
  redirectTo?: RedirectTo;
  onEmailChanged?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onPasswordChanged?: (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => void;
  onConfirmPasswordChanged?: (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => void;
  onForgotPasswordRedirect?: (event: GestureResponderEvent) => void;
  onTermsOfServiceRedirect?: (event: GestureResponderEvent) => void;
  onPrivacyPolicyRedirect?: (event: GestureResponderEvent) => void;
  // onMagicLinkRedirect?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  // onSignupRedirect?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  // onSigninRedirect?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  onAuthenticating?: () => void;
  onEmailConfirmationSent?: () => void;
  onSigninError?: (error: AuthError) => void;
  onSignupError?: (error: AuthError) => void;
}

const styles = StyleSheet.create<EmailAuthStyles>({
  emailButtonContainer: {
    paddingTop: MarginsPaddings.mp_6,
    paddingBottom: MarginsPaddings.mp_6,
  },
});
const lightStyles = StyleSheet.create<EmailAuthStyles>({});
const darkStyles = StyleSheet.create<EmailAuthStyles>({});

export function EmailAuth({
  customStyles,
  customDarkStyles,
  customLightStyles,
  extraCustomStyles,
  extraCustomDarkStyles,
  extraCustomLightStyles,
  emailValue,
  passwordValue,
  confirmPasswordValue,
  authView,
  strings,
  loadingComponent,
  supabaseClient,
  magicLink,
  emailErrorMessage,
  passwordErrorMessage,
  confirmPasswordErrorMessage,
  redirectTo,
  onEmailChanged,
  onPasswordChanged,
  onConfirmPasswordChanged,
  onAuthenticating,
  onEmailConfirmationSent,
  onSigninError,
  onSignupError,
  onForgotPasswordRedirect,
  onTermsOfServiceRedirect,
  onPrivacyPolicyRedirect,
}: EmailAuthProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [termAgreementChecked, setTermAgreementChecked] = useState(false);

  const handleSubmitAsync = async () => {
    setIsLoading(true);
    switch (authView) {
      case 'sign_in':
        const authSignin = await supabaseClient.auth.signInWithPassword({
          email: emailValue ?? '',
          password: passwordValue ?? '',
        });
        setIsLoading(false);
        if (authSignin.error) onSigninError?.(authSignin.error);
        else {
          onAuthenticating ? onAuthenticating?.() : null;
        }
        break;
      case 'sign_up':
        if (passwordValue !== confirmPasswordValue) {
          onSigninError?.(
            new AuthError('Confirm password does not match', 401)
          );
          break;
        }

        const authSignup = await supabaseClient.auth.signUp({
          email: emailValue ?? '',
          password: passwordValue ?? '',
          options: {
            emailRedirectTo: redirectTo,
          },
        });
        setIsLoading(false);
        if (authSignup.error) onSignupError?.(authSignup.error);
        // Check if session is null -> email confirmation setting is turned on
        else if (authSignup.data.user && !authSignup.data.session)
          onEmailConfirmationSent?.();
        else {
          onAuthenticating?.();
        }
        break;
    }
  };

  return (
    <View>
      <View>
        <Input
          key={'email'}
          label={strings.emailAddress}
          error={emailErrorMessage}
          autoComplete={'email'}
          value={emailValue}
          icon={<Email size={21} color={isDarkTheme ? '#fff' : '#000'} />}
          onChange={(e) => onEmailChanged?.(e)}
        />
        <Input
          key={'password'}
          label={strings.password}
          error={passwordErrorMessage}
          autoComplete={'current-password'}
          reveal={true}
          password={true}
          value={passwordValue}
          icon={<Key size={21} color={isDarkTheme ? '#fff' : '#000'} />}
          onChange={(e) => onPasswordChanged?.(e)}
        />
        {authView === VIEWS.SIGN_UP && (
          <Input
            key={'confirm-password'}
            label={strings.confirmPassword}
            error={confirmPasswordErrorMessage}
            reveal={true}
            password={true}
            value={confirmPasswordValue}
            autoComplete="current-password"
            icon={<Key size={21} color={isDarkTheme ? '#fff' : '#000'} />}
            onChange={(e) => {
              onConfirmPasswordChanged?.(e);
            }}
          />
        )}
      </View>
      <View
        style={[
          ...(isDarkTheme
            ? [
                {
                  ...darkStyles?.buttonContainer,
                  ...(customDarkStyles?.buttonContainer ?? {}),
                },
              ]
            : [
                {
                  ...lightStyles?.buttonContainer,
                  ...(customLightStyles?.buttonContainer ?? {}),
                },
              ]),
          {
            ...styles.buttonContainer,
            ...(customStyles?.buttonContainer ?? {}),
          },
        ]}
      >
        <View
          style={[
            ...(isDarkTheme
              ? [
                  {
                    ...darkStyles?.rememberMeContainer,
                    ...(customDarkStyles?.rememberMeContainer ?? {}),
                  },
                ]
              : [
                  {
                    ...lightStyles?.rememberMeContainer,
                    ...(customLightStyles?.rememberMeContainer ?? {}),
                  },
                ]),
            {
              ...styles.rememberMeContainer,
              ...(customStyles?.rememberMeContainer ?? {}),
            },
          ]}
        >
          {authView === VIEWS.SIGN_IN && (
            <Checkbox
              customStyles={extraCustomStyles?.checkbox}
              customDarkStyles={extraCustomDarkStyles?.checkbox}
              customLightStyles={extraCustomLightStyles?.checkbox}
              label={strings.rememberMe ?? ''}
              name="remember_me"
              id="remember_me"
              onChange={(value: boolean) => setRememberMe(value)}
              checked={rememberMe}
            />
          )}
          {authView === VIEWS.SIGN_IN && (
            <Typography.Link
              onPress={(e) => {
                onForgotPasswordRedirect ? onForgotPasswordRedirect(e) : null;
              }}
            >
              {strings.forgotYourPassword}
            </Typography.Link>
          )}
          {authView === VIEWS.SIGN_UP && (
            <Checkbox
              customStyles={extraCustomStyles?.checkbox}
              customDarkStyles={extraCustomDarkStyles?.checkbox}
              customLightStyles={extraCustomLightStyles?.checkbox}
              label={
                <Text>
                  {strings.agreeToThe} &nbsp;
                  <Typography.Link
                    onPress={(e: GestureResponderEvent) =>
                      onTermsOfServiceRedirect?.(e) ?? null
                    }
                  >
                    {strings.termsOfService}
                  </Typography.Link>
                  &nbsp; & &nbsp;
                  <Typography.Link
                    onPress={(e: GestureResponderEvent) =>
                      onPrivacyPolicyRedirect?.(e) ?? null
                    }
                  >
                    {strings.privacyPolicy}
                  </Typography.Link>
                </Text>
              }
              name="terms_agreement"
              id="terms_agreement"
              onChange={(value: boolean) => setTermAgreementChecked(value)}
              checked={termAgreementChecked}
            />
          )}
        </View>
        <View
          style={[
            ...(isDarkTheme
              ? [
                  {
                    ...darkStyles?.emailButtonContainer,
                    ...(customDarkStyles?.emailButtonContainer ?? {}),
                  },
                ]
              : [
                  {
                    ...lightStyles?.emailButtonContainer,
                    ...(customLightStyles?.emailButtonContainer ?? {}),
                  },
                ]),
            {
              ...styles.emailButtonContainer,
              ...(customStyles?.emailButtonContainer ?? {}),
            },
          ]}
        >
          <Button
            customStyles={extraCustomStyles?.emailButton}
            customDarkStyles={extraCustomDarkStyles?.emailButton}
            customLightStyles={extraCustomLightStyles?.emailButton}
            loading={isLoading}
            loadingComponent={loadingComponent}
            type={'primary'}
            size={'full'}
            onPress={handleSubmitAsync}
            disabled={
              authView === VIEWS.SIGN_UP ? !termAgreementChecked : false
            }
            block={true}
            icon={<Lock size={21} color={Colors.gray_100} />}
          >
            {authView === VIEWS.SIGN_IN ? strings.signIn : strings.signUp}
          </Button>
        </View>
      </View>
    </View>
  );
}
