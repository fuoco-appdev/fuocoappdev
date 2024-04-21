import { Button, Checkbox, Line } from '@fuoco.appdev/core-ui';
import { useTranslation } from 'react-i18next';
import { PermissionsResponsiveProps } from '../permissions.component';
import styles from '../permissions.module.scss';
import { ResponsiveMobile } from '../responsive.component';

export default function PermissionsMobileComponent({
  permissionsProps,
  onAccessLocationChecked,
  onContinueAsync,
}: PermissionsResponsiveProps): JSX.Element {
  const { t } = useTranslation();

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
                  checked={permissionsProps.accessLocation}
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
