import {
  ImageStyle,
  StyleSheet,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
  Linking,
} from 'react-native';
import Button, { ButtonStyles } from '../Button/Button';
import Divider, { DividerStyles } from '../Divider/Divider';
import {
  AndroidRippleProps,
  AuthProps,
  AuthStrings,
  RedirectTo,
  ViewType,
} from './Auth';
import { useState } from 'react';
import { AuthError, Provider, SupabaseClient } from '@supabase/supabase-js';
import SocialButton, { SocialButtonStyles } from './SocialButton';
import MarginsPaddings from '../Themes/margins_paddings';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';

export interface SocialAuthStyles {
  buttonRoot?: ViewStyle | TextStyle | ImageStyle;
  buttonContainer?: ViewStyle | TextStyle | ImageStyle;
}

export interface ExtraSocialAuthStyles {
  socialButton?: SocialButtonStyles;
  divider?: DividerStyles;
}

export interface SocialAuthProps {
  supabaseClient: SupabaseClient;
  customStyles?: SocialAuthStyles;
  customDarkStyles?: SocialAuthStyles;
  customLightStyles?: SocialAuthStyles;
  customExtraStyles?: ExtraSocialAuthStyles;
  customExtraDarkStyles?: ExtraSocialAuthStyles;
  customExtraLightStyles?: ExtraSocialAuthStyles;
  socialLoadingComponent?: JSX.Element;
  strings?: AuthStrings;
  socialColors?: boolean;
  socialButtonSize?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge';
  providers?: Provider[];
  verticalSocialLayout?: any;
  view?: ViewType;
  redirectTo?: RedirectTo;
  onlyThirdPartyProviders?: boolean;
  onAuthenticating?: () => void;
  onSigninError?: (error: AuthError) => void;
  onSignupError?: (error: AuthError) => void;
}

const styles = StyleSheet.create<SocialAuthStyles>({
  buttonRoot: {
    marginBottom: MarginsPaddings.mp_6,
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: MarginsPaddings.mp_3,
  },
});
const lightStyles = StyleSheet.create<SocialAuthStyles>({});
const darkStyles = StyleSheet.create<SocialAuthStyles>({});

const dividerStyles = StyleSheet.create<DividerStyles>({
  root: {
    marginBottom: MarginsPaddings.mp_6,
  },
});
const dividerLightStyles = StyleSheet.create<DividerStyles>({});
const dividerDarkStyles = StyleSheet.create<DividerStyles>({});

export default function SocialAuth({
  customStyles,
  customDarkStyles,
  customLightStyles,
  customExtraStyles,
  customExtraDarkStyles,
  customExtraLightStyles,
  view,
  strings,
  socialLoadingComponent,
  supabaseClient,
  socialColors = false,
  socialButtonSize = 'large',
  providers,
  verticalSocialLayout,
  redirectTo,
  onlyThirdPartyProviders,
  onAuthenticating,
  onSigninError,
  onSignupError,
}: SocialAuthProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createSessionFromUrl = async (urlValue: string) => {
    const url = new URL(urlValue);
    const accessToken = url.searchParams.get('access_token');
    const refreshToken = url.searchParams.get('refresh_token');

    if (!accessToken || !refreshToken) return;

    const { data, error } = await supabaseClient.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (error) throw error;

    return data.session;
  };

  const handleProviderSignIn = async (provider: Provider) => {
    setIsLoading(true);
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    });

    if (error) {
      if (view == 'sign_in') {
        onSigninError?.(error);
      } else if (view === 'sign_up') {
        onSignupError?.(error);
      }
    }

    onAuthenticating ? onAuthenticating?.() : null;

    try {
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser.openAuth(data?.url ?? '', redirectTo ?? '', {
          // iOS Properties
          ephemeralWebSession: false,
          // Android Properties
          showTitle: false,
          enableUrlBarHiding: true,
          enableDefaultShare: false,
        }).then(async (response) => {
          if (response.type === 'success' && response.url) {
            Linking.openURL(response.url);
            await createSessionFromUrl(response.url);
            setIsLoading(false);
          }
        });
      } else Linking.openURL(data?.url ?? '');
    } catch (error) {
      Linking.openURL(data?.url ?? '');
    }
  };

  const signLabel =
    view === 'sign_up' ? `${strings?.signUpWith} ` : `${strings?.signInWith} `;
  return (
    <View>
      {providers && providers.length > 0 && (
        <>
          <View
            style={[
              ...(isDarkTheme
                ? [
                    {
                      ...darkStyles?.buttonRoot,
                      ...(customDarkStyles?.buttonRoot ?? {}),
                    },
                  ]
                : [
                    {
                      ...lightStyles?.buttonRoot,
                      ...(customLightStyles?.buttonRoot ?? {}),
                    },
                  ]),
              { ...styles.buttonRoot, ...(customStyles?.buttonRoot ?? {}) },
            ]}
          >
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
              {providers.map((provider) => {
                return (
                  <SocialButton
                    customStyles={customExtraStyles?.socialButton}
                    customDarkStyles={customExtraDarkStyles?.socialButton}
                    customLightStyles={customExtraLightStyles?.socialButton}
                    key={`${provider}-button`}
                    provider={provider}
                    verticalSocialLayout={verticalSocialLayout}
                    socialButtonSize={socialButtonSize}
                    signLabel={signLabel}
                    socialColors={socialColors}
                    strings={strings!}
                    isLoading={isLoading}
                    loadingComponent={socialLoadingComponent}
                    handleProviderSignIn={handleProviderSignIn}
                  />
                );
              })}
            </View>
          </View>
          {!onlyThirdPartyProviders && (
            <Divider
              customStyles={{ ...dividerStyles, ...customExtraStyles?.divider }}
              customDarkStyles={{
                ...dividerDarkStyles,
                ...customExtraDarkStyles?.divider,
              }}
              customLightStyles={{
                ...dividerLightStyles,
                ...customExtraLightStyles?.divider,
              }}
            >
              {strings?.orContinueWith}
            </Divider>
          )}
        </>
      )}
    </View>
  );
}
