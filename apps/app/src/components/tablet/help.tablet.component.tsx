import { Auth, Button, Typography } from '@fuoco.appdev/core-ui';
import loadable from '@loadable/component';
import { useTranslation } from 'react-i18next';
import ConfigService from '../../services/config.service';
import { DiscordIcon, HelpResponsiveProps } from '../help.component';
import styles from '../help.module.scss';
import { ResponsiveTablet } from '../responsive.component';

const ReactMarkdown = loadable(
  async () => {
    const reactMarkdown = await import('react-markdown');
    return (props: any) => <reactMarkdown.default {...props} />;
  },
  { ssr: false }
);

export default function HelpTabletComponent({
  helpProps,
  remarkPlugins,
}: HelpResponsiveProps): JSX.Element {
  const { t } = useTranslation();

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
                  children={helpProps.markdown}
                />
              </Typography>
            }
          />
          <div
            className={[
              styles['button-container'],
              styles['button-container-tablet'],
            ].join(' ')}
          >
            <Button
              touchScreen={true}
              classNames={{
                button: styles['outline-button'],
              }}
              rippleProps={{
                color: 'rgba(133, 38, 122, .35)',
              }}
              size={'large'}
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
    </ResponsiveTablet>
  );
}
