import { Auth, Typography } from '@fuoco.appdev/web-components';
import loadable from '@loadable/component';
import { ResponsiveMobile } from '../responsive.component';
import { TermsOfServiceResponsiveProps } from '../terms-of-service.component';
import styles from '../terms-of-service.module.scss';
const ReactMarkdown = loadable(
  async () => {
    const reactMarkdown = await import('react-markdown');
    return (props: any) => <reactMarkdown.default {...props} />;
  },
  { ssr: false }
);

export default function TermsOfServiceMobileComponent({
  termsOfServiceProps,
  remarkPlugins,
}: TermsOfServiceResponsiveProps): JSX.Element {
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
                  children={termsOfServiceProps.markdown}
                />
              </Typography>
            }
          />
        </div>
      </div>
    </ResponsiveMobile>
  );
}
