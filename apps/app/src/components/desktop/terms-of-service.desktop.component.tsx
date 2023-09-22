import { Auth, Typography } from '@fuoco.appdev/core-ui';
import { useObservable } from '@ngneat/use-observable';
import styles from '../terms-of-service.module.scss';
import TermsOfServiceController from '../../controllers/terms-of-service.controller';
import { lazy } from 'react';
import { TermsOfServiceResponsiveProps } from '../terms-of-service.component';
const ReactMarkdown = lazy(() => import('react-markdown'));

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
