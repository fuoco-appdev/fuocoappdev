import { Auth, Typography, Button, Line } from '@fuoco.appdev/core-ui';
import { useObservable } from '@ngneat/use-observable';
import styles from '../privacy-policy.module.scss';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import PrivacyPolicyController from '../../controllers/privacy-policy.controller';

export function PrivacyPolicyDesktopComponent(): JSX.Element {
  const [props] = useObservable(PrivacyPolicyController.model.store);

  return (
    <div className={[styles['root'], styles['root-desktop']].join(' ')}>
      <div className={[styles['content'], styles['content-desktop']].join(' ')}>
        <Auth.PrivacyPolicy
          privacyPolicy={
            <Typography
              tag="article"
              className={[
                styles['typography'],
                styles['typography-desktop'],
              ].join(' ')}
            >
              <ReactMarkdown remarkPlugins={[gfm]} children={props.markdown} />
            </Typography>
          }
        />
      </div>
    </div>
  );
}
