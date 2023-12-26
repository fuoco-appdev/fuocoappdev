import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';
import AccountController from '../controllers/account.controller';
import AccountPublicController from '../controllers/account-public.controller';
import WindowController from '../controllers/window.controller';
import HomeController from '../controllers/home.controller';
import StoreController from '../controllers/store.controller';
import ProductController from '../controllers/product.controller';
import { useTranslation } from 'react-i18next';
import { useObservable } from '@ngneat/use-observable';
import { StoreState } from '../models/store.model';
import { AuthenticatedComponent } from './authenticated.component';
import { lazy } from '@loadable/component';
import React, { useEffect, useState } from 'react';
import { AccountState } from '../models/account.model';
import { Store } from '@ngneat/elf';
import { HomeLocalState } from '../models/home.model';
import {
  PricedVariant,
  PricedProduct,
} from '@medusajs/medusa/dist/types/pricing';
import { useNavigate } from 'react-router-dom';
import { RoutePathsType } from '../route-paths';
import * as core from '../protobuf/core_pb';
import { AccountPublicLikesSuspenseDesktopComponent } from './desktop/suspense/account-public-likes.suspense.desktop.component';
import { AccountPublicLikesSuspenseTabletComponent } from './tablet/suspense/account-public-likes.suspense.tablet.component';
import { AccountPublicLikesSuspenseMobileComponent } from './mobile/suspense/account-public-likes.suspense.mobile.component';
import { AccountPublicState } from '../models/account-public.model';

const AccountPublicLikesDesktopComponent = lazy(
  () => import('./desktop/account-public-likes.desktop.component')
);
const AccountPublicLikesTabletComponent = lazy(
  () => import('./tablet/account-public-likes.tablet.component')
);
const AccountPublicLikesMobileComponent = lazy(
  () => import('./mobile/account-public-likes.mobile.component')
);

export interface AccountPublicLikesResponsiveProps {
  storeProps: StoreState;
  accountProps: AccountState;
  accountPublicProps: AccountPublicState;
  openCartVariants: boolean;
  variantQuantities: Record<string, number>;
  setOpenCartVariants: (value: boolean) => void;
  setVariantQuantities: (value: Record<string, number>) => void;
  onAddToCart: () => void;
  onProductPreviewClick: (
    scrollTop: number,
    product: PricedProduct,
    productLikesMetadata: core.ProductLikesMetadataResponse | null
  ) => void;
  onProductPreviewRest: (product: PricedProduct) => void;
  onProductPreviewAddToCart: (product: PricedProduct) => void;
  onProductPreviewLikeChanged: (
    isLiked: boolean,
    product: PricedProduct
  ) => void;
}

