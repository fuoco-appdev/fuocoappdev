import { Button, Line, Typography } from '@fuoco.appdev/web-components';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import styles from '../../modules/landing.module.scss';
import { LandingResponsiveProps } from '../landing.component';
import { WindowDesktopTopBarRef } from './window.desktop.component';

function LandingDesktopComponent({}: LandingResponsiveProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <div
      className={[styles['root'], styles['root-desktop']].join(' ')}
      onScroll={(e) => {
        if (!WindowDesktopTopBarRef) {
          return;
        }

        if (e.currentTarget.scrollTop > 0) {
          WindowDesktopTopBarRef.current!.style.backgroundColor =
            'rgba(241, 250, 238, .55)';
          WindowDesktopTopBarRef.current!.style.boxShadow =
            '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)';
          WindowDesktopTopBarRef.current!.style.backdropFilter = 'blur(13px)';
        } else {
          WindowDesktopTopBarRef.current!.style.backgroundColor =
            'rgba(241, 250, 238, 0)';
          WindowDesktopTopBarRef.current!.style.boxShadow = 'none';
          WindowDesktopTopBarRef.current!.style.backdropFilter = 'blur(0px)';
        }
      }}
    >
      <div
        className={[
          styles['first-section'],
          styles['first-section-desktop'],
        ].join(' ')}
      >
        <div
          className={[
            styles['first-content'],
            styles['first-content-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['first-content-left'],
              styles['first-content-left-desktop'],
            ].join(' ')}
          >
            <Typography.Title
              className={[
                styles['landing-title-1'],
                styles['landing-title-1-desktop'],
              ].join(' ')}
              level={1}
            >
              {t('landingTitle1')}{' '}
              <Typography.Title
                className={[
                  styles['landing-title-2'],
                  styles['landing-title-2-desktop'],
                ].join(' ')}
                level={1}
              >
                {t('landingTitle2')}
              </Typography.Title>
            </Typography.Title>
            <Typography.Text
              className={[
                styles['landing-description'],
                styles['landing-description-desktop'],
              ].join(' ')}
            >
              {t('landingDescription')}
            </Typography.Text>
            <Button
              rippleProps={{
                color: 'rgba(252, 245, 227, .35)',
              }}
              size={'xlarge'}
              icon={<Line.CalendarToday size={21} />}
            >
              {t('scheduleAMeeting')}
            </Button>
          </div>
          <div
            className={[
              styles['first-content-right'],
              styles['first-content-right-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['landing-image-container'],
                styles['landing-image-container-desktop'],
              ].join(' ')}
            >
              <img
                className={[
                  styles['landing-image'],
                  styles['landing-image-desktop'],
                ].join(' ')}
                src={'../../../assets/images/lucasfuoco.png'}
              />
            </div>
          </div>
        </div>
        <div
          className={[
            styles['first-banner'],
            styles['first-banner-desktop'],
          ].join(' ')}
        >
          <img src={'../../../assets/svg/docker.svg'} height={34} />
          <img src={'../../../assets/svg/supabase.svg'} height={34} />
          <img src={'../../../assets/svg/open-webui.svg'} height={34} />
          <img src={'../../../assets/svg/ollama.svg'} height={34} />
          <img src={'../../../assets/svg/minio.svg'} height={34} />
          <img src={'../../../assets/svg/medusa.svg'} height={34} />
          <img src={'../../../assets/svg/meili-search.svg'} height={34} />
          <img src={'../../../assets/svg/redis.svg'} height={34} />
          <img src={'../../../assets/svg/react.svg'} height={34} />
          <img src={'../../../assets/svg/typescript.svg'} height={34} />
        </div>
      </div>
      <div
        className={[
          styles['about-me-container'],
          styles['about-me-container-desktop'],
        ].join(' ')}
      >
        <Typography.Title
          className={[
            styles['section-title-dark'],
            styles['section-title-dark-desktop'],
          ].join(' ')}
          level={2}
        >
          {t('aboutMe')}
        </Typography.Title>
        <Typography.Text
          className={[
            styles['section-text-dark'],
            styles['section-text-dark-desktop'],
          ].join(' ')}
        >
          {t('aboutMeText')}
        </Typography.Text>
      </div>
      <div
        className={[
          styles['why-work-with-me-container'],
          styles['why-work-with-me-container-desktop'],
        ].join(' ')}
      >
        <Typography.Title
          className={[
            styles['section-title-dark'],
            styles['section-title-dark-desktop'],
          ].join(' ')}
          level={2}
        >
          {t('whyWorkWithMe')}
        </Typography.Title>
        <Typography.Text
          className={[
            styles['section-text-dark'],
            styles['section-text-dark-desktop'],
          ].join(' ')}
        >
          {t('whyWorkWithMeDescription')}
        </Typography.Text>
        <Typography.Title
          className={[
            styles['section-title-dark'],
            styles['section-title-dark-desktop'],
          ].join(' ')}
          level={3}
        >
          {t('expertiseInOpenSource')}
        </Typography.Title>
        <Typography.Text
          className={[
            styles['section-text-dark'],
            styles['section-text-dark-desktop'],
          ].join(' ')}
        >
          {t('expertiseInOpenSourceDescription')}
        </Typography.Text>
        <Typography.Title
          className={[
            styles['section-title-dark'],
            styles['section-title-dark-desktop'],
          ].join(' ')}
          level={3}
        >
          {t('customSolutions')}
        </Typography.Title>
        <Typography.Text
          className={[
            styles['section-text-dark'],
            styles['section-text-dark-desktop'],
          ].join(' ')}
        >
          {t('customSolutionsDescription')}
        </Typography.Text>
        <Typography.Title
          className={[
            styles['section-title-dark'],
            styles['section-title-dark-desktop'],
          ].join(' ')}
          level={3}
        >
          {t('beautifulDesign')}
        </Typography.Title>
        <Typography.Text
          className={[
            styles['section-text-dark'],
            styles['section-text-dark-desktop'],
          ].join(' ')}
        >
          {t('beautifulDesignDescription')}
        </Typography.Text>
        <Typography.Title
          className={[
            styles['section-title-dark'],
            styles['section-title-dark-desktop'],
          ].join(' ')}
          level={3}
        >
          {t('transparency')}
        </Typography.Title>
        <Typography.Text
          className={[
            styles['section-text-dark'],
            styles['section-text-dark-desktop'],
          ].join(' ')}
        >
          {t('transparencyDescription')}
        </Typography.Text>
        <Typography.Title
          className={[
            styles['section-title-dark'],
            styles['section-title-dark-desktop'],
          ].join(' ')}
          level={3}
        >
          {t('collaboration')}
        </Typography.Title>
        <Typography.Text
          className={[
            styles['section-text-dark'],
            styles['section-text-dark-desktop'],
          ].join(' ')}
        >
          {t('collaborationDescription')}
        </Typography.Text>
        <Typography.Title
          className={[
            styles['section-title-dark'],
            styles['section-title-dark-desktop'],
          ].join(' ')}
          level={3}
        >
          {t('innovation')}
        </Typography.Title>
        <Typography.Text
          className={[
            styles['section-text-dark'],
            styles['section-text-dark-desktop'],
          ].join(' ')}
        >
          {t('innovationDescription')}
        </Typography.Text>
      </div>
      <div
        className={[
          styles['how-it-works-container'],
          styles['how-it-works-container-desktop'],
        ].join(' ')}
      >
        <Typography.Title
          className={[
            styles['section-title-dark'],
            styles['section-title-dark-desktop'],
          ].join(' ')}
          level={2}
        >
          {t('howItWorks')}
        </Typography.Title>
        <Typography.Title
          className={[
            styles['section-title-dark'],
            styles['section-title-dark-desktop'],
          ].join(' ')}
          level={3}
        >
          {t('discoveryAndPlanning')}
        </Typography.Title>
        <Typography.Text
          className={[
            styles['section-text-dark'],
            styles['section-text-dark-desktop'],
          ].join(' ')}
        >
          {t('discoveryAndPlanningDescription')}
        </Typography.Text>
        <Typography.Title
          className={[
            styles['section-title-dark'],
            styles['section-title-dark-desktop'],
          ].join(' ')}
          level={3}
        >
          {t('designAndPrototyping')}
        </Typography.Title>
        <Typography.Text
          className={[
            styles['section-text-dark'],
            styles['section-text-dark-desktop'],
          ].join(' ')}
        >
          {t('designAndPrototypingDescription')}
        </Typography.Text>
        <Typography.Title
          className={[
            styles['section-title-dark'],
            styles['section-title-dark-desktop'],
          ].join(' ')}
          level={3}
        >
          {t('development')}
        </Typography.Title>
        <Typography.Text
          className={[
            styles['section-text-dark'],
            styles['section-text-dark-desktop'],
          ].join(' ')}
        >
          {t('developmentDescription')}
        </Typography.Text>
        <Typography.Title
          className={[
            styles['section-title-dark'],
            styles['section-title-dark-desktop'],
          ].join(' ')}
          level={3}
        >
          {t('testingAndQualityAssurance')}
        </Typography.Title>
        <Typography.Text
          className={[
            styles['section-text-dark'],
            styles['section-text-dark-desktop'],
          ].join(' ')}
        >
          {t('testingAndQualityAssuranceDescription')}
        </Typography.Text>
        <Typography.Title
          className={[
            styles['section-title-dark'],
            styles['section-title-dark-desktop'],
          ].join(' ')}
          level={3}
        >
          {t('launchAndSupport')}
        </Typography.Title>
        <Typography.Text
          className={[
            styles['section-text-dark'],
            styles['section-text-dark-desktop'],
          ].join(' ')}
        >
          {t('launchAndSupportDescription')}
        </Typography.Text>
      </div>
    </div>
  );
}

export default observer(LandingDesktopComponent);
