import { Auth, Typography, Button, Line } from '@fuoco.appdev/core-ui';
import { useObservable } from '@ngneat/use-observable';
import styles from '../privacy-policy.module.scss';
import PrivacyPolicyController from '../../controllers/privacy-policy.controller';
import { lazy } from 'react';
import { PrivacyPolicyResponsiveProps } from '../privacy-policy.component';
import loadable from '@loadable/component';
import { ResponsiveTablet } from '../responsive.component';
const ReactMarkdown = loadable(
  async () => {
    const reactMarkdown = await import('react-markdown');
    return (props: any) => <reactMarkdown.default {...props} />;
  },
  { ssr: false }
);

export default function PrivacyPolicyTabletComponent({
  privacyPolicyProps,
  remarkPlugins,
}: PrivacyPolicyResponsiveProps): JSX.Element {
  return (
    <ResponsiveTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[styles['content'], styles['content-tablet']].join(' ')}
        >
          <Auth.PrivacyPolicy
            privacyPolicy={
              <Typography
                tag="article"
                className={[
                  styles['typography'],
                  styles['typography-tablet'],
                ].join(' ')}
              >
                <ReactMarkdown
                  remarkPlugins={remarkPlugins}
                  children={privacyPolicyProps.markdown}
                />
              </Typography>
            }
          />
        </div>
      </div>
    </ResponsiveTablet>
  );
}
