import { Auth, Typography } from '@fuoco.appdev/core-ui';
import styles from '../terms-of-service.module.scss';
import { TermsOfServiceResponsiveProps } from '../terms-of-service.component';
import loadable, { LoadableComponent } from '@loadable/component';
import { ResponsiveDesktop, ResponsiveTablet } from '../responsive.component';
const ReactMarkdown = loadable(
  async () => {
    const reactMarkdown = await import('react-markdown');
    return (props: any) => <reactMarkdown.default {...props} />;
  },
  { ssr: false }
);
export default function TermsOfServiceTabletComponent({
  termsOfServiceProps,
  remarkPlugins,
}: TermsOfServiceResponsiveProps): JSX.Element {
  return (
    <ResponsiveTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[styles['content'], styles['content-tablet']].join(' ')}
        >
          <Auth.TermsOfService
            termsOfService={
              <Typography
                tag="article"
                className={[
                  styles['typography'],
                  styles['typography-tablet'],
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
    </ResponsiveTablet>
  );
}
