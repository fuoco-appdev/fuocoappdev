import { Button, Checkbox, Line } from '@fuoco.appdev/web-components';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../modules/permissions.module.scss';
import { DIContext } from '../app.component';
import { PermissionsResponsiveProps } from '../permissions.component';
import { ResponsiveDesktop } from '../responsive.component';

function PermissionsDesktopComponent({
  onAccessLocationChecked,
  onContinueAsync,
}: PermissionsResponsiveProps): JSX.Element {
  const { t } = useTranslation();
  const { PermissionsController } = React.useContext(DIContext);
  const { accessLocation } = PermissionsController.model;

  return (
    <ResponsiveDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[
            styles['permissions-container'],
            styles['permissions-container-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['permissions-content'],
              styles['permissions-content-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['permissions-title'],
                styles['permissions-title-desktop'],
              ].join(' ')}
            >
              {t('permissions')}
            </div>
            <div
              className={[
                styles['form-container'],
                styles['form-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['permission-checkbox-container'],
                  styles['permission-checkbox-container-desktop'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['permission-checkbox-title-container'],
                    styles['permission-checkbox-title-container-desktop'],
                  ].join(' ')}
                >
                  <Line.LocationOn size={24} />
                  <div
                    className={[
                      styles['permission-checkbox-title'],
                      styles['permission-checkbox-title-desktop'],
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
            <div>
              <Button
                classNames={{
                  container: [
                    styles['submit-button-container'],
                    styles['submit-button-container-desktop'],
                  ].join(' '),
                  button: [
                    styles['submit-button'],
                    styles['submit-button-desktop'],
                  ].join(' '),
                }}
                block={true}
                size={'large'}
                onClick={onContinueAsync}
              >
                {t('continue')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveDesktop>
  );
}

export default observer(PermissionsDesktopComponent);
