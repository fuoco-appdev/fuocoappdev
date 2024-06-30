import { Button, Line, Modal } from '@fuoco.appdev/core-ui';
import { useTranslation } from 'react-i18next';
import styles from '../cart-item.module.scss';
// @ts-ignore
import { formatAmount } from 'medusa-react';
import { useNavigate } from 'react-router-dom';
import { MedusaProductTypeNames } from '../../../types/medusa.type';
import { RoutePathsType, useQuery } from '../../route-paths';
import { CartItemResponsiveProps } from '../cart-item.component';
import { ResponsiveDesktop } from '../responsive.component';

export default function CartItemDesktopComponent({
  storeProps,
  item,
  productType,
  quantity,
  onRemove,
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
    <ResponsiveDesktop>
      <div
        key={item.variant_id}
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
            {item?.thumbnail && productType === MedusaProductTypeNames.Wine && (
              <img
                className={[
                  styles['wine-thumbnail-image'],
                  styles['wine-thumbnail-image-desktop'],
                ].join(' ')}
                src={item?.thumbnail}
              />
            )}
            {item?.thumbnail &&
              productType === MedusaProductTypeNames.MenuItem && (
                <img
                  className={[
                    styles['menu-item-thumbnail-image'],
                    styles['menu-item-thumbnail-image-desktop'],
                  ].join(' ')}
                  src={item?.thumbnail}
                />
              )}
            {item?.thumbnail &&
              productType === MedusaProductTypeNames.RequiredFood && (
                <img
                  className={[
                    styles['required-food-thumbnail-image'],
                    styles['required-food-thumbnail-image-desktop'],
                  ].join(' ')}
                  src={item?.thumbnail}
                />
              )}
            {!item?.thumbnail &&
              productType === MedusaProductTypeNames.Wine && (
                <img
                  className={[
                    styles['no-thumbnail-image'],
                    styles['no-thumbnail-image-desktop'],
                  ].join(' ')}
                  src={'../../assets/images/wine-bottle.png'}
                />
              )}
            {!item?.thumbnail &&
              productType === MedusaProductTypeNames.MenuItem && (
                <img
                  className={[
                    styles['no-thumbnail-image'],
                    styles['no-thumbnail-image-desktop'],
                  ].join(' ')}
                  src={'../../assets/images/menu.png'}
                />
              )}
            {!item?.thumbnail &&
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
              styles['title-container'],
              styles['title-container-desktop'],
            ].join(' ')}
            onClick={() =>
              navigate({
                pathname: `${RoutePathsType.Store}/${item.variant.product_id}`,
                search: query.toString(),
              })
            }
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
              {item.variant.title}
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
                <Button
                  block={true}
                  classNames={{
                    button: styles['quantity-button'],
                  }}
                  rippleProps={{
                    color: 'rgba(252, 245, 227, .35)',
                  }}
                  floatingLabel={t('minus') ?? ''}
                  type={'text'}
                  rounded={true}
                  size={'tiny'}
                  icon={<Line.Remove size={18} />}
                  onClick={() => decrementItemQuantity(1)}
                />
                <div
                  className={[
                    styles['quantity'],
                    styles['quantity-desktop'],
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
                    color: 'rgba(252, 245, 227, .35)',
                  }}
                  floatingLabel={t('add') ?? ''}
                  type={'text'}
                  rounded={true}
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
              styles['remove-container-desktop'],
            ].join(' ')}
          >
            <Button
              classNames={{
                button: styles['remove-button'],
              }}
              type={'text'}
              rounded={true}
              size={'tiny'}
              icon={<Line.Delete size={24} />}
              floatingLabel={t('remove') ?? ''}
              onClick={() => setDeleteModalVisible(true)}
            />
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
                  styles['discount-pricing-desktop'],
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
                  styles['discount-percentage-desktop'],
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
            modal: [styles['modal'], styles['modal-desktop']].join(' '),
            text: styles['modal-text'],
            title: styles['modal-title'],
            footerButtonContainer: styles['modal-footer-container'],
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
    </ResponsiveDesktop>
  );
}
