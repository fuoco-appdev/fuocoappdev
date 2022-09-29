import {Auth, Typography, Button, IconChevronLeft} from '@fuoco.appdev/core-ui';
import {useObservable} from '@ngneat/use-observable';
import AuthService from '../services/auth.service';
import styles from './privacy-policy.module.scss';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import PrivacyPolicyController from '../controllers/privacy-policy.controller';
import { useNavigate } from 'react-router-dom';

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

export default function ReactivePrivacyPolicyComponent(): JSX.Element {
    const [props] = useObservable(PrivacyPolicyController.model.store);
    return (
        <div className={styles["root"]}>
            <div className={styles["content"]}>
                <Auth
                    supabaseClient={AuthService.supabaseClient}
                    view={'privacy_policy'}
                    privacyPolicy={
                        <Typography tag="article">
                            <ReactMarkdown remarkPlugins={[gfm]} children={props.markdown} />
                        </Typography>
                    }/>
            </div>
            <div className={styles["backButtonContainer"]}>
                <BackButton />
            </div>
        </div>
    );
}