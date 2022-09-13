import React from 'react';
import {Auth, Typography, Button, IconChevronLeft} from '@fuoco.appdev/core-ui';
import AuthService from '../services/auth.service';
import styles from './privacy-policy.module.scss';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { PrivacyPolicyState } from '../models';
import { Subscription } from 'rxjs';
import PrivacyPolicyController from '../controllers/privacy-policy.controller';
import { useNavigate } from 'react-router-dom';

export interface PrivacyPolicyProps {}

function BackButton(): JSX.Element {
    const navigate = useNavigate();
    return (
        <div className={styles["backButton"]} >
            <Button 
                icon={<IconChevronLeft />}
                type={'text'}
                onClick={() => navigate(-1)}/>
        </div>
    );
}

class PrivacyPolicyComponent extends React.Component<PrivacyPolicyProps, PrivacyPolicyState> {
    private _stateSubscription: Subscription | undefined;

    public constructor(props: PrivacyPolicyProps) {
        super(props);
    
        this.state = PrivacyPolicyController.model.store.getValue();
      }
    
    public override componentDidMount(): void {
        this._stateSubscription = PrivacyPolicyController.model.store.asObservable().subscribe({
            next: () => this.setState(PrivacyPolicyController.model.store.getValue())
        });
    }

    public override componentWillUnmount(): void {
        this._stateSubscription?.unsubscribe();
    }

    public override render(): React.ReactNode {
        const {markdown} = this.state;
        return (
            <div className={styles["root"]}>
                <div className={styles["content"]}>
                    <Auth
                        supabaseClient={AuthService.supabaseClient}
                        view={'privacy_policy'}
                        privacyPolicy={
                            <Typography tag="article">
                                <ReactMarkdown remarkPlugins={[gfm]} children={markdown} />
                            </Typography>
                        }/>
                </div>
                <div className={styles["backButtonContainer"]}>
                    <BackButton />
                </div>
            </div>
        );
  }
}

export default function ReactivePrivacyPolicyComponent(): JSX.Element {
    return (<PrivacyPolicyComponent />);
}