import { Auth, Typography } from '@fuoco.appdev/web-components';
import loadable from '@loadable/component';
import { PrivacyPolicyResponsiveProps } from '../privacy-policy.component';
import styles from '../privacy-policy.module.scss';
import { ResponsiveDesktop } from '../responsive.component';
const ReactMarkdown = loadable(
  async () => {
    const reactMarkdown = await import('react-markdown');
    return (props: any) => <reactMarkdown.default {...props} />;
  },
  { ssr: false }
);

export default function PrivacyPolicyDesktopComponent({
  privacyPolicyProps,
  remarkPlugins,
}: PrivacyPolicyResponsiveProps): JSX.Element {
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
                  children={privacyPolicyProps.markdown}
                />
              </Typography>
            }
          />
        </div>
      </div>
    </ResponsiveDesktop>
  );
}
