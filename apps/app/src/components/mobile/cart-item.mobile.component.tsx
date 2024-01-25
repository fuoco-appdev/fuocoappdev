import { LineItem, ProductOptionValue } from '@medusajs/medusa';
import styles from '../cart-item.module.scss';
import { useEffect, useState } from 'react';
import { ProductOptions } from '../../models/product.model';
import { useTranslation } from 'react-i18next';
import { Button, Line, Modal } from '@fuoco.appdev/core-ui';
import CartController from '../../controllers/cart.controller';
// @ts-ignore
import { formatAmount } from 'medusa-react';
import StoreController from '../../controllers/store.controller';
import { useObservable } from '@ngneat/use-observable';
import { CartItemResponsiveProps } from '../cart-item.component';
import { RoutePathsType, useQuery } from '../../route-paths';
import { useNavigate } from 'react-router-dom';
import { ResponsiveMobile } from '../responsive.component';
import { MedusaProductTypeNames } from '../../types/medusa.type';

export default function CartItemMobileComponent({
  storeProps,
  item,
  productType,
  quantity,
  onRemove,
  vintage,
  type,
  hasReducedPrice,
  deleteModalVisible,
  discountPercentage,
  setDeleteModalVisible,
  incrementItemQuantity,
  decrementItemQuantity,
}: CartItemResponsiveProps): JSX.Element {
  const navigate = useNavigate();
  const query = useQuery();
  const { t } = useTranslation();

  return (
    <ResponsiveMobile>
      <div
        key={item.variant_id}
        className={[styles['container'], styles['container-mobile']].join(' ')}
      >
        <div
          className={[styles['details'], styles['details-mobile']].join(' ')}
        >
          <div
            className={[styles['thumbnail'], styles['thumbnail-mobile']].join(
              ' '
            )}
          >
            {!item?.thumbnail &&
              productType === MedusaProductTypeNames.Wine && (
                <img
                  className={[
                    styles['thumbnail-image'],
                    styles['thumbnail-image-mobile'],
                  ].join(' ')}
                  src={'../../assets/images/wine-bottle.png'}
                />
              )}
            {!item?.thumbnail &&
              productType === MedusaProductTypeNames.MenuItem && (
                <img
                  className={[
                    styles['thumbnail-image'],
                    styles['thumbnail-image-mobile'],
                  ].join(' ')}
                  src={'../../assets/images/menu.png'}
                />
              )}
            {!item?.thumbnail &&
              productType === MedusaProductTypeNames.RequiredFood && (
                <Line.RestaurantMenu
                  className={[
                    styles['thumbnail-image'],
                    styles['thumbnail-image-mobile'],
                  ].join(' ')}
                />
              )}
            {item?.thumbnail && (
              <img
                className={[
                  styles['thumbnail-image'],
                  styles['thumbnail-image-mobile'],
                ].join(' ')}
                src={item.thumbnail}
              />
            )}
          </div>
          <div
            className={[
              styles['title-container'],
              styles['title-container-mobile'],
            ].join(' ')}
            onClick={() =>
              navigate({
                pathname: `${RoutePathsType.Store}/${item.variant.product_id}`,
                search: query.toString(),
              })
            }
          >
            <div
              className={[styles['title'], styles['title-mobile']].join(' ')}
            >
              {item.title}
            </div>
            {productType === MedusaProductTypeNames.Wine && (
              <div
                className={[styles['variant'], styles['variant-mobile']].join(
                  ' '
                )}
              >{`${t('vintage')}: ${vintage}`}</div>
            )}
            {productType === MedusaProductTypeNames.RequiredFood && (
              <div
                className={[styles['variant'], styles['variant-mobile']].join(
                  ' '
                )}
              >{`${t('type')}: ${type}`}</div>
            )}
          </div>
          <div
            className={[
              styles['quantity-details-container'],
              styles['quantity-details-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['quantity-container'],
                styles['quantity-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['quantity-text'],
                  styles['quantity-text-mobile'],
                ].join(' ')}
              >
                {t('quantity')}
              </div>
              <div
                className={[
                  styles['quantity-buttons'],
                  styles['quantity-buttons-mobile'],
                ].join(' ')}
              >
                <Button
                  block={true}
                  classNames={{
                    button: styles['quantity-button'],
                  }}
                  rippleProps={{
                    color: 'rgba(233, 33, 66, .35)',
                  }}
                  type={'text'}
                  rounded={true}
                  touchScreen={true}
                  size={'tiny'}
                  icon={<Line.Remove size={18} />}
                  onClick={() => decrementItemQuantity(1)}
                />
                <div
                  className={[
                    styles['quantity'],
                    styles['quantity-mobile'],
                  ].join(' ')}
                >
                  {quantity}
                </div>
                <Button
                  block={true}
                  classNames={{
                    button: styles['quantity-button'],
                  }}
                  rippleProps={{
                    color: 'rgba(233, 33, 66, .35)',
                  }}
                  type={'text'}
                  rounded={true}
                  touchScreen={true}
                  size={'tiny'}
                  icon={<Line.Add size={18} />}
                  onClick={() => incrementItemQuantity(1)}
                />
              </div>
            </div>
          </div>
          <div
            className={[
              styles['remove-container'],
              styles['remove-container-mobile'],
            ].join(' ')}
          >
            <Button
              classNames={{
                button: styles['remove-button'],
              }}
              type={'text'}
              rounded={true}
              size={'tiny'}
              touchScreen={true}
              icon={<Line.Delete size={24} />}
              onClick={() => setDeleteModalVisible(true)}
            />
          </div>
        </div>
        <div
          className={[
            styles['pricing-details-container'],
            styles['pricing-details-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['pricing'],
              styles['pricing-mobile'],
              hasReducedPrice ? styles['pricing-canceled'] : '',
            ].join(' ')}
          >
            {hasReducedPrice && `${t('original')}:`} &nbsp;
            {storeProps.selectedRegion &&
              formatAmount({
                amount: item.subtotal ?? 0,
                region: storeProps.selectedRegion,
                includeTaxes: false,
              })}
          </div>
          {hasReducedPrice && (
            <>
              <div
                className={[
                  styles['discount-pricing'],
                  styles['discount-pricing-mobile'],
                ].join(' ')}
              >
                {storeProps.selectedRegion &&
                  formatAmount({
                    amount: (item.subtotal ?? 0) - (item.discount_total ?? 0),
                    region: storeProps.selectedRegion,
                    includeTaxes: false,
                  })}
              </div>
              <div
                className={[
                  styles['discount-percentage'],
                  styles['discount-percentage-mobile'],
                ].join(' ')}
              >
                -{discountPercentage}%
              </div>
            </>
          )}
        </div>
        <Modal
          classNames={{
            overlay: styles['modal-overlay'],
            title: styles['modal-title'],
            description: styles['modal-description'],
            cancelButton: {
              button: styles['modal-cancel-button'],
            },
            confirmButton: {
              button: styles['modal-confirm-button'],
            },
          }}
          visible={deleteModalVisible}
          onConfirm={onRemove}
          onCancel={() => setDeleteModalVisible(false)}
          title={t('removeItem') ?? ''}
          description={t('removeItemDescription', { item: item.title }) ?? ''}
        />
      </div>
    </ResponsiveMobile>
  );
}
