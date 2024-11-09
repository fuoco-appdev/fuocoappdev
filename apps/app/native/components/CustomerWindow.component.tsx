import {
  Avatar,
  Colors,
  Globals,
  Input,
  Line,
  MarginsPaddings,
  Solid,
} from '@fuoco.appdev/native-components';
import { BlurView } from '@react-native-community/blur';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Easing,
  StyleSheet,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import { RoutePathsType } from '../../shared/route-paths-type';
import { DIContext } from '../App';
import AccountComponent from './Account.component';
import HomeComponent from './Home.component';
import NotificationsComponent from './Notifications.component';
import SearchComponent from './Search.component';

export interface CustomerWindowProps {
  navigation: any;
}

export interface CustomerWindowStyles {
  avatarContainer?: ViewStyle;
  noAvatarContainer?: ViewStyle;
  avatarContainerSelected?: ViewStyle;
  avatarText?: TextStyle;
}

const styles = StyleSheet.create<CustomerWindowStyles>({
  avatarContainer: {
    width: 21,
    height: 21,
    backgroundColor: '#fff',
  },
  noAvatarContainer: {
    width: 21,
    height: 21,
    backgroundColor: Colors.brand_700,
  },
  avatarContainerSelected: {
    borderRadius: Globals.rounded_full,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#fff',
  },
  avatarText: {
    fontSize: Globals.font_size_xs,
    lineHeight: Globals.font_line_height_xs,
    color: '#fff',
  },
});
const lightStyles = StyleSheet.create<CustomerWindowStyles>({
  avatarContainer: {},
  avatarContainerSelected: {},
});

const darkStyles = StyleSheet.create<CustomerWindowStyles>({
  avatarContainer: {},
  avatarContainerSelected: {},
});

const Tab = createBottomTabNavigator();
function CustomerWindowComponent({ navigation }: CustomerWindowProps) {
  const { WindowController, AccountController } = useContext(DIContext);
  const theme = useColorScheme();
  const { t } = useTranslation();
  const isDarkTheme = theme === 'dark';
  const { customer, account, profileUrl } = AccountController.model;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
        },
        transitionSpec: {
          animation: 'timing',
          config: {
            duration: 150,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
          },
        },
        sceneStyleInterpolator: ({ current }: any) => ({
          sceneStyle: {
            opacity: current.progress.interpolate({
              inputRange: [-1, 0, 1],
              outputRange: [0, 1, 0],
            }),
          },
        }),
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === RoutePathsType.Home) {
            return focused ? (
              <Solid.Home size={21} color={color} />
            ) : (
              <Line.Home size={21} color={color} />
            );
          } else if (route.name === RoutePathsType.Search) {
            return focused ? (
              <Solid.Search size={21} color={color} />
            ) : (
              <Line.Search size={21} color={color} />
            );
          } else if (route.name === RoutePathsType.Notifications) {
            return focused ? (
              <Solid.Notifications size={21} color={color} />
            ) : (
              <Line.Notifications size={21} color={color} />
            );
          } else if (route.name === RoutePathsType.Account) {
            return (
              <View
                style={[
                  ...(isDarkTheme
                    ? [
                        darkStyles?.avatarContainer,
                        focused ? darkStyles?.avatarContainerSelected : {},
                      ]
                    : [
                        lightStyles?.avatarContainer,
                        focused ? lightStyles?.avatarContainerSelected : {},
                      ]),
                  focused ? styles.avatarContainerSelected : {},
                ]}
              >
                <Avatar
                  size={'custom'}
                  text={customer?.first_name ?? undefined}
                  src={profileUrl ? { uri: profileUrl } : undefined}
                  customStyles={{
                    container: profileUrl
                      ? styles?.avatarContainer
                      : styles?.noAvatarContainer,
                  }}
                  customLightStyles={{
                    text: styles?.avatarText,
                  }}
                  customDarkStyles={{
                    text: styles?.avatarText,
                  }}
                />
              </View>
            );
          }

          return <Line.Error size={21} color={color} />;
        },
        tabBarBackground: () => (
          <BlurView
            blurType="light"
            blurAmount={80}
            reducedTransparencyFallbackColor={'white'}
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'rgba(1, 87, 155, .89)',
            }}
          />
        ),
        headerShown:
          route.name === RoutePathsType.Search ||
          route.name === RoutePathsType.Notifications ||
          route.name === RoutePathsType.Account,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.55)',
        tabBarIconStyle: {
          width: 21,
          height: 21,
        },
      })}
    >
      <Tab.Screen name={RoutePathsType.Home} component={HomeComponent} />
      <Tab.Screen
        name={RoutePathsType.Search}
        options={{
          header: (props) => (
            <View
              style={[
                {
                  backgroundColor: '#fff',
                  paddingLeft: MarginsPaddings.mp_5,
                  paddingRight: MarginsPaddings.mp_5,
                  paddingTop: MarginsPaddings.mp_5,
                  shadowColor: '#000',
                  shadowOpacity: 1,
                  shadowRadius: MarginsPaddings.mp_2,
                  elevation: 8,
                },
              ]}
            >
              <Input
                placeholder={t('search') ?? ''}
                customStyles={{
                  container: {
                    borderRadius: Globals.rounded_full,
                  },
                }}
              />
            </View>
          ),
        }}
        component={SearchComponent}
      />
      <Tab.Screen
        name={RoutePathsType.Notifications}
        component={NotificationsComponent}
      />
      <Tab.Screen name={RoutePathsType.Account} component={AccountComponent} />
    </Tab.Navigator>
  );
}

export default observer(CustomerWindowComponent);
