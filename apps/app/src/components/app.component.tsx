/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import WindowController from '../controllers/window.controller';
import SigninController from '../controllers/signin.controller';
import SignupController from '../controllers/signup.controller';
import HomeController from '../controllers/home.controller';
import StoreController from '../controllers/store.controller';
import EventsController from '../controllers/events.controller';
import CartController from '../controllers/cart.controller';
import NotificationsController from '../controllers/notifications.controller';
import TermsOfServiceController from '../controllers/terms-of-service.controller';
import PrivacyPolicyController from '../controllers/privacy-policy.controller';
import LoadingController from '../controllers/loading.controller';
import ResetPasswordController from '../controllers/reset-password.controller';
import AccountController from '../controllers/account.controller';
import WindowComponent from './window.component';
import SigninComponent from './signin.component';
import SignupComponent from './signup.component';
import ForgotPasswordComponent from './forgot-password.component';
import ResetPasswordComponent from './reset-password.component';
import TermsOfServiceComponent from './terms-of-service.component';
import PrivacyPolicyComponent from './privacy-policy.component';
import AccountComponent from './account.component';
import { RoutePaths } from '../route-paths';
import { useObservable } from '@ngneat/use-observable';
import SupabaseService from '../services/supabase.service';
import HomeComponent from './home.component';
import StoreComponent from './store.component';
import EventsComponent from './events.component';
import CartComponent from './cart.component';
import NotificationsComponent from './notifications.component';
import AccountEventsComponent from './account-events.component';
import AccountOrderHistoryComponent from './account-order-history.component';
import AccountAddressesComponent from './account-addresses.component';
import AccountSettingsComponent from './account-settings.component';

interface RouteElementProps {
  element: JSX.Element;
}

function GuestComponent({ element }: RouteElementProps): React.ReactElement {
  return !SupabaseService.user ? element : <Navigate to={RoutePaths.Account} />;
}

function AuthenticatedComponent({
  element,
}: RouteElementProps): React.ReactElement {
  return SupabaseService.user ? element : <Navigate to={RoutePaths.Signin} />;
}

export default function AppComponent(): JSX.Element {
  const rendered = useRef<boolean>(false);
  useEffect(() => {
    if (!rendered.current) {
      LoadingController.initialize();
      SigninController.initialize();
      SignupController.initialize();
      WindowController.initialize();
      TermsOfServiceController.initialize();
      PrivacyPolicyController.initialize();
      ResetPasswordController.initialize();
      AccountController.initialize();
      HomeController.initialize();
      StoreController.initialize();
      EventsController.initialize();
      CartController.initialize();
      NotificationsController.initialize();
    }

    return () => {
      if (!rendered.current) {
        SigninController.dispose();
        SignupController.dispose();
        WindowController.dispose();
        TermsOfServiceController.dispose();
        PrivacyPolicyController.dispose();
        ResetPasswordController.dispose();
        AccountController.dispose();
        LoadingController.dispose();
        HomeController.dispose();
        StoreController.dispose();
        EventsController.dispose();
        CartController.dispose();
        NotificationsController.dispose();
      }

      rendered.current = true;
    };
  }, []);
  return (
    <HashRouter>
      <Routes>
        <Route path={RoutePaths.Default} element={<WindowComponent />}>
          <Route index element={<HomeComponent />} />
          <Route path={RoutePaths.Home} element={<HomeComponent />} />
          <Route
            path={RoutePaths.Signin}
            element={<GuestComponent element={<SigninComponent />} />}
          />
          <Route
            path={RoutePaths.Signup}
            element={<GuestComponent element={<SignupComponent />} />}
          />
          <Route
            path={RoutePaths.ForgotPassword}
            element={<GuestComponent element={<ForgotPasswordComponent />} />}
          />
          <Route
            path={RoutePaths.TermsOfService}
            element={<TermsOfServiceComponent />}
          />
          <Route
            path={RoutePaths.PrivacyPolicy}
            element={<PrivacyPolicyComponent />}
          />
          <Route
            path={RoutePaths.ResetPassword}
            element={<ResetPasswordComponent />}
          />
          <Route path={RoutePaths.Store} element={<StoreComponent />} />
          <Route path={RoutePaths.Events} element={<EventsComponent />} />
          <Route path={RoutePaths.Cart} element={<CartComponent />} />
          <Route
            path={RoutePaths.Notifications}
            element={
              <AuthenticatedComponent element={<NotificationsComponent />} />
            }
          />
          <Route
            path={RoutePaths.Account}
            element={<AuthenticatedComponent element={<AccountComponent />} />}
          >
            <Route
              path={RoutePaths.AccountEvents}
              element={
                <AuthenticatedComponent element={<AccountEventsComponent />} />
              }
            />
            <Route
              path={RoutePaths.AccountOrderHistory}
              element={
                <AuthenticatedComponent
                  element={<AccountOrderHistoryComponent />}
                />
              }
            />
            <Route
              path={RoutePaths.AccountAddresses}
              element={
                <AuthenticatedComponent
                  element={<AccountAddressesComponent />}
                />
              }
            />
            <Route
              path={RoutePaths.AccountSettings}
              element={
                <AuthenticatedComponent
                  element={<AccountSettingsComponent />}
                />
              }
            />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}
