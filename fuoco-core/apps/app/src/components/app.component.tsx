import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import WorldController from '../controllers/world.controller';
import WindowController from '../controllers/window.controller';
import WindowComponent from './window.component';
import LandingComponent from './landing.component';
import { RoutePaths } from '../route-paths';
import SigninComponent from './signin.component';

export class AppComponent extends React.Component {
  public override componentWillUnmount(): void {
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
            </Route>
          </Routes>
        </BrowserRouter>
      );
  }
}

export default AppComponent;
