import {
  GestureResponderEvent,
  ImageStyle,
  StyleSheet,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import Button, { ButtonStyles } from '../Button/Button';
import Input, { InputStyles } from '../Input/Input';
import { AuthError, SupabaseClient } from '@supabase/supabase-js';
import { AuthStrings, defaultStrings } from './Auth';
import { useState } from 'react';
import { Key } from '../Icon/Icons/Line';
import MarginsPaddings from '../Themes/margins_paddings';

export interface UpdatePasswordStyles {
  buttonContainer?: ViewStyle | TextStyle | ImageStyle;
  buttonContent?: ViewStyle | TextStyle | ImageStyle;
  buttonIcon?: ViewStyle | TextStyle | ImageStyle;
}

export interface ExtraUpdatePasswordStyles {
  input?: InputStyles;
  button?: ButtonStyles;
}

export interface UpdatePasswordProps {
  customStyles?: UpdatePasswordStyles;
  customDarkStyles?: UpdatePasswordStyles;
  customLightStyles?: UpdatePasswordStyles;
  extraCustomStyles?: ExtraUpdatePasswordStyles;
  extraCustomDarkStyles?: ExtraUpdatePasswordStyles;
  extraCustomLightStyles?: ExtraUpdatePasswordStyles;
  supabaseClient: SupabaseClient;
  loadingComponent?: React.ReactNode;
  strings: AuthStrings;
  passwordErrorMessage?: string;
  confirmPasswordErrorMessage?: string;
  onUpdatePasswordError?: (error: AuthError) => void;
  onPasswordUpdated?: (e?: GestureResponderEvent) => void;
}

const styles = StyleSheet.create<UpdatePasswordStyles>({});
const lightStyles = StyleSheet.create<UpdatePasswordStyles>({});
const darkStyles = StyleSheet.create<UpdatePasswordStyles>({});

export default function UpdatePassword({
  customStyles,
  customDarkStyles,
  customLightStyles,
  extraCustomStyles,
  extraCustomDarkStyles,
  extraCustomLightStyles,
  strings,
  loadingComponent,
  supabaseClient,
  passwordErrorMessage,
  confirmPasswordErrorMessage,
  onUpdatePasswordError,
  onPasswordUpdated,
}: UpdatePasswordProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordResetAsync = async (e: any) => {
    setIsLoading(true);
    if (password !== confirmPassword) {
      onUpdatePasswordError?.(
        new AuthError('Confirm password does not match', 401)
      );
      return;
    }

    const { error } = await supabaseClient.auth.updateUser({ password });
    setIsLoading(false);
    if (error) onUpdatePasswordError?.(error);
    else onPasswordUpdated?.(e);
  };

  strings = { ...defaultStrings, ...strings };

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
          label={strings.newPassword}
          placeholder={strings.enterYourNewPassword}
          reveal={true}
          password={true}
          error={passwordErrorMessage}
          icon={<Key size={21} color={isDarkTheme ? '#fff' : '#000'} />}
          onChange={(e) => setPassword(e.nativeEvent.text)}
        />
        <Input
          customStyles={extraCustomStyles?.input}
          customDarkStyles={extraCustomDarkStyles?.input}
          customLightStyles={extraCustomLightStyles?.input}
          label={strings.confirmNewPassword}
          placeholder={strings.confirmNewPasswordPlaceholder}
          reveal={true}
          password={true}
          error={passwordErrorMessage}
          icon={<Key size={21} color={isDarkTheme ? '#fff' : '#000'} />}
          onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
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
          icon={<Key size={21} color={'#fff'} />}
          onPress={handlePasswordResetAsync}
        >
          {strings.updatePassword}
        </Button>
      </View>
    </View>
  );
}
