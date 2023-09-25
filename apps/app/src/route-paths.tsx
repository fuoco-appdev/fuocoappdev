import { RouteObject } from 'react-router-dom';
import AppComponent, {
  AuthenticatedComponent,
  GuestComponent,
} from './components/app.component';
import HomeComponent from './components/home.component';
import SigninComponent from './components/signin.component';
import SignupComponent from './components/signup.component';
import ForgotPasswordComponent from './components/forgot-password.component';
import ResetPasswordComponent from './components/reset-password.component';
import TermsOfServiceComponent from './components/terms-of-service.component';
import PrivacyPolicyComponent from './components/privacy-policy.component';
import ProductComponent from './components/product.component';
import AccountComponent from './components/account.component';
import StoreComponent from './components/store.component';
import EventsComponent from './components/events.component';
import CartComponent from './components/cart.component';
import NotificationsComponent from './components/notifications.component';
import AccountEventsComponent from './components/account-events.component';
import AccountOrderHistoryComponent from './components/account-order-history.component';
import AccountAddressesComponent from './components/account-addresses.component';
import AccountSettingsComponent from './components/account-settings.component';
import CheckoutComponent from './components/checkout.component';
import OrderConfirmedComponent from './components/order-confirmed.component';
import AccountEditComponent from './components/account-edit.component';
import AccountSettingsAccountComponent from './components/account-settings-account.component';
import LoadingComponent from './components/loading.component';

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
        element: <GuestComponent element={<SigninComponent />} />,
      },
      {
        path: RoutePathsType.Signup,
        element: <GuestComponent element={<SignupComponent />} />,
      },
      {
        path: RoutePathsType.ForgotPassword,
        element: <GuestComponent element={<ForgotPasswordComponent />} />,
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
        element: (
          <AuthenticatedComponent element={<NotificationsComponent />} />
        ),
      },
      {
        path: RoutePathsType.Account,
        element: <AuthenticatedComponent element={<AccountComponent />} />,
        children: [
          {
            path: RoutePathsType.AccountOrderHistory,
            element: (
              <AuthenticatedComponent
                element={<AccountOrderHistoryComponent />}
              />
            ),
          },
          {
            path: RoutePathsType.AccountAddresses,
            element: (
              <AuthenticatedComponent element={<AccountAddressesComponent />} />
            ),
          },
          {
            path: RoutePathsType.AccountEdit,
            element: (
              <AuthenticatedComponent element={<AccountEditComponent />} />
            ),
          },
        ],
      },
      {
        path: RoutePathsType.AccountSettings,
        element: (
          <AuthenticatedComponent element={<AccountSettingsComponent />} />
        ),
        children: [
          {
            path: RoutePathsType.AccountSettingsAccount,
            element: (
              <AuthenticatedComponent
                element={<AccountSettingsAccountComponent />}
              />
            ),
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
