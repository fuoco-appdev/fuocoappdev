import { Auth, Typography } from '@fuoco.appdev/web-components';
import loadable from '@loadable/component';
import React from 'react';
import styles from '../../modules/terms-of-service.module.scss';
import { DIContext } from '../app.component';
import { ResponsiveDesktop } from '../responsive.component';
import { TermsOfServiceResponsiveProps } from '../terms-of-service.component';

const ReactMarkdown = loadable(
  async () => {
    const reactMarkdown = await import('react-markdown');
    return (props: any) => <reactMarkdown.default {...props} />;
  },
  { ssr: false }
);

export default function TermsOfServiceDesktopComponent({
  remarkPlugins,
}: TermsOfServiceResponsiveProps): JSX.Element {
  const { TermsOfServiceController } = React.useContext(DIContext);
  const { markdown } = TermsOfServiceController.model;

  return (
    <ResponsiveDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[styles['content'], styles['content-desktop']].join(' ')}
        >
          <Auth.TermsOfService
            termsOfService={
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
