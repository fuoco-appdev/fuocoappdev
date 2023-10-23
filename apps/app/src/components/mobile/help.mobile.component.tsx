import { Auth, Typography, Button, Line } from '@fuoco.appdev/core-ui';
import { useObservable } from '@ngneat/use-observable';
import styles from '../help.module.scss';
import { lazy } from 'react';
import { DiscordIcon, HelpResponsiveProps } from '../help.component';
import loadable from '@loadable/component';
import { ResponsiveMobile } from '../responsive.component';
import ConfigService from '../../services/config.service';
import { useTranslation } from 'react-i18next';

const ReactMarkdown = loadable(
  async () => {
    const reactMarkdown = await import('react-markdown');
    return (props: any) => <reactMarkdown.default {...props} />;
  },
  { ssr: false }
);

export default function HelpMobileComponent({
  helpProps,
  remarkPlugins,
}: HelpResponsiveProps): JSX.Element {
  const { t, i18n } = useTranslation();

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
                  children={helpProps.markdown}
                />
              </Typography>
            }
          />
          <div
            className={[
              styles['button-container'],
              styles['button-container-mobile'],
            ].join(' ')}
          >
            <Button
              block={true}
              classNames={{
                button: styles['outline-button'],
              }}
              rippleProps={{
                color: 'rgba(133, 38, 122, .35)',
              }}
              size={'large'}
              touchScreen={true}
              icon={<DiscordIcon />}
              onClick={() =>
                setTimeout(
                  () => window.location.replace(ConfigService.discord.url),
                  250
                )
              }
            >
              {t('joinUsOnDiscord')}
            </Button>
          </div>
        </div>
      </div>
    </ResponsiveMobile>
  );
}
