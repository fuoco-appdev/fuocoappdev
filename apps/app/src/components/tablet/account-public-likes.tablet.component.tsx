import { Button, Line, Modal } from '@fuoco.appdev/core-ui';
import { Product } from '@medusajs/medusa';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { ProductLikesMetadataResponse } from '../../protobuf/product-like_pb';
import { MedusaProductTypeNames } from '../../types/medusa.type';
import { AccountPublicLikesResponsiveProps } from '../account-public-likes.component';
import styles from '../account-public-likes.module.scss';
import { useAccountPublicOutletContext } from '../account-public.component';
import CartVariantItemComponent from '../cart-variant-item.component';
import ProductPreviewComponent from '../product-preview.component';
import { ResponsiveTablet } from '../responsive.component';
;

export default function AccountLikesTabletComponent({
  storeProps,
  accountProps,
  accountPublicProps,
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
}: AccountPublicLikesResponsiveProps): JSX.Element {
  const { t } = useTranslation();
  const rootRef = React.createRef<HTMLDivElement>();
  const context = useAccountPublicOutletContext();

  return (
    <ResponsiveTablet>
      <div
        ref={rootRef}
        className={[styles['root'], styles['root-tablet']].join(' ')}
      >
        <div
          className={[
            styles['items-container'],
            styles['items-container-tablet'],
          ].join(' ')}
        >
          {accountPublicProps.likedProducts.map(
            (product: Product, index: number) => {
              const productLikesMetadata = Object.keys(
                accountPublicProps.productLikesMetadata
              ).includes(product.id ?? '')
                ? accountPublicProps.productLikesMetadata[product.id ?? '']
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
                    accountPublicProps.selectedLikedProduct?.id === product?.id
                  }
                  likesMetadata={
                    productLikesMetadata ??
                    ProductLikesMetadataResponse.prototype
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
            }
          )}
          <img
            src={'../assets/svg/ring-resize-dark.svg'}
            className={styles['loading-ring']}
            style={{
              maxHeight:
                accountPublicProps.areLikedProductsLoading
                  ? 24
                  : 0,
            }}
          />
          {!accountPublicProps.areLikedProductsLoading &&
            accountPublicProps.likedProducts.length <= 0 && (
              <div
                className={[
                  styles['no-liked-products-container'],
                  styles['no-liked-products-container-tablet'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['no-items-text'],
                    styles['no-items-text-tablet'],
                  ].join(' ')}
                >
                  {t('userNoLikedProducts', {
                    username: accountPublicProps.account?.username ?? '',
                  })}
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
              styles['modal-overlay-tablet'],
            ].join(' '),
            modal: [styles['modal'], styles['modal-tablet']].join(' '),
            text: [styles['modal-text'], styles['modal-text-tablet']].join(' '),
            title: [styles['modal-title'], styles['modal-title-tablet']].join(
              ' '
            ),
            description: [
              styles['modal-description'],
              styles['modal-description-tablet'],
            ].join(' '),
            footerButtonContainer: [
              styles['modal-footer-button-container'],
              styles['modal-footer-button-container-tablet'],
              styles['modal-address-footer-button-container-tablet'],
            ].join(' '),
            cancelButton: {
              button: [
                styles['modal-cancel-button'],
                styles['modal-cancel-button-tablet'],
              ].join(' '),
            },
            confirmButton: {
              button: [
                styles['modal-confirm-button'],
                styles['modal-confirm-button-tablet'],
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
              styles['add-variants-container-tablet'],
            ].join(' ')}
          >
            {accountPublicProps.selectedLikedProduct?.variants.map(
              (variant) => {
                return (
                  <CartVariantItemComponent
                    productType={
                      accountPublicProps.selectedLikedProduct?.type
                        ?.value as MedusaProductTypeNames
                    }
                    key={variant.id}
                    product={accountPublicProps.selectedLikedProduct}
                    variant={variant}
                    storeProps={storeProps}
                    variantQuantities={variantQuantities}
                    setVariantQuantities={setVariantQuantities}
                  />
                );
              }
            )}
            <Button
              touchScreen={true}
              classNames={{
                container: [
                  styles['add-to-cart-button-container'],
                  styles['add-to-cart-button-container-tablet'],
                ].join(' '),
                button: [
                  styles['add-to-cart-button'],
                  styles['add-to-cart-button-tablet'],
                ].join(' '),
              }}
              block={true}
              size={'full'}
              rippleProps={{
                color: 'rgba(233, 33, 66, .35)',
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
    </ResponsiveTablet>
  );
}
