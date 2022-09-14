import React from 'react';
import { BrowserRouter, Routes, Route, PathRouteProps, LayoutRouteProps, IndexRouteProps, Navigate, HashRouter} from "react-router-dom";
import WorldController from '../controllers/world.controller';
import WindowController from '../controllers/window.controller';
import SigninController from '../controllers/signin.controller';
import SignupController from '../controllers/signup.controller';
import TermsOfServiceController from '../controllers/terms-of-service.controller';
import PrivacyPolicyController from '../controllers/privacy-policy.controller';
import WindowComponent from './window.component';
import LandingComponent from './landing.component';
import SigninComponent from './signin.component';
import SignupComponent from './signup.component';
import TermsOfServiceComponent from './terms-of-service.component';
import PrivacyPolicyComponent from './privacy-policy.component';
import AppController from '../controllers/app.controller';
import { RoutePaths } from '../route-paths';
import AuthService from '../services/auth.service';
import LoadingComponent from './loading.component';
import LoadingController from '../controllers/loading.controller';

interface RouteElementProps {
  element: JSX.Element;
}

function GuestComponent({element}: RouteElementProps): React.ReactElement {
  if (LoadingController.model.isLoading) {
    return <LoadingComponent />
  }

  return ((AuthService.user === null) ? element : <Navigate to={RoutePaths.Account}/>);
}

function AuthenticatedComponent({element}: RouteElementProps): React.ReactElement {
  if (LoadingController.model.isLoading) {
    return <LoadingComponent />
  }

  return (AuthService.user ? element : <Navigate to={RoutePaths.Signin}/>);
}

export class AppComponent extends React.Component {
  public override componentWillUnmount(): void {
      SigninController.dispose();
      SignupController.dispose();
      WorldController.dispose();
      WindowController.dispose();
      AppController.dispose();
      TermsOfServiceController.dispose();
      PrivacyPolicyController.dispose();
  }

  public override render(): React.ReactNode {
      return (
        <BrowserRouter>
          <Routes>
            <Route path={RoutePaths.Default} element={<WindowComponent />}>
              <Route index element={<GuestComponent element={<LandingComponent />}/>}/>
              <Route path={RoutePaths.Landing} element={<GuestComponent element={<LandingComponent />}/>}/>
              <Route path={RoutePaths.Signin} element={<GuestComponent element={<SigninComponent />} />}/>
              <Route path={RoutePaths.Signup} element={<GuestComponent element={<SignupComponent />}/> }/>
              <Route path={RoutePaths.TermsOfService} element={<GuestComponent element={<TermsOfServiceComponent />}/> }/>
              <Route path={RoutePaths.PrivacyPolicy} element={<GuestComponent element={<PrivacyPolicyComponent />}/> }/>
              <Route path={RoutePaths.Account}>

              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      );
  }
}

export default AppComponent;
