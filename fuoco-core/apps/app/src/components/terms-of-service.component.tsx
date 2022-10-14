import {Auth, Typography, Button, IconChevronLeft} from '@fuoco.appdev/core-ui';
import { useObservable } from '@ngneat/use-observable';
import styles from './terms-of-service.module.scss';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import TermsOfServiceController from '../controllers/terms-of-service.controller';
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

export default function ReactiveTermsOfServiceComponent(): JSX.Element {
    const [props] = useObservable(TermsOfServiceController.model.store);
    return (
        <div className={styles["root"]}>
            <div className={styles["content"]}>
                <Auth.TermsOfService
                    termsOfService={
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