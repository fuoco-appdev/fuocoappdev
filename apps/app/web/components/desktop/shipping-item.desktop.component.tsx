/* eslint-disable jsx-a11y/alt-text */
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../modules/shipping-item.module.scss';
import { DIContext } from '../app.component';
import { ResponsiveDesktop } from '../responsive.component';
import { ShippingItemResponsiveProps } from '../shipping-item.component';

function ShippingItemDesktopComponent({
  item,
  hasReducedPrice,
  discountPercentage,
}: ShippingItemResponsiveProps): JSX.Element {
  const { t, i18n } = useTranslation();
  const { StoreController, MedusaService } = React.useContext(DIContext);
  const { selectedRegion } = StoreController.model;

  return (
    <ResponsiveDesktop>
      <div
        className={[styles['container'], styles['container-desktop']].join(' ')}
      >
        <div
          className={[styles['details'], styles['details-desktop']].join(' ')}
        >
          <div
            className={[styles['thumbnail'], styles['thumbnail-desktop']].join(
              ' '
            )}
          >
            {!item?.thumbnail && (
              <img
                className={[
                  styles['no-thumbnail-image'],
                  styles['no-thumbnail-image-desktop'],
                ].join(' ')}
                src={'../assets/images/wine-bottle.png'}
              />
            )}
            {item?.thumbnail && (
              <img
                className={[
                  styles['thumbnail-image'],
                  styles['thumbnail-image-desktop'],
                ].join(' ')}
                src={item?.thumbnail}
              />
            )}
          </div>
          <div
            className={[
              styles['title-container'],
              styles['title-container-desktop'],
            ].join(' ')}
          >
            <div
              className={[styles['title'], styles['title-desktop']].join(' ')}
            >
              {item.title}
            </div>
            <div
              className={[styles['variant'], styles['variant-desktop']].join(
                ' '
              )}
            >
              {item.variant?.title}
            </div>
          </div>
          <div
            className={[
              styles['quantity-details-container'],
              styles['quantity-details-container-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['quantity-container'],
                styles['quantity-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['quantity-text'],
                  styles['quantity-text-desktop'],
                ].join(' ')}
              >
                {t('quantity')}
              </div>
              <div
                className={[
                  styles['quantity-buttons'],
                  styles['quantity-buttons-desktop'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['quantity'],
                    styles['quantity-desktop'],
                  ].join(' ')}
                >
                  {item.quantity}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={[
            styles['pricing-details-container'],
            styles['pricing-details-container-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['pricing'],
              styles['pricing-desktop'],
              hasReducedPrice
                ? [
                    styles['pricing-canceled'],
                    styles['pricing-canceled-desktop'],
                  ].join(' ')
                : '',
            ].join(' ')}
          >
            {hasReducedPrice && `${t('original')}:`} &nbsp;
            {selectedRegion &&
              MedusaService.formatAmount(
                item.subtotal ?? 0,
                selectedRegion.currency_code,
                i18n.language
              )}
          </div>
          {hasReducedPrice && (
            <>
              <div
                className={[
                  styles['discount-pricing'],
                  styles['discount-pricing-desktop'],
                ].join(' ')}
              >
                {selectedRegion &&
                  MedusaService.formatAmount(
                    (item.subtotal ?? 0) - (item.discount_total ?? 0),
                    selectedRegion.currency_code,
                    i18n.language
                  )}
              </div>
              <div
                className={[
                  styles['discount-percentage'],
                  styles['discount-percentage-desktop'],
                ].join(' ')}
              >
                -{discountPercentage}%
              </div>
            </>
          )}
        </div>
      </div>
    </ResponsiveDesktop>
  );
}

export default observer(ShippingItemDesktopComponent);
