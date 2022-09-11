import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import WorldController from '../controllers/world.controller';
import WindowController from '../controllers/window.controller';
import SigninController from '../controllers/signin.controller';
import SignupController from '../controllers/signup.controller';
import WindowComponent from './window.component';
import LandingComponent from './landing.component';
import SigninComponent from './signin.component';
import SignupComponent from './signup.component';
import { RoutePaths } from '../route-paths';

export class AppComponent extends React.Component {
  public override componentWillUnmount(): void {
      SigninController.dispose();
      SignupController.dispose();
      WorldController.dispose();
      WindowController.dispose();

  }

  public override render(): React.ReactNode {
      return (
        <BrowserRouter>
          <Routes>
            <Route path={RoutePaths.Default} element={<WindowComponent />}>
              <Route index element={<LandingComponent />} />
              <Route path={RoutePaths.Landing} element={<LandingComponent />}/>
              <Route path={RoutePaths.Signin} element={<SigninComponent />}/>
              <Route path={RoutePaths.Signup} element={<SignupComponent />}/>
            </Route>
          </Routes>
        </BrowserRouter>
      );
  }
}

export default AppComponent;
