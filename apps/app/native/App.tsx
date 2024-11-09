/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// prettier-ignore
import './Styles';
// prettier-ignore
import { Colors, Globals, MarginsPaddings, PortalProvider, Typography } from '@fuoco.appdev/native-components';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeaderBackButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { observer, useLocalObservable } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AppState, useColorScheme, View } from 'react-native';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import { enableScreens } from 'react-native-screens';
import '../shared/i18n';
import { RoutePathsType } from '../shared/route-paths-type';
import CompleteProfileComponent from './components/CompleteProfile.component';
import CustomerWindowComponent from './components/CustomerWindow.component';
import ForgotPasswordComponent from './components/ForgotPassword.component';
import LandingComponent from './components/Landing.component';
import SigninComponent from './components/Signin.component';
import SignupComponent from './components/Signup.component';
import register, { AppDIContainer } from './Register';

// configure({
//   enforceActions: 'always',
//   computedRequiresReaction: true,
//   reactionRequiresObservable: true,
//   observableRequiresReaction: true,
//   disableErrorBoundaries: false,
// });

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

enableScreens(true);

const Stack = createNativeStackNavigator();
const diContainer = register();

AppState.addEventListener('change', (state) => {
  const supabaseService = diContainer.get('SupabaseService');
  if (state === 'active') {
    supabaseService.supabaseClient?.auth.startAutoRefresh();
  } else {
    supabaseService.supabaseClient?.auth.stopAutoRefresh();
  }
});

export const DIContext = React.createContext<AppDIContainer>(diContainer);

function App(): React.JSX.Element | null {
  const windowController = diContainer.get('WindowController');
  const supabaseService = diContainer.get('SupabaseService');
  const appController = diContainer.get('AppController');
  const accountController = diContainer.get('AccountController');
  const { authState } = windowController.model;
  const { account } = accountController.model;
  const { session } = useLocalObservable(() => supabaseService);
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const { t } = useTranslation();

  React.useEffect(() => {
    appController.initializeServices(1).then();
    const authSubscription = supabaseService.subscribeToAuthStateChanged(
      (event, session) => {
        windowController.handleAuthStateChanged(event, session);
      }
    );
    appController.initialize(1);
    appController.load(1);

    return () => {
      appController.disposeLoad(1);
      appController.disposeInitialization(1);
      authSubscription?.unsubscribe();
    };
  }, []);

  const headerLeft = (props: HeaderBackButtonProps) => (
    <View
      style={[
        ...(isDarkTheme ? [] : []),
        {
          paddingLeft: MarginsPaddings.mp_5,
        },
      ]}
    >
      <Typography.Title
        customStyles={{
          root: {
            fontFamily: 'Dancing Script',
            fontWeight: Globals.font_weight_bold,
          },
        }}
        level={4}
      >
        Mindy
      </Typography.Title>
    </View>
  );

  return (
    <DIContext.Provider value={diContainer}>
      <PortalProvider>
        <NavigationContainer
          theme={{
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              background: isDarkTheme ? '#121212' : '#fff',
            },
          }}
        >
          {!session && (
            <Stack.Navigator>
              <Stack.Group>
                <Stack.Screen
                  name={RoutePathsType.Landing}
                  component={LandingComponent}
                  options={{
                    headerLeft: headerLeft,
                    headerShadowVisible: false,
                    headerStyle: {
                      backgroundColor: 'transparent',
                    },
                    headerTransparent: true,
                    headerTintColor: isDarkTheme
                      ? Colors.gray_100
                      : Colors.gray_900,
                    headerTitle: '',
                    animation: 'simple_push',
                    animationDuration: 75,
                    animationTypeForReplace:
                      authState === 'SIGNED_OUT' ? 'pop' : 'push',
                  }}
                />
                <Stack.Screen
                  name={RoutePathsType.Signin}
                  component={SigninComponent}
                  options={{
                    headerLeft: headerLeft,
                    headerShadowVisible: false,
                    headerBackVisible: true,
                    headerStyle: {
                      backgroundColor: 'transparent',
                    },
                    headerTransparent: true,
                    headerTintColor: isDarkTheme
                      ? Colors.gray_100
                      : Colors.gray_900,
                    headerTitle: '',
                    animation: 'simple_push',
                    animationDuration: 75,
                    animationTypeForReplace:
                      authState === 'SIGNED_OUT' ? 'pop' : 'push',
                  }}
                />
                <Stack.Screen
                  name={RoutePathsType.Signup}
                  component={SignupComponent}
                  options={{
                    headerLeft: headerLeft,
                    headerShadowVisible: false,
                    headerBackVisible: true,
                    headerStyle: {
                      backgroundColor: 'transparent',
                    },
                    headerTransparent: true,
                    headerTintColor: isDarkTheme
                      ? Colors.gray_100
                      : Colors.gray_900,
                    headerTitle: '',
                    animation: 'simple_push',
                    animationDuration: 75,
                    animationTypeForReplace:
                      authState === 'SIGNED_OUT' ? 'pop' : 'push',
                  }}
                />
                <Stack.Screen
                  name={RoutePathsType.ForgotPassword}
                  component={ForgotPasswordComponent}
                  options={{
                    headerLeft: headerLeft,
                    headerShadowVisible: false,
                    headerBackVisible: true,
                    headerStyle: {
                      backgroundColor: 'transparent',
                    },
                    headerTransparent: true,
                    headerTintColor: isDarkTheme
                      ? Colors.gray_100
                      : Colors.gray_900,
                    headerTitle: '',
                    animation: 'slide_from_right',
                    animationDuration: 75,
                    animationTypeForReplace:
                      authState === 'SIGNED_OUT' ? 'pop' : 'push',
                  }}
                />
              </Stack.Group>
            </Stack.Navigator>
          )}
          {session && account && (
            <Stack.Navigator>
              {account.status === 'Incomplete' && (
                <Stack.Group>
                  <Stack.Screen
                    name={RoutePathsType.CompleteProfile}
                    component={CompleteProfileComponent}
                    options={{
                      headerLeft: headerLeft,
                      headerShadowVisible: false,
                      headerBackVisible: false,
                      headerStyle: {
                        backgroundColor: 'transparent',
                      },
                      headerTransparent: true,
                      headerTintColor: isDarkTheme
                        ? Colors.gray_100
                        : Colors.gray_900,
                      headerTitle: '',
                      animation: 'simple_push',
                      animationDuration: 75,
                      animationTypeForReplace:
                        authState === 'SIGNED_OUT' ? 'pop' : 'push',
                    }}
                  />
                </Stack.Group>
              )}
              <Stack.Group>
                <Stack.Screen
                  name={RoutePathsType.Customer}
                  component={CustomerWindowComponent}
                  options={{
                    headerShown: false,
                    animation: 'simple_push',
                    animationDuration: 75,
                    animationTypeForReplace:
                      authState === 'SIGNED_OUT' ? 'pop' : 'push',
                  }}
                />
              </Stack.Group>
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </PortalProvider>
    </DIContext.Provider>
  );
}

export default observer(App);
