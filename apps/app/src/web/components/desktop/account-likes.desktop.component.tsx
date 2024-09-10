import { Button, Line, Modal } from '@fuoco.appdev/web-components';
import { Product } from '@medusajs/medusa';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ProductLikesMetadataResponse } from '../../../protobuf/product-like_pb';
import { RoutePathsType } from '../../../route-paths-type';
import { MedusaProductTypeNames } from '../../../types/medusa.type';
import styles from '../../modules/account-likes.module.scss';
import { useQuery } from '../../route-paths';
import { AccountLikesResponsiveProps } from '../account-likes.component';
import { useAccountOutletContext } from '../account.component';
import CartVariantItemComponent from '../cart-variant-item.component';
import ProductPreviewComponent from '../product-preview.component';
import { ResponsiveDesktop } from '../responsive.component';

export default function AccountLikesDesktopComponent({
  storeProps,
  accountProps,
  openCartVariants,
  variantQuantities,
  isPreviewLoading,
  setIsPreviewLoading,
  setOpenCartVariants,
  setVariantQuantities,
  onAddToCart,
  onProductPreviewAddToCart,
  onProductPreviewClick,
  onProductPreviewLikeChanged,
  onProductPreviewRest,
}: AccountLikesResponsiveProps): JSX.Element {
  const { t } = useTranslation();
  const rootRef = React.createRef<HTMLDivElement>();
  const navigate = useNavigate();
  const query = useQuery();
  const context = useAccountOutletContext();

  return (
    <ResponsiveDesktop>
      <div
        ref={rootRef}
        className={[styles['root'], styles['root-desktop']].join(' ')}
      >
        <div
          className={[
            styles['items-container'],
            styles['items-container-desktop'],
          ].join(' ')}
        >
          {accountProps.likedProducts.map((product: Product, index: number) => {
            const productLikesMetadata = Object.keys(
              accountProps.productLikesMetadata
            ).includes(product.id ?? '')
              ? accountProps.productLikesMetadata[product.id ?? '']
              : null;
            return (
              <ProductPreviewComponent
                parentRef={rootRef}
                key={index}
                storeProps={storeProps}
                accountProps={accountProps}
                purchasable={false}
                thumbnail={product.thumbnail ?? undefined}
                title={product.title ?? undefined}
                subtitle={product.subtitle ?? undefined}
                description={product.description ?? undefined}
                type={product.type ?? undefined}
                pricedProduct={null}
                isLoading={
                  isPreviewLoading &&
                  accountProps.selectedLikedProduct?.id === product?.id
                }
                likesMetadata={
                  productLikesMetadata ?? ProductLikesMetadataResponse.prototype
                }
                onClick={() =>
                  onProductPreviewClick(
                    context?.scrollContainerRef?.current?.scrollTop ?? 0,
                    product,
                    productLikesMetadata
                  )
                }
                onRest={() => onProductPreviewRest(product)}
                onAddToCart={() => onProductPreviewAddToCart(product)}
                onLikeChanged={(isLiked: boolean) =>
                  onProductPreviewLikeChanged(isLiked, product)
                }
              />
            );
          })}
          {!accountProps.areLikedProductsLoading &&
            accountProps.likedProducts.length <= 0 && (
              <div
                className={[
                  styles['no-liked-products-container'],
                  styles['no-liked-products-container-desktop'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['no-items-text'],
                    styles['no-items-text-desktop'],
                  ].join(' ')}
                >
                  {t('noLikedProducts')}
                </div>
                <div
                  className={[
                    styles['no-items-container'],
                    styles['no-items-container-desktop'],
                  ].join(' ')}
                >
                  <Button
                    classNames={{
                      button: styles['outline-button'],
                    }}
                    rippleProps={{
                      color: 'rgba(133, 38, 122, .35)',
                    }}
                    size={'large'}
                    onClick={() =>
                      setTimeout(
                        () =>
                          navigate({
                            pathname: RoutePathsType.Store,
                            search: query.toString(),
                          }),
                        75
                      )
                    }
                  >
                    {t('store')}
                  </Button>
                </div>
              </div>
            )}
        </div>
      </div>
      {ReactDOM.createPortal(
        <Modal
          classNames={{
            overlay: [
              styles['modal-overlay'],
              styles['modal-overlay-desktop'],
            ].join(' '),
            modal: [styles['modal'], styles['modal-desktop']].join(' '),
            text: [styles['modal-text'], styles['modal-text-desktop']].join(
              ' '
            ),
            title: [styles['modal-title'], styles['modal-title-desktop']].join(
              ' '
            ),
            description: [
              styles['modal-description'],
              styles['modal-description-desktop'],
            ].join(' '),
            footerButtonContainer: [
              styles['modal-footer-button-container'],
              styles['modal-footer-button-container-desktop'],
              styles['modal-address-footer-button-container-desktop'],
            ].join(' '),
            cancelButton: {
              button: [
                styles['modal-cancel-button'],
                styles['modal-cancel-button-desktop'],
              ].join(' '),
            },
            confirmButton: {
              button: [
                styles['modal-confirm-button'],
                styles['modal-confirm-button-desktop'],
              ].join(' '),
            },
          }}
          title={t('addVariant') ?? ''}
          visible={openCartVariants}
          onCancel={() => {
            setOpenCartVariants(false);
            setIsPreviewLoading(false);
          }}
          hideFooter={true}
        >
          <div
            className={[
              styles['add-variants-container'],
              styles['add-variants-container-desktop'],
            ].join(' ')}
          >
            {accountProps.selectedLikedProduct?.variants.map((variant) => {
              return (
                <CartVariantItemComponent
                  productType={
                    accountProps.selectedLikedProduct?.type
                      ?.value as MedusaProductTypeNames
                  }
                  key={variant.id}
                  product={accountProps.selectedLikedProduct}
                  variant={variant}
                  storeProps={storeProps}
                  variantQuantities={variantQuantities}
                  setVariantQuantities={setVariantQuantities}
                />
              );
            })}
            <Button
              classNames={{
                container: [
                  styles['add-to-cart-button-container'],
                  styles['add-to-cart-button-container-desktop'],
                ].join(' '),
                button: [
                  styles['add-to-cart-button'],
                  styles['add-to-cart-button-desktop'],
                ].join(' '),
              }}
              block={true}
              size={'full'}
              rippleProps={{
                color: 'rgba(252, 245, 227, .35)',
              }}
              icon={<Line.AddShoppingCart size={24} />}
              disabled={
                Object.values(variantQuantities).reduce((current, next) => {
                  return current + next;
                }, 0) <= 0
              }
              onClick={onAddToCart}
            >
              {t('addToCart')}
            </Button>
          </div>
        </Modal>,
        document.body
      )}
    </ResponsiveDesktop>
  );
}
