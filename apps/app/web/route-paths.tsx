import * as React from 'react';
import { RouteObject, useLocation } from 'react-router-dom';
import { RoutePathsType } from '../shared/route-paths-type';
import AccountAddFriendsComponent from './components/account-add-friends.component';
import AccountAddressesComponent from './components/account-addresses.component';
import AccountEditComponent from './components/account-likes.component';
import AccountOrderHistoryComponent from './components/account-order-history.component';
import AccountPublicFollowersComponent from './components/account-public-followers.component';
import AccountPublicFollowingComponent from './components/account-public-following.component';
import AccountPublicLikesComponent from './components/account-public-likes.component';
import AccountPublicStatusComponent from './components/account-public-status.component';
import AccountPublicComponent from './components/account-public.component';
import AccountComponent from './components/account.component';
import AppComponent from './components/app.component';
import CartComponent from './components/cart.component';
import ChatComponent from './components/chat.component';
import ChatsComponent from './components/chats.component';
import CheckoutComponent from './components/checkout.component';
import EmailConfirmationComponent from './components/email-confirmation.component';
import EventsComponent from './components/events.component';
import ExploreComponent from './components/explore.component';
import ForgotPasswordComponent from './components/forgot-password.component';
import HelpComponent from './components/help.component';
import LandingComponent from './components/landing.component';
import NotificationsComponent from './components/notifications.component';
import OrderConfirmedComponent from './components/order-confirmed.component';
import PermissionsComponent from './components/permissions.component';
import PrivacyPolicyComponent from './components/privacy-policy.component';
import ProductComponent from './components/product.component';
import ResetPasswordComponent from './components/reset-password.component';
import AccountSettingsAccountComponent from './components/settings-account.component';
import AccountSettingsComponent from './components/settings.component';
import SigninComponent from './components/signin.component';
import SignupComponent from './components/signup.component';
import StoreComponent from './components/store.component';
import TermsOfServiceComponent from './components/terms-of-service.component';

export const getRoutePaths = (): RouteObject[] => [
  {
    path: RoutePathsType.Default,
    element: <AppComponent />,
    children: [
      {
        index: true,
        element: <LandingComponent />,
      },
      {
        path: RoutePathsType.Landing,
        element: <LandingComponent />,
      },
      {
        path: RoutePathsType.Explore,
        element: <ExploreComponent />,
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
        path: RoutePathsType.EmailConfirmation,
        element: <EmailConfirmationComponent />,
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
        path: RoutePathsType.Chats,
        element: <ChatsComponent />,
        children: [
          {
            index: true,
            element: <ChatComponent />,
          },
          {
            path: RoutePathsType.ChatsWithId,
            element: <ChatComponent />,
          },
        ],
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
            index: true,
            element: <AccountEditComponent />,
          },
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
        path: RoutePathsType.AccountWithId,
        element: <AccountPublicComponent />,
        children: [
          {
            index: true,
            element: <AccountPublicLikesComponent />,
          },
          {
            path: RoutePathsType.AccountWithIdLikes,
            element: <AccountPublicLikesComponent />,
          },
        ],
      },
      {
        path: RoutePathsType.AccountStatusWithId,
        element: <AccountPublicStatusComponent />,
        children: [
          {
            index: true,
            element: <AccountPublicFollowersComponent />,
          },
          {
            path: RoutePathsType.AccountStatusWithIdFollowers,
            element: <AccountPublicFollowersComponent />,
          },
          {
            path: RoutePathsType.AccountStatusWithIdFollowing,
            element: <AccountPublicFollowingComponent />,
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
        path: RoutePathsType.Settings,
        element: <AccountSettingsComponent />,
        children: [
          {
            index: true,
            element: <AccountSettingsAccountComponent />,
          },
          {
            path: RoutePathsType.SettingsAccount,
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
