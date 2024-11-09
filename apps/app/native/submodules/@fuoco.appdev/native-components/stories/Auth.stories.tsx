import type { Meta, StoryObj } from '@storybook/react';
import {
  ChevronRight,
  ShoppingBag,
  Refresh,
  ShoppingBasket,
} from '../components/Icon/Icons/Line';
import Auth from '../components/Auth/Auth';
import { ScrollView, View } from 'react-native';
import Colors from '../components/Themes/colors';
import 'react-native-url-polyfill/auto';
import { AuthError, createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const supabase = createClient(
  'http://localhost:8000',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNjgzNzc3NjAwLAogICAgImV4cCI6IDE4NDE2MzA0MDAKfQ.uKHtXlVXjFGozrOEbtTayv2Vrr5LS7eavQBiOdZekZ4',
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

const meta = {
  title: 'Auth/Auth',
  component: Auth,
} satisfies Meta<typeof Auth>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    supabaseClient: supabase,
  },
  render: (args: any) => {
    const [error, setError] = useState<AuthError | null>(null);
    const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(
      null
    );
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<
      string | null
    >(null);
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
      useState<string | null>(null);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
      if (error?.status === 400) {
        setEmailErrorMessage('You must provide a valid email address');
        setPasswordErrorMessage('You must provide a valid password');
      } else {
        setEmailErrorMessage(null);
        setPasswordErrorMessage(null);
      }

      if (error?.status === 401) {
        setConfirmPasswordErrorMessage('Confirm password does not match');
      } else {
        setConfirmPasswordErrorMessage(null);
      }
    }, [error]);

    return (
      <ScrollView
        style={{
          padding: 13,
        }}
      >
        <Auth
          {...args}
          emailValue={email}
          passwordValue={password}
          emailErrorMessage={emailErrorMessage}
          passwordErrorMessage={passwordErrorMessage}
          confirmPasswordErrorMessage={confirmPasswordErrorMessage}
          onEmailChanged={(e) => setEmail(e.nativeEvent.text)}
          onPasswordChanged={(e) => setPassword(e.nativeEvent.text)}
          onSigninError={(error: AuthError) => setError(error)}
          onSignupError={(error: AuthError) => setError(error)}
          onAuthenticating={() => console.log('Authenticating!')}
          onEmailConfirmationSent={() =>
            console.log('Email confirmation sent!')
          }
        />
      </ScrollView>
    );
  },
};

export const WithSocialAuthSignin: Story = {
  args: {
    supabaseClient: supabase,
  },
  render: (args: any) => {
    const [error, setError] = useState<AuthError | null>(null);
    const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(
      null
    );
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<
      string | null
    >(null);
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
      useState<string | null>(null);

    useEffect(() => {
      if (error?.status === 400) {
        setEmailErrorMessage('You must provide a valid email address');
        setPasswordErrorMessage('You must provide a valid password');
      } else {
        setEmailErrorMessage(null);
        setPasswordErrorMessage(null);
      }

      if (error?.status === 401) {
        setConfirmPasswordErrorMessage('Confirm password does not match');
      } else {
        setConfirmPasswordErrorMessage(null);
      }
    }, [error]);

    return (
      <ScrollView
        style={{
          padding: 13,
        }}
      >
        <Auth
          {...args}
          providers={['facebook', 'google']}
          onAuthenticating={() => console.log('Authenticating!')}
          onEmailConfirmationSent={() =>
            console.log('Email confirmation sent!')
          }
          emailErrorMessage={emailErrorMessage}
          passwordErrorMessage={passwordErrorMessage}
          confirmPasswordErrorMessage={confirmPasswordErrorMessage}
          onSigninError={(error: AuthError) => setError(error)}
          onSignupError={(error: AuthError) => setError(error)}
        />
      </ScrollView>
    );
  },
};

