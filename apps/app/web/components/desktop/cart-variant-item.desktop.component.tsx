/* eslint-disable jsx-a11y/alt-text */
import { InputNumber, Line } from '@fuoco.appdev/web-components';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'shared/i18n';
import { MedusaProductTypeNames } from '../../../shared/types/medusa.type';
import styles from '../../modules/cart-variant-item.module.scss';
import { DIContext } from '../app.component';
import { CartVariantItemResponsiveProps } from '../cart-variant-item.component';
import { ResponsiveDesktop } from '../responsive.component';

function CartVariantItemDesktopComponent({
  productType,
  product,
  variant,
  variantQuantities,
  onQuantitiesChanged,
}: CartVariantItemResponsiveProps): JSX.Element {
  const { t } = useTranslation();
  const { StoreController, MedusaService } = React.useContext(DIContext);
  const { selectedRegion } = StoreController.model;
  return (
    <ResponsiveDesktop>
      <div
        className={[
          styles['variant-container'],
          styles['variant-container-desktop'],
        ].join(' ')}
      >
        <div
          className={[
            styles['variant-content'],
            styles['variant-content-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['variant-details'],
              styles['variant-details-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['variant-thumbnail-container'],
                styles['variant-thumbnail-container-desktop'],
              ].join(' ')}
            >
              {product?.thumbnail &&
                productType === MedusaProductTypeNames.Wine && (
                  <img
                    className={[
                      styles['wine-thumbnail-image'],
                      styles['wine-thumbnail-image-desktop'],
                    ].join(' ')}
                    src={product?.thumbnail}
                  />
                )}
              {product?.thumbnail &&
                productType === MedusaProductTypeNames.MenuItem && (
                  <img
                    className={[
                      styles['menu-item-thumbnail-image'],
                      styles['menu-item-thumbnail-image-desktop'],
                    ].join(' ')}
                    src={product?.thumbnail}
                  />
                )}
              {product?.thumbnail &&
                productType === MedusaProductTypeNames.RequiredFood && (
                  <img
                    className={[
                      styles['required-food-thumbnail-image'],
                      styles['required-food-thumbnail-image-desktop'],
                    ].join(' ')}
                    src={product?.thumbnail}
                  />
                )}
              {!product?.thumbnail &&
                productType === MedusaProductTypeNames.Wine && (
                  <img
                    className={[
                      styles['no-thumbnail-image'],
                      styles['no-thumbnail-image-desktop'],
                    ].join(' ')}
                    src={'../../assets/images/wine-bottle.png'}
                  />
                )}
              {!product?.thumbnail &&
                productType === MedusaProductTypeNames.MenuItem && (
                  <img
                    className={[
                      styles['no-thumbnail-image'],
                      styles['no-thumbnail-image-desktop'],
                    ].join(' ')}
                    src={'../../assets/images/menu.png'}
                  />
                )}
              {!product?.thumbnail &&
                productType === MedusaProductTypeNames.RequiredFood && (
                  <Line.RestaurantMenu
                    className={[
                      styles['no-thumbnail-image'],
                      styles['no-thumbnail-image-desktop'],
                    ].join(' ')}
                  />
                )}
            </div>
            <div
              className={[
                styles['variant-title'],
                styles['variant-title-desktop'],
              ].join(' ')}
            >
              {product?.title}
            </div>
            <div
              className={[
                styles['variant-value'],
                styles['variant-value-desktop'],
              ].join(' ')}
            >
              {variant.title}
            </div>
            <div
              className={[
                styles['variant-price'],
                styles['variant-price-desktop'],
              ].join(' ')}
            >
              {selectedRegion &&
                MedusaService.formatAmount(
                  variant.calculated_price?.calculated_amount ?? 0,
                  selectedRegion.currency_code,
                  i18n.language
                )}
            </div>
          </div>

          <div
            className={[
              styles['variant-checkbox-container'],
              styles['variant-checkbox-container-desktop'],
            ].join(' ')}
            style={{
              ...(variant.id && variantQuantities[variant.id] > 0
                ? {
                    backgroundColor: '#85267A',
                    borderWidth: 0,
                  }
                : { borderWidth: 1 }),
            }}
          >
            {variant.id && variantQuantities[variant.id] > 0 && (
              <Line.Check size={18} />
            )}
          </div>
        </div>
        <InputNumber
          label={t('quantity') ?? ''}
          classNames={{
            formLayout: { label: styles['input-form-layout-label'] },
            input: styles['input'],
            container: styles['input-container'],
            button: {
              button: [
                styles['input-button'],
                styles['input-button-desktop'],
              ].join(' '),
            },
          }}
          iconColor={'#2A2A5F'}
          value={variant?.id && variantQuantities[variant?.id]?.toString()}
          min={0}
          max={
            !variant.allow_backorder
              ? variant?.inventory_quantity ?? 0
              : undefined
          }
          onChange={onQuantitiesChanged}
        />
      </div>
    </ResponsiveDesktop>
  );
}

export default observer(CartVariantItemDesktopComponent);
