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
import { TermsOfServiceComponent } from './terms-of-service.component';
import AppController from '../controllers/app.controller';
import { RoutePaths } from '../route-paths';
import { AppState } from '../models';
import { Subscription } from 'rxjs';

export interface AppProps {}

export class AppComponent extends React.Component<AppProps, AppState> {
  private _stateSubscription: Subscription | undefined;
  
  constructor(props: AppProps) {
    super(props);

    this.state = AppController.model.store.getValue();
  }

  public override componentWillUnmount(): void {
      SigninController.dispose();
      SignupController.dispose();
      WorldController.dispose();
      WindowController.dispose();
      AppController.dispose();
      this._stateSubscription?.unsubscribe();
  }

  public override componentDidMount(): void {
    this._stateSubscription = AppController.model.store.asObservable().subscribe({
      next: () => this.setState(AppController.model.store.getValue())
    });
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
              <Route path={RoutePaths.TermsOfService} element={<TermsOfServiceComponent />}/>
            </Route>
          </Routes>
        </BrowserRouter>
      );
  }
}

export default AppComponent;
