import { LineItem, ProductOptionValue } from '@medusajs/medusa';
import styles from '../cart-variant-item.module.scss';
import { useEffect, useState } from 'react';
import { ProductOptions } from '../../models/product.model';
import { useTranslation } from 'react-i18next';
import { Button, InputNumber, Line, Modal } from '@fuoco.appdev/core-ui';
import CartController from '../../controllers/cart.controller';
// @ts-ignore
import { formatAmount } from 'medusa-react';
import StoreController from '../../controllers/store.controller';
import { useObservable } from '@ngneat/use-observable';
import { CartItemResponsiveProps } from '../cart-item.component';
import { RoutePathsType } from '../../route-paths';
import { useNavigate } from 'react-router-dom';
import { ResponsiveDesktop } from '../responsive.component';
import { CartVariantItemResponsiveProps } from '../cart-variant-item.component';
import { MedusaProductTypeNames } from 'src/types/medusa.type';

export default function CartVariantItemDesktopComponent({
  productType,
  product,
  variant,
  storeProps,
  variantQuantities,
  setVariantQuantities,
  onQuantitiesChanged,
}: CartVariantItemResponsiveProps): JSX.Element {
  const { t, i18n } = useTranslation();

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
                  <Line.RestaurantMenu
                    className={[
                      styles['required-food-thumbnail-image'],
                      styles['required-food-thumbnail-image-desktop'],
                    ].join(' ')}
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
              {storeProps.selectedRegion &&
                formatAmount({
                  amount: variant.calculated_price ?? 0,
                  region: storeProps.selectedRegion,
                  includeTaxes: false,
                })}
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
