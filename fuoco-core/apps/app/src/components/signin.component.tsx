import React from 'react';
import { useLocation } from "react-router-dom";
import SigninController from '../controllers/signin.controller';
import styles from './Signin.module.scss';
import { SigninState } from '../models/signin.model';
import { Subscription } from 'rxjs';

export interface SigninProps {}

class SigninComponent extends React.Component<SigninProps, SigninState> {
  private _stateSubscription: Subscription | undefined;
  
  public constructor(props: SigninProps) {
    super(props);

    this.state = SigninController.model.store.getValue();
  }

  public override componentDidMount(): void {
    this._stateSubscription = SigninController.model.store.asObservable().subscribe({
      next: () => this.setState(SigninController.model.store.getValue())
    });
}

public override componentWillUnmount(): void {
    this._stateSubscription?.unsubscribe();
}

  public override render(): React.ReactNode {
      return (
        <div className={styles["root"]}>
          
        </div>
      );
  }
}

export default function ReactiveSigninComponent(): JSX.Element {
  const location = useLocation();
  SigninController.model.location = location;
  
  return (<SigninComponent />);
}