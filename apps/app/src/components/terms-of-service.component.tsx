import { Auth, Typography, Button } from '@fuoco.appdev/core-ui';
import { Line } from '@fuoco.appdev/core-ui';
import { useObservable } from '@ngneat/use-observable';
import styles from './terms-of-service.module.scss';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import TermsOfServiceController from '../controllers/terms-of-service.controller';
import { useNavigate } from 'react-router-dom';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';

function BackButton(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className={styles['backButton']}>
      <Button
        icon={<Line.ChevronLeft />}
        type={'text'}
        onClick={() => navigate(-1)}
      />
    </div>
  );
}

function TermsOfServiceDesktopComponent({ children }: any): JSX.Element {
  return (
    <div className={[styles['root'], styles['root-desktop']].join(' ')}>
      <div className={[styles['content'], styles['content-desktop']].join(' ')}>
        {children}
      </div>
      <div className={styles['backButtonContainer']}>
        <BackButton />
      </div>
    </div>
  );
}

function TermsOfServiceMobileComponent({ children }: any): JSX.Element {
  return (
    <div className={[styles['root'], styles['root-mobile']].join(' ')}>
      <div className={[styles['content'], styles['content-mobile']].join(' ')}>
        {children}
      </div>
    </div>
  );
}

export default function TermsOfServiceComponent(): JSX.Element {
  const [props] = useObservable(TermsOfServiceController.model.store);

  const termsOfService = (
    <Auth.TermsOfService
      termsOfService={
        <Typography tag="article">
          <ReactMarkdown remarkPlugins={[gfm]} children={props.markdown} />
        </Typography>
      }
    />
  );
  return (
    <>
      <ResponsiveDesktop>
        <TermsOfServiceDesktopComponent>
          {termsOfService}
        </TermsOfServiceDesktopComponent>
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <TermsOfServiceMobileComponent>
          {termsOfService}
        </TermsOfServiceMobileComponent>
      </ResponsiveMobile>
    </>
  );
}
