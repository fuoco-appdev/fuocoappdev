import { Auth, Typography, Button, Line } from '@fuoco.appdev/core-ui';
import { useObservable } from '@ngneat/use-observable';
import styles from './privacy-policy.module.scss';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import PrivacyPolicyController from '../controllers/privacy-policy.controller';
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

function PrivacyPolicyDesktopComponent({ children }: any): JSX.Element {
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

function PrivacyPolicyMobileComponent({ children }: any): JSX.Element {
  return (
    <div className={[styles['root'], styles['root-mobile']].join(' ')}>
      <div className={[styles['content'], styles['content-mobile']].join(' ')}>
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPolicyComponent(): JSX.Element {
  const [props] = useObservable(PrivacyPolicyController.model.store);

  const privacyPolicy = (
    <Auth.PrivacyPolicy
      privacyPolicy={
        <Typography tag="article">
          <ReactMarkdown remarkPlugins={[gfm]} children={props.markdown} />
        </Typography>
      }
    />
  );
  return (
    <>
      <ResponsiveDesktop>
        <PrivacyPolicyDesktopComponent>
          {privacyPolicy}
        </PrivacyPolicyDesktopComponent>
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <PrivacyPolicyMobileComponent>
          {privacyPolicy}
        </PrivacyPolicyMobileComponent>
      </ResponsiveMobile>
    </>
  );
}
