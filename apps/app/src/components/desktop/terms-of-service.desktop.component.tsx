import { Auth, Typography } from '@fuoco.appdev/core-ui';
import { useObservable } from '@ngneat/use-observable';
import styles from '../terms-of-service.module.scss';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import TermsOfServiceController from '../../controllers/terms-of-service.controller';

export function TermsOfServiceDesktopComponent(): JSX.Element {
  const [props] = useObservable(TermsOfServiceController.model.store);

  return (
    <div className={[styles['root'], styles['root-desktop']].join(' ')}>
      <div className={[styles['content'], styles['content-desktop']].join(' ')}>
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
