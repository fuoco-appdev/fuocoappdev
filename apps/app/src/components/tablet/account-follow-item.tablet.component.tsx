import styles from '../account-follow-item.module.scss';
import { Button, Line, Modal } from '@fuoco.appdev/core-ui';
import { AddressItemProps } from '../address-item.component';
import { useTranslation } from 'react-i18next';
import { ResponsiveDesktop, ResponsiveTablet } from '../responsive.component';
import { AccountFollowItemResponsiveProps } from '../account-follow-item.component';

export default function AccountFollowItemTabletComponent({}: AccountFollowItemResponsiveProps): JSX.Element {
  const { t, i18n } = useTranslation();
  return (
    <ResponsiveTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}></div>
    </ResponsiveTablet>
  );
}
