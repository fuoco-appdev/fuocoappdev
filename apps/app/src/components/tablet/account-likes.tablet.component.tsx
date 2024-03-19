import { createRef, useEffect, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AccountController from '../../controllers/account.controller';
import ProductController from '../../controllers/product.controller';
import styles from '../account-likes.module.scss';
import { Alert, Button, Dropdown, Line, Modal } from '@fuoco.appdev/core-ui';
import { RoutePathsType, useQuery } from '../../route-paths';
import { useTranslation } from 'react-i18next';
import SupabaseService from '../../services/supabase.service';
import { useObservable } from '@ngneat/use-observable';
import { useSpring } from 'react-spring';
import * as core from '../../protobuf/core_pb';
import LoadingComponent from '../loading.component';
import { Store } from '@ngneat/elf';
import AccountProfileFormComponent from '../account-profile-form.component';
import WindowController from '../../controllers/window.controller';
import { AccountLikesResponsiveProps } from '../account-likes.component';
import { ResponsiveMobile, ResponsiveTablet } from '../responsive.component';
import ProductPreviewComponent from '../product-preview.component';
import {
  PricedProduct,
  PricedVariant,
} from '@medusajs/medusa/dist/types/pricing';
import { createPortal } from 'react-dom';
import CartVariantItemComponent from '../cart-variant-item.component';
import { MedusaProductTypeNames } from '../../types/medusa.type';
import { useAccountOutletContext } from '../account.component';
import { Product } from '@medusajs/medusa';

export default function AccountLikesTabletComponent({
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
  const { t, i18n } = useTranslation();
  const rootRef = createRef<HTMLDivElement>();
  const navigate = useNavigate();
  const query = useQuery();
  const context = useAccountOutletContext();

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
                  productLikesMetadata ??
                  core.ProductLikesMetadataResponse.prototype
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
          <img
            src={'../assets/svg/ring-resize-dark.svg'}
            className={styles['loading-ring']}
            style={{
              maxHeight: accountProps.areLikedProductsLoading ? 24 : 0,
            }}
          />
          {!accountProps.areLikedProductsLoading &&
            accountProps.likedProducts.length <= 0 && (
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
                  {t('noLikedProducts')}
                </div>
                <div
                  className={[
                    styles['no-items-container'],
                    styles['no-items-container-tablet'],
                  ].join(' ')}
                >
                  <Button
                    touchScreen={true}
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
      {createPortal(
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