export default function AccountPublicLikesComponent(): JSX.Element {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [storeProps] = useObservable(StoreController.model.store);
  const [accountProps] = useObservable(AccountController.model.store);
  const [accountPublicProps] = useObservable(
    AccountPublicController.model.store
  );
  const [openCartVariants, setOpenCartVariants] = useState<boolean>(false);
  const [variantQuantities, setVariantQuantities] = useState<
    Record<string, number>
  >({});

  const onProductPreviewClick = (
    scrollTop: number,
    product: PricedProduct,
    productLikesMetadata: core.ProductLikesMetadataResponse | null
  ) => {
    AccountPublicController.updateLikesScrollPosition(scrollTop);
    AccountPublicController.updateSelectedLikedProduct(product);
    StoreController.updateSelectedPreview(product);
    StoreController.updateSelectedProductLikesMetadata(productLikesMetadata);
  };

  const onProductPreviewRest = (product: PricedProduct) => {
    navigate(`${RoutePathsType.Store}/${product.id}`);
  };

  const onProductPreviewAddToCart = (product: PricedProduct) => {
    AccountPublicController.updateSelectedLikedProduct(product);
    setOpenCartVariants(true);
  };

  const onProductPreviewLikeChanged = (
    isLiked: boolean,
    product: PricedProduct
  ) => {
    ProductController.requestProductLike(isLiked, product.id ?? '');
  };

  const onAddToCart = () => {
    for (const id in variantQuantities) {
      const quantity = variantQuantities[id];
      ProductController.addToCartAsync(
        id,
        quantity,
        () =>
          WindowController.addToast({
            key: `add-to-cart-${Math.random()}`,
            message: t('addedToCart') ?? '',
            description:
              t('addedToCartDescription', {
                item: accountPublicProps.selectedLikedProduct?.title,
              }) ?? '',
            type: 'success',
          }),
        (error) => console.error(error)
      );
    }

    setOpenCartVariants(false);
    setVariantQuantities({});
  };

  useEffect(() => {
    AccountPublicController.loadLikedProducts();
  }, []);

  useEffect(() => {
    if (!accountPublicProps.selectedLikedProduct) {
      return;
    }

    const variants: PricedVariant[] =
      accountPublicProps.selectedLikedProduct?.variants;
    const quantities: Record<string, number> = {};
    for (const variant of variants) {
      if (!variant?.id) {
        continue;
      }
      quantities[variant?.id] = 0;
    }

    const purchasableVariants = variants.filter(
      (value: PricedVariant) => value.purchasable === true
    );

    if (purchasableVariants.length > 0) {
      const cheapestVariant =
        ProductController.getCheapestPrice(purchasableVariants);
      if (cheapestVariant?.id && quantities[cheapestVariant.id] <= 0) {
        quantities[cheapestVariant.id] = 1;
      }
    }

    setVariantQuantities(quantities);
  }, [accountPublicProps.selectedLikedProduct]);

  const suspenceComponent = (
    <>
      <AccountPublicLikesSuspenseDesktopComponent />
      <AccountPublicLikesSuspenseTabletComponent />
      <AccountPublicLikesSuspenseMobileComponent />
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <AccountPublicLikesDesktopComponent
        storeProps={storeProps}
        accountProps={accountProps}
        accountPublicProps={accountPublicProps}
        openCartVariants={openCartVariants}
        variantQuantities={variantQuantities}
        setOpenCartVariants={setOpenCartVariants}
        setVariantQuantities={setVariantQuantities}
        onAddToCart={onAddToCart}
        onProductPreviewClick={onProductPreviewClick}
        onProductPreviewRest={onProductPreviewRest}
        onProductPreviewAddToCart={onProductPreviewAddToCart}
        onProductPreviewLikeChanged={onProductPreviewLikeChanged}
      />
      <AccountPublicLikesTabletComponent
        storeProps={storeProps}
        accountProps={accountProps}
        accountPublicProps={accountPublicProps}
        openCartVariants={openCartVariants}
        variantQuantities={variantQuantities}
        setOpenCartVariants={setOpenCartVariants}
        setVariantQuantities={setVariantQuantities}
        onAddToCart={onAddToCart}
        onProductPreviewClick={onProductPreviewClick}
        onProductPreviewRest={onProductPreviewRest}
        onProductPreviewAddToCart={onProductPreviewAddToCart}
        onProductPreviewLikeChanged={onProductPreviewLikeChanged}
      />
      <AccountPublicLikesMobileComponent
        storeProps={storeProps}
        accountProps={accountProps}
        accountPublicProps={accountPublicProps}
        openCartVariants={openCartVariants}
        variantQuantities={variantQuantities}
        setOpenCartVariants={setOpenCartVariants}
        setVariantQuantities={setVariantQuantities}
        onAddToCart={onAddToCart}
        onProductPreviewClick={onProductPreviewClick}
        onProductPreviewRest={onProductPreviewRest}
        onProductPreviewAddToCart={onProductPreviewAddToCart}
        onProductPreviewLikeChanged={onProductPreviewLikeChanged}
      />
    </React.Suspense>
  );
}