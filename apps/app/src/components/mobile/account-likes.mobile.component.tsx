import { Button, Dropdown, Line } from '@fuoco.appdev/core-ui';
import { Product } from '@medusajs/medusa';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ProductLikesMetadataResponse } from '../../protobuf/product-like_pb';
import { RoutePathsType, useQuery } from '../../route-paths';
import { MedusaProductTypeNames } from '../../types/medusa.type';
import { AccountLikesResponsiveProps } from '../account-likes.component';
import styles from '../account-likes.module.scss';
import { useAccountOutletContext } from '../account.component';
import CartVariantItemComponent from '../cart-variant-item.component';
import ProductPreviewComponent from '../product-preview.component';
import { ResponsiveMobile } from '../responsive.component';

export default function AccountLikesMobileComponent({
  storeProps,
  accountProps,
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
}: AccountLikesResponsiveProps): JSX.Element {
  const { t } = useTranslation();
  const rootRef = React.createRef<HTMLDivElement>();
  const navigate = useNavigate();
  const query = useQuery();
  const context = useAccountOutletContext();

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
                  styles['no-liked-products-container-mobile'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['no-items-text'],
                    styles['no-items-text-mobile'],
                  ].join(' ')}
                >
                  {t('noLikedProducts')}
                </div>
                <div
                  className={[
                    styles['no-items-container'],
                    styles['no-items-container-mobile'],
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
        <>
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
          </Dropdown>
        </>,
        document.body
      )}
    </ResponsiveMobile>
  );
}
