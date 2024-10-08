import { Line, Scroll, Tabs } from '@fuoco.appdev/web-components';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';
import { RoutePathsType } from '../../../shared/route-paths-type';
import styles from '../../modules/settings.module.scss';
import { useQuery } from '../../route-paths';
import { ResponsiveDesktop } from '../responsive.component';
import { SettingsResponsiveProps } from '../settings.component';

export default function SettingsDesktopComponent({
  windowProps,
}: SettingsResponsiveProps): JSX.Element {
  const navigate = useNavigate();
  const query = useQuery();
  const { t } = useTranslation();

  return (
    <ResponsiveDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[styles['side-bar'], styles['side-bar-desktop']].join(' ')}
        >
          <Tabs
            activeId={windowProps.activeRoute}
            direction={'vertical'}
            type={'nav'}
            onChange={(id) =>
              navigate({ pathname: id, search: query.toString() })
            }
            classNames={{
              tabOutline: [styles['tab-outline']].join(' '),
              tabSlider: styles['tab-slider'],
              tabIcon: styles['tab-icon'],
              tabButton: styles['tab-button'],
              hoveredTabIcon: styles['hovered-tab-icon'],
              hoveredTabButton: styles['hovered-tab-button'],
            }}
            tabs={[
              {
                id: RoutePathsType.SettingsAccount,
                icon: <Line.Person size={24} />,
                label: t('account') ?? '',
              },
            ]}
          />
        </div>
        <Scroll isLoadable={false} isReloadable={false}>
          <div
            className={[
              styles['outlet-container'],
              styles['outlet-container-desktop'],
            ].join(' ')}
          >
            <Outlet />
          </div>
        </Scroll>
      </div>
    </ResponsiveDesktop>
  );
}
