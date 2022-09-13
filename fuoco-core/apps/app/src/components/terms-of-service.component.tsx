import React from 'react';
import {Auth, Typography, Button, IconChevronLeft} from '@fuoco.appdev/core-ui';
import AuthService from '../services/auth.service';
import styles from './terms-of-service.module.scss';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { TermsOfServiceState } from '../models';
import { Subscription } from 'rxjs';
import TermsOfServiceController from '../controllers/terms-of-service.controller';
import { useNavigate } from 'react-router-dom';

export interface TermsOfServiceProps {}

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

export class TermsOfServiceComponent extends React.Component<TermsOfServiceProps, TermsOfServiceState> {
    private _stateSubscription: Subscription | undefined;

    public constructor(props: TermsOfServiceProps) {
        super(props);
    
        this.state = TermsOfServiceController.model.store.getValue();
      }
    
    public override componentDidMount(): void {
        this._stateSubscription = TermsOfServiceController.model.store.asObservable().subscribe({
            next: () => this.setState(TermsOfServiceController.model.store.getValue())
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
                        view={'terms_of_service'}
                        termsOfService={
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
