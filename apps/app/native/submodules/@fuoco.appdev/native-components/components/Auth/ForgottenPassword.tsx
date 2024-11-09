import {
  ImageStyle,
  StyleSheet,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import Button, { ButtonStyles } from '../Button/Button';
import Input, { InputStyles } from '../Input/Input';
import { AuthStrings, RedirectTo } from './Auth';
import { AuthError, SupabaseClient } from '@supabase/supabase-js';
import { useState } from 'react';
import { Email, Inbox } from '../Icon/Icons/Line';
import MarginsPaddings from '../Themes/margins_paddings';

export interface ForgottenPasswordStyles {
  buttonContainer?: ViewStyle | TextStyle | ImageStyle;
  buttonContent?: ViewStyle | TextStyle | ImageStyle;
  buttonIcon?: ViewStyle | TextStyle | ImageStyle;
  link?: ViewStyle | TextStyle | ImageStyle;
}

export interface ExtraForgottenPasswordStyles {
  input?: InputStyles;
  button?: ButtonStyles;
}

export interface ForgottenPasswordProps {
  email?: string;
  customStyles?: ForgottenPasswordStyles;
  customDarkStyles?: ForgottenPasswordStyles;
  customLightStyles?: ForgottenPasswordStyles;
  extraCustomStyles?: ExtraForgottenPasswordStyles;
  extraCustomDarkStyles?: ExtraForgottenPasswordStyles;
  extraCustomLightStyles?: ExtraForgottenPasswordStyles;
  loadingComponent?: React.ReactNode;
  strings: AuthStrings;
  supabaseClient: SupabaseClient;
  redirectTo?: RedirectTo;
  emailErrorMessage?: string;
  onEmailChanged?: (email: string) => void;
  onSigninRedirect?: () => void;
  onResetPasswordError?: (error: AuthError) => void;
  onResetPasswordSent?: () => void;
}

const styles = StyleSheet.create<ForgottenPasswordStyles>({});
const lightStyles = StyleSheet.create<ForgottenPasswordStyles>({});
const darkStyles = StyleSheet.create<ForgottenPasswordStyles>({});

export default function ForgottenPassword({
  email,
  customStyles,
  customDarkStyles,
  customLightStyles,
  extraCustomStyles,
  extraCustomDarkStyles,
  extraCustomLightStyles,
  strings,
  loadingComponent,
  supabaseClient,
  redirectTo,
  emailErrorMessage,
  onEmailChanged,
  onSigninRedirect,
  onResetPasswordError,
  onResetPasswordSent,
}: ForgottenPasswordProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePasswordResetAsync = async (e: any) => {
    setIsLoading(true);
    const { error } = await supabaseClient.auth.resetPasswordForEmail(
      email ?? '',
      {
        redirectTo,
      }
    );
    setIsLoading(false);
    if (error) onResetPasswordError?.(error);
    else onResetPasswordSent?.();
  };

  return (
    <View>
      <View
        style={[
          {
            ...styles.buttonContainer,
            ...(customStyles?.buttonContainer ?? {}),
          },
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
        ]}
      >
        <Input
          customStyles={extraCustomStyles?.input}
          customDarkStyles={extraCustomDarkStyles?.input}
          customLightStyles={extraCustomLightStyles?.input}
          label={strings.emailAddress}
          placeholder={strings.yourEmailAddress}
          error={emailErrorMessage}
          icon={<Email size={21} color={isDarkTheme ? '#fff' : '#000'} />}
          onChange={(e) => onEmailChanged?.(e.nativeEvent.text)}
        />
        <Button
          customStyles={{
            root: {
              paddingTop: MarginsPaddings.mp_6,
              paddingBottom: MarginsPaddings.mp_6,
            },
            ...extraCustomStyles?.button,
          }}
          customDarkStyles={extraCustomDarkStyles?.button}
          customLightStyles={extraCustomLightStyles?.button}
          loading={isLoading}
          loadingComponent={loadingComponent}
          block
          size={'full'}
          icon={<Inbox size={21} color={'#fff'} />}
          onPress={handlePasswordResetAsync}
        >
          {strings.sendResetPasswordInstructions}
        </Button>
      </View>
    </View>
  );
}