export const WithAllSocialAuthSignin: Story = {
  args: {
    supabaseClient: supabase,
  },
  render: (args: any) => {
    const [error, setError] = useState<AuthError | null>(null);
    const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(
      null
    );
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<
      string | null
    >(null);
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
      useState<string | null>(null);

    useEffect(() => {
      if (error?.status === 400) {
        setEmailErrorMessage('You must provide a valid email address');
        setPasswordErrorMessage('You must provide a valid password');
      } else {
        setEmailErrorMessage(null);
        setPasswordErrorMessage(null);
      }

      if (error?.status === 401) {
        setConfirmPasswordErrorMessage('Confirm password does not match');
      } else {
        setConfirmPasswordErrorMessage(null);
      }
    }, [error]);

    return (
      <ScrollView
        style={{
          padding: 13,
        }}
      >
        <Auth
          {...args}
          providers={[
            'apple',
            'azure',
            'bitbucket',
            'discord',
            'facebook',
            'github',
            'google',
            'twitch',
            'twitter',
          ]}
          socialColors={true}
          onAuthenticating={() => console.log('Authenticating!')}
          onEmailConfirmationSent={() =>
            console.log('Email confirmation sent!')
          }
          emailErrorMessage={emailErrorMessage}
          passwordErrorMessage={passwordErrorMessage}
          confirmPasswordErrorMessage={confirmPasswordErrorMessage}
          onSigninError={(error: AuthError) => setError(error)}
          onSignupError={(error: AuthError) => setError(error)}
        />
      </ScrollView>
    );
  },
};

export const WithAllSocialAuthSignup: Story = {
  args: {
    supabaseClient: supabase,
  },
  render: (args: any) => {
    const [error, setError] = useState<AuthError | null>(null);
    const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(
      null
    );
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<
      string | null
    >(null);
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
      useState<string | null>(null);

    useEffect(() => {
      if (error?.status === 400) {
        setEmailErrorMessage('You must provide a valid email address');
        setPasswordErrorMessage('You must provide a valid password');
      } else {
        setEmailErrorMessage(null);
        setPasswordErrorMessage(null);
      }

      if (error?.status === 401) {
        setConfirmPasswordErrorMessage('Confirm password does not match');
      } else {
        setConfirmPasswordErrorMessage(null);
      }
    }, [error]);

    return (
      <ScrollView
        style={{
          padding: 13,
        }}
      >
        <Auth
          {...args}
          providers={[
            'apple',
            'azure',
            'bitbucket',
            'discord',
            'facebook',
            'github',
            'google',
            'twitch',
            'twitter',
          ]}
          socialColors={true}
          view={'sign_up'}
          onAuthenticating={() => console.log('Authenticating!')}
          onEmailConfirmationSent={() =>
            console.log('Email confirmation sent!')
          }
          emailErrorMessage={emailErrorMessage}
          passwordErrorMessage={passwordErrorMessage}
          confirmPasswordErrorMessage={confirmPasswordErrorMessage}
          onSigninError={(error: AuthError) => setError(error)}
          onSignupError={(error: AuthError) => setError(error)}
        />
      </ScrollView>
    );
  },
};

export const ForgottenPassword: Story = {
  args: {
    supabaseClient: supabase,
  },
  render: (args: any) => {
    return (
      <ScrollView
        style={{
          padding: 13,
        }}
      >
        <Auth {...args} view={'forgotten_password'} />
      </ScrollView>
    );
  },
};

export const UpdatePassword: Story = {
  args: {
    supabaseClient: supabase,
  },
  render: (args: any) => {
    return (
      <ScrollView
        style={{
          padding: 13,
        }}
      >
        <Auth {...args} view={'update_password'} />
      </ScrollView>
    );
  },
};

export const ResetPassword: Story = {
  args: {
    supabaseClient: supabase,
  },
  render: (args: any) => {
    return (
      <ScrollView
        style={{
          padding: 13,
        }}
      >
        <Auth {...args} view={'reset_password'} />
      </ScrollView>
    );
  },
};
