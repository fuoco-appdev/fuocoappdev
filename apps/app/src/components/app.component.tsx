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
import CheckoutController from '../controllers/checkout.controller';
import OrderConfirmedController from '../controllers/order-confirmed.controller';
import NotificationsController from '../controllers/notifications.controller';
import TermsOfServiceController from '../controllers/terms-of-service.controller';
import PrivacyPolicyController from '../controllers/privacy-policy.controller';
import LoadingController from '../controllers/loading.controller';
import ResetPasswordController from '../controllers/reset-password.controller';
import AccountController from '../controllers/account.controller';
import ProductController from '../controllers/product.controller';
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

interface RouteElementProps {
  element: JSX.Element;
}

function GuestComponent({ element }: RouteElementProps): React.ReactElement {
  const [user] = useObservable(SupabaseService.userObservable);
  return !user ? element : <Navigate to={RoutePaths.Account} />;
}

function AuthenticatedComponent({
  element,
}: RouteElementProps): React.ReactElement {
  const [user] = useObservable(SupabaseService.userObservable);
  return user ? element : <Navigate to={RoutePaths.Signin} />;
}

export default function AppComponent(): JSX.Element {
  const renderCountRef = useRef<number>(0);
  useEffect(() => {
    renderCountRef.current += 1;

    LoadingController.initialize(renderCountRef.current);
    SigninController.initialize(renderCountRef.current);
    SignupController.initialize(renderCountRef.current);
    WindowController.initialize(renderCountRef.current);
    TermsOfServiceController.initialize(renderCountRef.current);
    PrivacyPolicyController.initialize(renderCountRef.current);
    ResetPasswordController.initialize(renderCountRef.current);
    AccountController.initialize(renderCountRef.current);
    HomeController.initialize(renderCountRef.current);
    StoreController.initialize(renderCountRef.current);
    EventsController.initialize(renderCountRef.current);
    CartController.initialize(renderCountRef.current);
    CheckoutController.initialize(renderCountRef.current);
    OrderConfirmedController.initialize(renderCountRef.current);
    NotificationsController.initialize(renderCountRef.current);
    ProductController.initialize(renderCountRef.current);

    return () => {
      SigninController.dispose(renderCountRef.current);
      SignupController.dispose(renderCountRef.current);
      WindowController.dispose(renderCountRef.current);
      TermsOfServiceController.dispose(renderCountRef.current);
      PrivacyPolicyController.dispose(renderCountRef.current);
      ResetPasswordController.dispose(renderCountRef.current);
      AccountController.dispose(renderCountRef.current);
      LoadingController.dispose(renderCountRef.current);
      HomeController.dispose(renderCountRef.current);
      StoreController.dispose(renderCountRef.current);
      EventsController.dispose(renderCountRef.current);
      CartController.dispose(renderCountRef.current);
      CheckoutController.dispose(renderCountRef.current);
      OrderConfirmedController.dispose(renderCountRef.current);
      NotificationsController.dispose(renderCountRef.current);
      ProductController.dispose(renderCountRef.current);
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
                <AuthenticatedComponent
                  element={<AccountAddressesComponent />}
                />
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
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}
