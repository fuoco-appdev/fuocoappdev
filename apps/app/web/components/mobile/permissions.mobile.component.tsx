import { Button, Checkbox, Line } from '@fuoco.appdev/web-components';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../modules/permissions.module.scss';
import { DIContext } from '../app.component';
import { PermissionsResponsiveProps } from '../permissions.component';
import { ResponsiveMobile } from '../responsive.component';

export default function PermissionsMobileComponent({
  onAccessLocationChecked,
  onContinueAsync,
}: PermissionsResponsiveProps): JSX.Element {
  const { t } = useTranslation();
  const { PermissionsController } = React.useContext(DIContext);
  const { accessLocation } = PermissionsController.model;

  return (
    <ResponsiveMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[
            styles['permissions-container'],
            styles['permissions-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['permissions-content'],
              styles['permissions-content-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['permissions-title'],
                styles['permissions-title-mobile'],
              ].join(' ')}
            >
              {t('permissions')}
            </div>
            <div
              className={[
                styles['form-container'],
                styles['form-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['permission-checkbox-container'],
                  styles['permission-checkbox-container-mobile'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['permission-checkbox-title-container'],
                    styles['permission-checkbox-title-container-mobile'],
                  ].join(' ')}
                >
                  <Line.LocationOn size={24} />
                  <div
                    className={[
                      styles['permission-checkbox-title'],
                      styles['permission-checkbox-title-mobile'],
                    ].join(' ')}
                  >
                    {t('accessLocation')}
                  </div>
                </div>
                <Checkbox
                  checked={accessLocation}
                  onChange={onAccessLocationChecked}
                  classNames={{
                    checkbox: styles['checkbox'],
                    labelContainerLabel:
                      styles['checkbox-label-container-label'],
                    descriptionLabel: styles['checkbox-description-label'],
                  }}
                  id={'location'}
                  name={'location'}
                  label={t('accessLocationDescription') ?? ''}
                />
              </div>
            </div>
          </div>
          <div>
            <Button
              classNames={{
                container: [
                  styles['submit-button-container'],
                  styles['submit-button-container-mobile'],
                ].join(' '),
                button: [
                  styles['submit-button'],
                  styles['submit-button-mobile'],
                ].join(' '),
              }}
              block={true}
              touchScreen={true}
              size={'large'}
              onClick={onContinueAsync}
            >
              {t('continue')}
            </Button>
          </div>
        </div>
      </div>
    </ResponsiveMobile>
  );
}
