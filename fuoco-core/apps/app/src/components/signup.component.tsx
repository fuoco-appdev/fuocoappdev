import React from 'react';
import { useLocation } from "react-router-dom";
import SignupController from '../controllers/signup.controller';
import styles from './signup.module.scss';
import { SignupState } from '../models/signup.model';
import { Subscription } from 'rxjs';

export interface SignupProps {}

class SignupComponent extends React.Component<SignupProps, SignupState> {
  private _stateSubscription: Subscription | undefined;
  
  public constructor(props: SignupProps) {
    super(props);

    this.state = SignupController.model.store.getValue();
  }

  public override componentDidMount(): void {
    this._stateSubscription = SignupController.model.store.asObservable().subscribe({
      next: () => this.setState(SignupController.model.store.getValue())
    });
  }

  public override componentWillUnmount(): void {
      this._stateSubscription?.unsubscribe();
  }

  public static getDerivedStateFromProps(props: SignupProps, state: SignupState) {
    if (props !== state) {
      return props;
    }

    return null;
  }

  public override render(): React.ReactNode {
      return (
        <div className={styles["root"]}>
          
        </div>
      );
  }
}

export default function ReactiveSignupComponent(): JSX.Element {
    const location = useLocation();
    const props = SignupController.model.store.getValue();

    SignupController.model.location = location;
    return (<SignupComponent {...props} />);
}