import { Auth, Typography } from '@fuoco.appdev/core-ui';
import { useObservable } from '@ngneat/use-observable';
import styles from '../terms-of-service.module.scss';
import TermsOfServiceController from '../../controllers/terms-of-service.controller';
import { TermsOfServiceResponsiveProps } from '../terms-of-service.component';
import loadable from '@loadable/component';
import { useLayoutEffect } from 'react';
const ReactMarkdown = loadable(
  async () => {
    const reactMarkdown = await import('react-markdown');
    return (props: any) => <reactMarkdown.default {...props} />;
  },
  { ssr: false }
);

export function TermsOfServiceDesktopComponent({
  remarkPlugins,
}: TermsOfServiceResponsiveProps): JSX.Element {
  const [props] = useObservable(TermsOfServiceController.model.store);

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
                children={props.markdown}
              />
            </Typography>
          }
        />
      </div>
    </div>
  );
}
