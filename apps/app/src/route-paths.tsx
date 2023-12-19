import { RouteObject, useLocation } from 'react-router-dom';
import AppComponent from './components/app.component';
import HomeComponent from './components/home.component';
import SigninComponent from './components/signin.component';
import SignupComponent from './components/signup.component';
import ForgotPasswordComponent from './components/forgot-password.component';
import ResetPasswordComponent from './components/reset-password.component';
import TermsOfServiceComponent from './components/terms-of-service.component';
import PrivacyPolicyComponent from './components/privacy-policy.component';
import PermissionsComponent from './components/permissions.component';
import ProductComponent from './components/product.component';
import AccountComponent from './components/account.component';
import StoreComponent from './components/store.component';
import EventsComponent from './components/events.component';
import CartComponent from './components/cart.component';
import NotificationsComponent from './components/notifications.component';
import AccountEventsComponent from './components/account-events.component';
import AccountOrderHistoryComponent from './components/account-order-history.component';
import AccountAddressesComponent from './components/account-addresses.component';
import AccountAddFriendsComponent from './components/account-add-friends.component';
import AccountSettingsComponent from './components/account-settings.component';
import CheckoutComponent from './components/checkout.component';
import OrderConfirmedComponent from './components/order-confirmed.component';
import AccountEditComponent from './components/account-likes.component';
import AccountSettingsAccountComponent from './components/account-settings-account.component';
import LoadingComponent from './components/loading.component';
import React from 'react';
import HelpComponent from './components/help.component';

export enum RoutePathsType {
  Default = '/',
  Home = '/home',
  Signin = '/signin',
  Signup = '/signup',
  ForgotPassword = '/forgot-password',
  TermsOfService = '/terms-of-service',
  PrivacyPolicy = '/privacy-policy',
  Permissions = '/permissions',
  Help = '/help',
  ResetPassword = '/reset-password',
  Store = '/store',
  StoreWithId = '/store/:id',
  Events = '/events',
  Notifications = '/notifications',
  Cart = '/cart',
  Checkout = '/checkout',
  Account = '/account',
  AccountEvents = '/account/events',
  AccountOrderHistory = '/account/order-history',
  AccountAddresses = '/account/addresses',
  AccountLikes = '/account/likes',
  AccountHelp = '/account/help',
  AccountAddFriends = '/account/add-friends',
  AccountSettings = '/account/settings',
  AccountSettingsAccount = '/account/settings/account',
  OrderConfirmed = '/order/confirmed',
  OrderConfirmedWithId = '/order/confirmed/:id',
}

export const getRoutePaths = (): RouteObject[] => [
  {
    path: RoutePathsType.Default,
    element: <AppComponent />,
    children: [
      {
        index: true,
        element: <HomeComponent />,
      },
      {
        path: RoutePathsType.Home,
        element: <HomeComponent />,
      },
      {
        path: RoutePathsType.Signin,
        element: <SigninComponent />,
      },
      {
        path: RoutePathsType.Signup,
        element: <SignupComponent />,
      },
      {
        path: RoutePathsType.ForgotPassword,
        element: <ForgotPasswordComponent />,
      },
      {
        path: RoutePathsType.TermsOfService,
        element: <TermsOfServiceComponent />,
      },
      {
        path: RoutePathsType.PrivacyPolicy,
        element: <PrivacyPolicyComponent />,
      },
      {
        path: RoutePathsType.Permissions,
        element: <PermissionsComponent />,
      },
      {
        path: RoutePathsType.ResetPassword,
        element: <ResetPasswordComponent />,
      },
      {
        path: RoutePathsType.Help,
        element: <HelpComponent />,
      },
      {
        path: RoutePathsType.Store,
        element: <StoreComponent />,
      },
      {
        path: RoutePathsType.StoreWithId,
        element: <ProductComponent />,
      },
      {
        path: RoutePathsType.Events,
        element: <EventsComponent />,
      },
      {
        path: RoutePathsType.Cart,
        element: <CartComponent />,
      },
      {
        path: RoutePathsType.Checkout,
        element: <CheckoutComponent />,
      },
      {
        path: RoutePathsType.OrderConfirmedWithId,
        element: <OrderConfirmedComponent />,
      },
      {
        path: RoutePathsType.Notifications,
        element: <NotificationsComponent />,
      },
      {
        path: RoutePathsType.Account,
        element: <AccountComponent />,
        children: [
          {
            path: RoutePathsType.AccountLikes,
            element: <AccountEditComponent />,
          },
          {
            path: RoutePathsType.AccountOrderHistory,
            element: <AccountOrderHistoryComponent />,
          },
          {
            path: RoutePathsType.AccountAddresses,
            element: <AccountAddressesComponent />,
          },
        ],
      },
      {
        path: RoutePathsType.AccountHelp,
        element: <HelpComponent />,
      },
      {
        path: RoutePathsType.AccountAddFriends,
        element: <AccountAddFriendsComponent />,
      },
      {
        path: RoutePathsType.AccountSettings,
        element: <AccountSettingsComponent />,
        children: [
          {
            path: RoutePathsType.AccountSettingsAccount,
            element: <AccountSettingsAccountComponent />,
          },
        ],
      },
    ],
  },
];

export function updateRoutes(
  routePaths: RouteObject[],
  route: RouteObject
): RouteObject[] {
  for (let i = 0; i < routePaths.length; i++) {
    if (routePaths[i].path === route.path) {
      routePaths[i] = route;
      return routePaths;
    }

    if (routePaths[i].children) {
      updateRoutes(routePaths[i].children ?? [], route);
    }
  }

  return routePaths;
}

export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
