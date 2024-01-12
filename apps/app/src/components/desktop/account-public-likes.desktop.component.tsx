import { createRef, useEffect, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AccountController from '../../controllers/account.controller';
import ProductController from '../../controllers/product.controller';
import styles from '../account-likes.module.scss';
import { Alert, Button, Line, Modal } from '@fuoco.appdev/core-ui';
import { RoutePathsType } from '../../route-paths';
import { useTranslation } from 'react-i18next';
import SupabaseService from '../../services/supabase.service';
import { useObservable } from '@ngneat/use-observable';
import { useSpring } from 'react-spring';
import * as core from '../../protobuf/core_pb';
import LoadingComponent from '../loading.component';
import { Store } from '@ngneat/elf';
import AccountProfileFormComponent from '../account-profile-form.component';
import { AccountLikesResponsiveProps } from '../account-likes.component';
import { ResponsiveDesktop } from '../responsive.component';
import {
  PricedProduct,
  PricedVariant,
} from '@medusajs/medusa/dist/types/pricing';
import ProductPreviewComponent from '../product-preview.component';
import { createPortal } from 'react-dom';
import CartVariantItemComponent from '../cart-variant-item.component';
import { MedusaProductTypeNames } from '../../types/medusa.type';
import { useAccountPublicOutletContext } from '../account-public.component';
import { AccountPublicLikesResponsiveProps } from '../account-public-likes.component';

export default function AccountPublicLikesDesktopComponent({
  storeProps,
  accountProps,
  accountPublicProps,
  openCartVariants,
  variantQuantities,
  setOpenCartVariants,
  setVariantQuantities,
  onAddToCart,
  onProductPreviewAddToCart,
  onProductPreviewClick,
  onProductPreviewLikeChanged,
  onProductPreviewRest,
}: AccountPublicLikesResponsiveProps): JSX.Element {
  const { t, i18n } = useTranslation();
  const rootRef = createRef<HTMLDivElement>();
  const navigate = useNavigate();
  const context = useAccountPublicOutletContext();

  return (
    <ResponsiveDesktop>
      <div
        ref={rootRef}
        className={[styles['root'], styles['root-desktop']].join(' ')}
      >
        <div
          className={[
            styles['likes-text-container'],
            styles['likes-text-container-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['likes-text'],
              styles['likes-text-desktop'],
            ].join(' ')}
          >
            {t('likes')}
          </div>
        </div>
        <div
          className={[
            styles['items-container'],
            styles['items-container-desktop'],
          ].join(' ')}
        >
          {accountPublicProps.likedProducts.map(
            (product: PricedProduct, index: number) => {
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
                  thumbnail={product.thumbnail ?? undefined}
                  title={product.title ?? undefined}
                  subtitle={product.subtitle ?? undefined}
                  description={product.description ?? undefined}
                  pricedProduct={product}
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
            }
          )}
          <img
            src={'../assets/svg/ring-resize-dark.svg'}
            className={styles['loading-ring']}
            style={{
              display:
                accountPublicProps.areLikedProductsLoading ||
                accountPublicProps.hasMoreLikes
                  ? 'flex'
                  : 'none',
            }}
          />
          {!accountPublicProps.areLikedProductsLoading &&
            accountPublicProps.likedProducts.length <= 0 && (
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
                    username: accountPublicProps.account?.username ?? '',
                  })}
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
          onCancel={() => setOpenCartVariants(false)}
          hideFooter={true}
        >
          <div
            className={[
              styles['add-variants-container'],
              styles['add-variants-container-desktop'],
            ].join(' ')}
          >
            {accountPublicProps.selectedLikedProduct?.variants.map(
              (variant) => {
                return (
                  <CartVariantItemComponent
                    productType={MedusaProductTypeNames.Wine}
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
    </ResponsiveDesktop>
  );
}
