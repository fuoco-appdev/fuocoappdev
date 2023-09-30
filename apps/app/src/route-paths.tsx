import { RouteObject } from 'react-router-dom';
import { lazy } from '@loadable/component';
const AppComponent = lazy(() => import('./components/app.component'));
const HomeComponent = lazy(() => import('./components/home.component'));
const SigninComponent = lazy(() => import('./components/signin.component'));
const SignupComponent = lazy(() => import('./components/signup.component'));
const ForgotPasswordComponent = lazy(
  () => import('./components/forgot-password.component')
);
const ResetPasswordComponent = lazy(
  () => import('./components/reset-password.component')
);
const TermsOfServiceComponent = lazy(
  () => import('./components/terms-of-service.component')
);
const PrivacyPolicyComponent = lazy(
  () => import('./components/privacy-policy.component')
);
const ProductComponent = lazy(() => import('./components/product.component'));
const AccountComponent = lazy(() => import('./components/account.component'));
const StoreComponent = lazy(() => import('./components/store.component'));
const EventsComponent = lazy(() => import('./components/events.component'));
const CartComponent = lazy(() => import('./components/cart.component'));
const NotificationsComponent = lazy(
  () => import('./components/notifications.component')
);
const AccountEventsComponent = lazy(
  () => import('./components/account-events.component')
);
const AccountOrderHistoryComponent = lazy(
  () => import('./components/account-order-history.component')
);
const AccountAddressesComponent = lazy(
  () => import('./components/account-addresses.component')
);
const AccountSettingsComponent = lazy(
  () => import('./components/account-settings.component')
);
const CheckoutComponent = lazy(() => import('./components/checkout.component'));
const OrderConfirmedComponent = lazy(
  () => import('./components/order-confirmed.component')
);
const AccountEditComponent = lazy(
  () => import('./components/account-edit.component')
);
const AccountSettingsAccountComponent = lazy(
  () => import('./components/account-settings-account.component')
);

export enum RoutePathsType {
  Default = '/',
  Home = '/home',
  Signin = '/signin',
  Signup = '/signup',
  ForgotPassword = '/forgot-password',
  TermsOfService = '/terms-of-service',
  PrivacyPolicy = '/privacy-policy',
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
  AccountEdit = '/account/edit',
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
        path: RoutePathsType.ResetPassword,
        element: <ResetPasswordComponent />,
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
            path: RoutePathsType.AccountOrderHistory,
            element: <AccountOrderHistoryComponent />,
          },
          {
            path: RoutePathsType.AccountAddresses,
            element: <AccountAddressesComponent />,
          },
          {
            path: RoutePathsType.AccountEdit,
            element: <AccountEditComponent />,
          },
        ],
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
