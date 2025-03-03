import { Auth, Typography } from '@fuoco.appdev/web-components';
import loadable from '@loadable/component';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../modules/help.module.scss';
import { DIContext } from '../app.component';
import { HelpResponsiveProps } from '../help.component';
import { ResponsiveMobile } from '../responsive.component';

const ReactMarkdown = loadable(
  async () => {
    const reactMarkdown = await import('react-markdown');
    return (props: any) => <reactMarkdown.default {...props} />;
  },
  { ssr: false }
);

function HelpMobileComponent({
  remarkPlugins,
}: HelpResponsiveProps): JSX.Element {
  const { t } = useTranslation();
  const { HelpController } = React.useContext(DIContext);
  const { markdown } = HelpController.model;

  return (
    <ResponsiveMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[styles['content'], styles['content-mobile']].join(' ')}
        >
          <Auth.PrivacyPolicy
            privacyPolicy={
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

export default observer(HelpMobileComponent);
