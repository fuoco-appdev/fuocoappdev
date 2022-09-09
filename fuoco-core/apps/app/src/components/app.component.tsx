import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import WorldController from '../controllers/world.controller';
import WindowComponent from './window.component';
import LandingComponent from './landing.component';
import { RoutePaths } from '../route-paths';

export class AppComponent extends React.Component {
  public override componentWillUnmount(): void {
      WorldController.dispose();
  }

  public override render(): React.ReactNode {
      return (
        <BrowserRouter>
          <Routes>
            <Route path={RoutePaths.Default} element={<WindowComponent />}>
              <Route index element={<LandingComponent />} />
              <Route path={RoutePaths.Landing} element={<LandingComponent />}/>
            </Route>
          </Routes>
        </BrowserRouter>
      );
  }
}

export default AppComponent;
