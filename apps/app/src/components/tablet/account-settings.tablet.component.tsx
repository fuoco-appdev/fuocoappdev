import { Line, Tabs } from '@fuoco.appdev/core-ui';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';
import { RoutePathsType, useQuery } from '../../route-paths';
import { AccountSettingsResponsiveProps } from '../account-settings.component';
import styles from '../account-settings.module.scss';
import { ResponsiveTablet } from '../responsive.component';

export default function AccountSettingsTabletComponent({
  windowProps,
}: AccountSettingsResponsiveProps): JSX.Element {
  const navigate = useNavigate();
  const query = useQuery();
  const { t } = useTranslation();

  return (
    <ResponsiveTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[styles['side-bar'], styles['side-bar-tablet']].join(' ')}
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
                id: RoutePathsType.AccountSettingsAccount,
                icon: <Line.Person size={24} />,
                label: t('account') ?? '',
              },
            ]}
          />
        </div>
        <div
          className={[
            styles['outlet-container'],
            styles['outlet-container-tablet'],
          ].join(' ')}
        >
          <Outlet />
        </div>
      </div>
    </ResponsiveTablet>
  );
}
