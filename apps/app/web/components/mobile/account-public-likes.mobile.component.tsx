/* eslint-disable jsx-a11y/alt-text */
import { Button, Dropdown, Line } from '@fuoco.appdev/web-components';
import { Product } from '@medusajs/medusa';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { ProductLikesMetadataResponse } from '../../../shared/protobuf/product-like_pb';
import { MedusaProductTypeNames } from '../../../shared/types/medusa.type';
import styles from '../../modules/account-public-likes.module.scss';
import { AccountPublicLikesResponsiveProps } from '../account-public-likes.component';
import { useAccountPublicOutletContext } from '../account-public.component';
import { DIContext } from '../app.component';
import CartVariantItemComponent from '../cart-variant-item.component';
import ProductPreviewComponent from '../product-preview.component';
import { ResponsiveMobile } from '../responsive.component';

function AccountPublicLikesMobileComponent({
  openCartVariants,
  variantQuantities,
  isPreviewLoading,
  setIsPreviewLoading,
  setOpenCartVariants,
  setVariantQuantities,
  onAddToCart,
  onProductPreviewClick,
  onProductPreviewRest,
  onProductPreviewAddToCart,
  onProductPreviewLikeChanged,
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
    <ResponsiveMobile>
      <div
        ref={rootRef}
        className={[styles['root'], styles['root-mobile']].join(' ')}
      >
        <div
          className={[
            styles['items-container'],
            styles['items-container-mobile'],
          ].join(' ')}
        >
          {likedProducts.map((product: Product, index: number) => {
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
          })}
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
                styles['no-liked-products-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['no-items-text'],
                  styles['no-items-text-mobile'],
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
        <Dropdown
          classNames={{
            touchscreenOverlay: styles['dropdown-touchscreen-overlay'],
          }}
          open={openCartVariants}
          touchScreen={true}
          onClose={() => {
            setOpenCartVariants(false);
            setIsPreviewLoading(false);
          }}
        >
          <div
            className={[
              styles['add-variants-container'],
              styles['add-variants-container-mobile'],
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
                  styles['add-to-cart-button-container-mobile'],
                ].join(' '),
                button: [
                  styles['add-to-cart-button'],
                  styles['add-to-cart-button-mobile'],
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
        </Dropdown>,
        document.body
      )}
    </ResponsiveMobile>
  );
}

export default observer(AccountPublicLikesMobileComponent);
