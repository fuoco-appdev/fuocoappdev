import { Button, Checkbox, Line } from '@fuoco.appdev/core-ui';
import { useTranslation } from 'react-i18next';
import { PermissionsResponsiveProps } from '../permissions.component';
import styles from '../permissions.module.scss';
import { ResponsiveTablet } from '../responsive.component';

export default function PermissionsTabletComponent({
  permissionsProps,
  onAccessLocationChecked,
  onContinueAsync,
}: PermissionsResponsiveProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <ResponsiveTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[
            styles['permissions-container'],
            styles['permissions-container-tablet'],
          ].join(' ')}
        >
          <div
            className={[
              styles['permissions-content'],
              styles['permissions-content-tablet'],
            ].join(' ')}
          >
            <div
              className={[
                styles['permissions-title'],
                styles['permissions-title-tablet'],
              ].join(' ')}
            >
              {t('permissions')}
            </div>
            <div
              className={[
                styles['form-container'],
                styles['form-container-tablet'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['permission-checkbox-container'],
                  styles['permission-checkbox-container-tablet'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['permission-checkbox-title-container'],
                    styles['permission-checkbox-title-container-tablet'],
                  ].join(' ')}
                >
                  <Line.LocationOn size={24} />
                  <div
                    className={[
                      styles['permission-checkbox-title'],
                      styles['permission-checkbox-title-tablet'],
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
            <div>
              <Button
                classNames={{
                  container: [
                    styles['submit-button-container'],
                    styles['submit-button-container-tablet'],
                  ].join(' '),
                  button: [
                    styles['submit-button'],
                    styles['submit-button-tablet'],
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
    </ResponsiveTablet>
  );
}
