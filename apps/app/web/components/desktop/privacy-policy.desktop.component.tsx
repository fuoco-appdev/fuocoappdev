import { Auth, Typography } from '@fuoco.appdev/web-components';
import loadable from '@loadable/component';
import { observer } from 'mobx-react-lite';
import React from 'react';
import styles from '../../modules/privacy-policy.module.scss';
import { DIContext } from '../app.component';
import { PrivacyPolicyResponsiveProps } from '../privacy-policy.component';
import { ResponsiveDesktop } from '../responsive.component';
const ReactMarkdown = loadable(
  async () => {
    const reactMarkdown = await import('react-markdown');
    return (props: any) => <reactMarkdown.default {...props} />;
  },
  { ssr: false }
);

function PrivacyPolicyDesktopComponent({
  remarkPlugins,
}: PrivacyPolicyResponsiveProps): JSX.Element {
  const { PrivacyPolicyController } = React.useContext(DIContext);
  const { markdown } = PrivacyPolicyController.model;
  return (
    <ResponsiveDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[styles['content'], styles['content-desktop']].join(' ')}
        >
          <Auth.PrivacyPolicy
            privacyPolicy={
              <Typography
                tag="article"
                className={[
                  styles['typography'],
                  styles['typography-desktop'],
                ].join(' ')}
              >
                <ReactMarkdown
                  remarkPlugins={remarkPlugins}
                  children={markdown}
                />
              </Typography>
            }
          />
        </div>
      </div>
    </ResponsiveDesktop>
  );
}

export default observer(PrivacyPolicyDesktopComponent);
