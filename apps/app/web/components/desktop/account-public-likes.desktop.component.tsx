import { Button, Line, Modal } from '@fuoco.appdev/web-components';
import { HttpTypes } from '@medusajs/types';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { ProductLikesMetadataResponse } from '../../../shared/protobuf/product-like_pb';
import { MedusaProductTypeNames } from '../../../shared/types/medusa.type';
import styles from '../../modules/account-likes.module.scss';
import { AccountPublicLikesResponsiveProps } from '../account-public-likes.component';
import { useAccountPublicOutletContext } from '../account-public.component';
import { DIContext } from '../app.component';
import CartVariantItemComponent from '../cart-variant-item.component';
import ProductPreviewComponent from '../product-preview.component';
import { ResponsiveDesktop } from '../responsive.component';

function AccountPublicLikesDesktopComponent({
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
  const { AccountPublicController } = React.useContext(DIContext);
  const {
    account,
    likedProducts,
    productLikesMetadata,
    selectedLikedProduct,
    areLikedProductsLoading,
  } = AccountPublicController.model;

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
          {likedProducts.map(
            (product: HttpTypes.StoreProduct, index: number) => {
              const productLikesMetadataKeys = Object.keys(
                productLikesMetadata
              ).includes(product.id ?? '')
                ? productLikesMetadata[product.id ?? '']
                : null;
              return (
                <ProductPreviewComponent
                  parentRef={rootRef}
                  key={index}
                  purchasable={false}
                  thumbnail={product.thumbnail ?? undefined}
                  title={product.title ?? undefined}
                  subtitle={product.subtitle ?? undefined}
                  description={product.description ?? undefined}
                  type={product.type ?? undefined}
                  pricedProduct={null}
                  isLoading={
                    isPreviewLoading && selectedLikedProduct?.id === product?.id
                  }
                  likesMetadata={
                    productLikesMetadataKeys ??
                    ProductLikesMetadataResponse.prototype
                  }
                  onClick={() =>
                    onProductPreviewClick(
                      context?.scrollContainerRef?.current?.scrollTop ?? 0,
                      product,
                      productLikesMetadataKeys
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
              maxHeight: areLikedProductsLoading ? 24 : 0,
            }}
          />
          {!areLikedProductsLoading && likedProducts.length <= 0 && (
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
                {t('userNoLikedProducts', {
                  username: account?.username ?? '',
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
            {selectedLikedProduct?.variants?.map((variant) => {
              return (
                <CartVariantItemComponent
                  productType={
                    selectedLikedProduct?.type?.value as MedusaProductTypeNames
                  }
                  key={variant.id}
                  product={selectedLikedProduct}
                  variant={variant}
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

export default observer(AccountPublicLikesDesktopComponent);
