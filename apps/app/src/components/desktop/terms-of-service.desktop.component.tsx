import { Auth, Typography } from '@fuoco.appdev/core-ui';
import styles from '../terms-of-service.module.scss';
import { TermsOfServiceResponsiveProps } from '../terms-of-service.component';
import loadable, { LoadableComponent } from '@loadable/component';
const ReactMarkdown = loadable(
  async () => {
    const reactMarkdown = await import('react-markdown');
    return (props: any) => <reactMarkdown.default {...props} />;
  },
  { ssr: false }
);
export default function TermsOfServiceDesktopComponent({
  termsOfServiceProps,
  remarkPlugins,
}: TermsOfServiceResponsiveProps): JSX.Element {
  return (
    <div className={[styles['root'], styles['root-desktop']].join(' ')}>
      <div className={[styles['content'], styles['content-desktop']].join(' ')}>
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
                children={termsOfServiceProps.markdown}
              />
            </Typography>
          }
        />
      </div>
    </div>
  );
}
