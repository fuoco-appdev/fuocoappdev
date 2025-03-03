import { Auth, Typography } from '@fuoco.appdev/web-components';
import loadable from '@loadable/component';
import { observer } from 'mobx-react-lite';
import React from 'react';
import styles from '../../modules/terms-of-service.module.scss';
import { DIContext } from '../app.component';
import { ResponsiveMobile } from '../responsive.component';
import { TermsOfServiceResponsiveProps } from '../terms-of-service.component';
const ReactMarkdown = loadable(
  async () => {
    const reactMarkdown = await import('react-markdown');
    return (props: any) => <reactMarkdown.default {...props} />;
  },
  { ssr: false }
);

function TermsOfServiceMobileComponent({
  remarkPlugins,
}: TermsOfServiceResponsiveProps): JSX.Element {
  const { TermsOfServiceController } = React.useContext(DIContext);
  const { markdown } = TermsOfServiceController.model;

  return (
    <ResponsiveMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[styles['content'], styles['content-mobile']].join(' ')}
        >
          <Auth.TermsOfService
            termsOfService={
              <Typography
                tag="article"
                className={[
                  styles['typography'],
                  styles['typography-mobile'],
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
    </ResponsiveMobile>
  );
}

export default observer(TermsOfServiceMobileComponent);
