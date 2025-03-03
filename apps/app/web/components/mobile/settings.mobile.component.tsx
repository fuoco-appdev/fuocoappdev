import { Button, Line, Scroll } from '@fuoco.appdev/web-components';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Ripples from 'react-ripples';
import { Outlet, useNavigate } from 'react-router-dom';
import { RoutePathsType } from '../../../shared/route-paths-type';
import styles from '../../modules/settings.module.scss';
import { useQuery } from '../../route-paths';
import { DIContext } from '../app.component';
import { ResponsiveMobile } from '../responsive.component';
import { SettingsResponsiveProps } from '../settings.component';

function SettingsMobileComponent({}: SettingsResponsiveProps): JSX.Element {
  const navigate = useNavigate();
  const query = useQuery();
  const { t } = useTranslation();
  const { WindowController, AccountController } = React.useContext(DIContext);
  const { activeRoute } = WindowController.model;

  return (
    <ResponsiveMobile>
      <Scroll
        classNames={{
          scrollContent: styles['scroll-content-mobile'],
          children: styles['scroll-children-mobile'],
        }}
        isLoadable={false}
        isReloadable={false}
      >
        {activeRoute === RoutePathsType.Settings ? (
          <div className={[styles['root'], styles['root-mobile']].join(' ')}>
            <Ripples
              className={[
                styles['setting-button-container'],
                styles['setting-button-container-mobile'],
              ].join(' ')}
              color={'rgba(42, 42, 95, .35)'}
              onClick={() =>
                setTimeout(
                  () =>
                    navigate({
                      pathname: RoutePathsType.SettingsAccount,
                      search: query.toString(),
                    }),
                  75
                )
              }
            >
              <div
                className={[
                  styles['setting-button-content'],
                  styles['setting-button-content-mobile'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['setting-icon'],
                    styles['setting-icon-mobile'],
                  ].join(' ')}
                >
                  <Line.Person size={24} />
                </div>
                <div
                  className={[
                    styles['setting-text'],
                    styles['setting-text-mobile'],
                  ].join(' ')}
                >
                  {t('account')}
                </div>
              </div>
            </Ripples>
            <div
              className={[
                styles['bottom-content-container'],
                styles['bottom-content-container-mobile'],
              ].join(' ')}
            >
              <Button
                block={true}
                size={'large'}
                classNames={{
                  container: styles['logout-button-container'],
                  button: styles['logout-button'],
                }}
                rippleProps={{
                  color: 'rgba(233, 33, 66, .35)',
                }}
                touchScreen={true}
                onClick={() => AccountController.logoutAsync()}
              >
                {t('signOut')}
              </Button>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </Scroll>
    </ResponsiveMobile>
  );
}

export default observer(SettingsMobileComponent);
