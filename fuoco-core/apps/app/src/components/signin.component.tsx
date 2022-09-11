import React from 'react';
import { useLocation } from "react-router-dom";
import SigninController from '../controllers/signin.controller';
import styles from './Signin.module.scss';
import { SigninProps } from '../models/signin.model';
import { useObservable } from 'rxjs-hooks';

class SigninComponent extends React.Component<SigninProps> {
  public constructor(props: SigninProps) {
    super(props);
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
  const props = SigninController.model.store.getValue();
  
  SigninController.model.location = location;
  return (<SigninComponent {...props} />);
}