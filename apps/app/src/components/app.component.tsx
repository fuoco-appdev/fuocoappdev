/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { useEffect, useMemo, useRef } from 'react';
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  Router,
  BrowserRouter,
  useLocation,
} from 'react-router-dom';
import WindowController from '../controllers/window.controller';
import WindowComponent from './window.component';
import SigninComponent from './signin.component';
import SignupComponent from './signup.component';
import ForgotPasswordComponent from './forgot-password.component';
import ResetPasswordComponent from './reset-password.component';
import TermsOfServiceComponent from './terms-of-service.component';
import PrivacyPolicyComponent from './privacy-policy.component';
import AccountComponent from './account.component';
import { RoutePaths } from '../route-paths';
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
import ProductComponent from './product.component';
import CheckoutComponent from './checkout.component';
import OrderConfirmedComponent from './order-confirmed.component';
import { useObservable } from '@ngneat/use-observable';
import AccountEditComponent from './account-edit.component';
import AccountSettingsAccountComponent from './account-settings-account.component';
import LoadingComponent from './loading.component';
import AppController from '../controllers/app.controller';
import styles from './app.module.scss';

interface RouteElementProps {
  element: JSX.Element;
}

function GuestComponent({ element }: RouteElementProps): React.ReactElement {
  const [props] = useObservable(WindowController.model.store);
  return !props.isAuthenticated ? (
    element
  ) : (
    <Navigate to={RoutePaths.Account} />
  );
}

function AuthenticatedComponent({
  element,
}: RouteElementProps): React.ReactElement {
  const [props] = useObservable(WindowController.model.store);
  return props.isAuthenticated ? element : <Navigate to={RoutePaths.Signin} />;
}

export default function AppComponent(): JSX.Element {
  const renderCountRef = useRef<number>(0);
  const memoCountRef = useRef<number>(0);
  useEffect(() => {
    renderCountRef.current += 1;

    AppController.initialize(renderCountRef.current);
    return () => {
      AppController.dispose(renderCountRef.current);
    };
  }, []);

  useMemo(() => {
    memoCountRef.current += 1;
    if (memoCountRef.current > 1) {
      return;
    }

    WindowController.updateLoadedLocationPath(window.location.pathname);
  }, []);

  return (
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
        <Route
          path={`${RoutePaths.Store}/:id`}
          element={<ProductComponent />}
        />
        <Route path={RoutePaths.Events} element={<EventsComponent />} />
        <Route path={RoutePaths.Cart} element={<CartComponent />} />
        <Route path={RoutePaths.Checkout} element={<CheckoutComponent />} />
        <Route
          path={`${RoutePaths.OrderConfirmed}/:id`}
          element={<OrderConfirmedComponent />}
        />
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
              <AuthenticatedComponent element={<AccountAddressesComponent />} />
            }
          />
          <Route
            path={RoutePaths.AccountEdit}
            element={
              <AuthenticatedComponent element={<AccountEditComponent />} />
            }
          />
        </Route>
        <Route
          path={RoutePaths.AccountSettings}
          element={
            <AuthenticatedComponent element={<AccountSettingsComponent />} />
          }
        >
          <Route
            path={RoutePaths.AccountSettingsAccount}
            element={
              <AuthenticatedComponent
                element={<AccountSettingsAccountComponent />}
              />
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}
