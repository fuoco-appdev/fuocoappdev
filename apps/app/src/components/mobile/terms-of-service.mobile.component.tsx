import { Auth, Typography, Button } from '@fuoco.appdev/core-ui';
import { Line } from '@fuoco.appdev/core-ui';
import { useObservable } from '@ngneat/use-observable';
import styles from '../terms-of-service.module.scss';
import TermsOfServiceController from '../../controllers/terms-of-service.controller';
import { useNavigate } from 'react-router-dom';
import { lazy } from 'react';
import { TermsOfServiceResponsiveProps } from '../terms-of-service.component';
import loadable from '@loadable/component';
const ReactMarkdown = loadable(async () => {
  const reactMarkdown = await import('react-markdown');
  return (props: any) => <reactMarkdown.default {...props} />;
});

export function TermsOfServiceMobileComponent({
  remarkPlugins,
}: TermsOfServiceResponsiveProps): JSX.Element {
  const [props] = useObservable(TermsOfServiceController.model.store);

  return (
    <div className={[styles['root'], styles['root-mobile']].join(' ')}>
      <div className={[styles['content'], styles['content-mobile']].join(' ')}>
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
                children={props.markdown}
              />
            </Typography>
          }
        />
      </div>
    </div>
  );
}
