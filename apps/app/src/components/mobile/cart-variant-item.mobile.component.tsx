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
import { ResponsiveMobile } from '../responsive.component';
import { CartVariantItemResponsiveProps } from '../cart-variant-item.component';

export default function CartItemMobileComponent({
  variant,
  storeProps,
  variantQuantities,
  setVariantQuantities,
}: CartVariantItemResponsiveProps): JSX.Element {
  const { t, i18n } = useTranslation();

  return (
    <ResponsiveMobile>
      <div
        className={[
          styles['variant-container'],
          styles['variant-container-mobile'],
        ].join(' ')}
      >
        <div
          className={[
            styles['variant-content'],
            styles['variant-content-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['variant-details'],
              styles['variant-details-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['variant-thumbnail-container'],
                styles['variant-thumbnail-container-mobile'],
              ].join(' ')}
            >
              <img
                className={[
                  styles['variant-thumbnail'],
                  styles['variant-thumbnail-mobile'],
                ].join(' ')}
                src={
                  storeProps.selectedPreview?.thumbnail ??
                  '../../assets/svg/wine-bottle.svg'
                }
              />
            </div>
            <div
              className={[
                styles['variant-title'],
                styles['variant-title-mobile'],
              ].join(' ')}
            >
              {storeProps.selectedPreview?.title}
            </div>
            <div
              className={[
                styles['variant-value'],
                styles['variant-value-mobile'],
              ].join(' ')}
            >
              {variant.title}
            </div>
            <div
              className={[
                styles['variant-price'],
                styles['variant-price-mobile'],
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
              styles['variant-checkbox-container-mobile'],
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
          touchScreen={true}
          label={t('quantity') ?? ''}
          classNames={{
            formLayout: { label: styles['input-form-layout-label'] },
            input: styles['input'],
            container: styles['input-container'],
            button: {
              button: [
                styles['input-button'],
                styles['input-button-mobile'],
              ].join(' '),
            },
          }}
          iconColor={'#2A2A5F'}
          value={variant?.id && variantQuantities[variant?.id]?.toString()}
          min={0}
          max={variant?.inventory_quantity ?? 0}
          onChange={(e) => {
            const quantities = { ...variantQuantities };
            if (variant?.id) {
              quantities[variant?.id] = Number(e.currentTarget.value);
            }
            setVariantQuantities(quantities);
          }}
        />
      </div>
    </ResponsiveMobile>
  );
}
