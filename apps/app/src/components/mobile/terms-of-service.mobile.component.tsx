import { Auth, Typography, Button } from '@fuoco.appdev/core-ui';
import { Line } from '@fuoco.appdev/core-ui';
import { useObservable } from '@ngneat/use-observable';
import styles from '../terms-of-service.module.scss';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import TermsOfServiceController from '../../controllers/terms-of-service.controller';
import { useNavigate } from 'react-router-dom';

export function TermsOfServiceMobileComponent({ children }: any): JSX.Element {
  const [props] = useObservable(TermsOfServiceController.model.store);

  return (
    <div className={[styles['root'], styles['root-mobile']].join(' ')}>
      <div className={[styles['content'], styles['content-mobile']].join(' ')}>
        <Auth.TermsOfService
          termsOfService={
            <Typography tag="article" className={styles['typography']}>
              <ReactMarkdown remarkPlugins={[gfm]} children={props.markdown} />
            </Typography>
          }
        />
      </div>
    </div>
  );
}
