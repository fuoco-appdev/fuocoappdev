import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import SigninController from '../controllers/signin.controller';
import styles from './Signin.module.scss';
import { SigninProps } from '../models/signin.model';
import { useObservable } from '@ngneat/react-rxjs';

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
  const navigate = useNavigate();
  SigninController.model.location = location;
  SigninController.model.navigate = navigate;
  const [props] = useObservable(SigninController.model.store);
  return (<SigninComponent {...props} />);
}