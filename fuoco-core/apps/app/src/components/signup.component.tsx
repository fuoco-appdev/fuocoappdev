import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import SignupController from '../controllers/signup.controller';
import styles from './signup.module.scss';
import { SignupProps } from '../models/signup.model';
import { useObservable } from 'rxjs-hooks';

type SignupState = SignupProps;

class SignupComponent extends React.Component<SignupProps, SignupState> {
  public constructor(props: SignupProps) {
    super(props);

    this.state = {...props};
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