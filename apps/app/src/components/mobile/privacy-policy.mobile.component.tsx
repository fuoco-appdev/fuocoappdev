import { Auth, Typography, Button, Line } from '@fuoco.appdev/core-ui';
import { useObservable } from '@ngneat/use-observable';
import styles from '../privacy-policy.module.scss';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import PrivacyPolicyController from '../../controllers/privacy-policy.controller';

export function PrivacyPolicyMobileComponent(): JSX.Element {
  const [props] = useObservable(PrivacyPolicyController.model.store);

  return (
    <div className={[styles['root'], styles['root-mobile']].join(' ')}>
      <div className={[styles['content'], styles['content-mobile']].join(' ')}>
        <Auth.PrivacyPolicy
          privacyPolicy={
            <Typography tag="article" className={styles['typography']}>
              <ReactMarkdown remarkPlugins={[gfm]} children={props.markdown} />
            </Typography>
          }
        />
      </div>
    </div>
  );
}
