import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';
import AccountController from '../controllers/account.controller';
import WindowController from '../controllers/window.controller';
import HomeController from '../controllers/home.controller';
import StoreController from '../controllers/store.controller';
import ProductController from '../controllers/product.controller';
import { useTranslation } from 'react-i18next';
import { useObservable } from '@ngneat/use-observable';
import { StoreState } from '../models/store.model';
import { AuthenticatedComponent } from './authenticated.component';
import { lazy } from '@loadable/component';
import { AccountLikesSuspenseDesktopComponent } from './desktop/suspense/account-likes.suspense.desktop.component';
import React, { useEffect, useState } from 'react';
import { AccountLikesSuspenseMobileComponent } from './mobile/suspense/account-likes.suspense.mobile.component';
import { AccountState } from '../models/account.model';
import { AccountLikesSuspenseTabletComponent } from './tablet/suspense/account-likes.suspense.tablet.component';
import { Store } from '@ngneat/elf';
import { HomeLocalState } from '../models/home.model';
import { PricedVariant } from '@medusajs/medusa/dist/types/pricing';

const AccountLikesDesktopComponent = lazy(
  () => import('./desktop/account-likes.desktop.component')
);
const AccountLikesTabletComponent = lazy(
  () => import('./tablet/account-likes.tablet.component')
);
const AccountLikesMobileComponent = lazy(
  () => import('./mobile/account-likes.mobile.component')
);

export interface AccountLikesResponsiveProps {
  storeProps: StoreState;
  accountProps: AccountState;
  openCartVariants: boolean;
  variantQuantities: Record<string, number>;
  setOpenCartVariants: (value: boolean) => void;
  setVariantQuantities: (value: Record<string, number>) => void;
  onScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  onLoad: (e: React.SyntheticEvent<HTMLDivElement, Event>) => void;
  onAddToCart: () => void;
}

export default function AccountLikesComponent(): JSX.Element {
  const { t, i18n } = useTranslation();
  const [storeProps] = useObservable(StoreController.model.store);
  const [accountProps] = useObservable(AccountController.model.store);
  const [openCartVariants, setOpenCartVariants] = useState<boolean>(false);
  const [variantQuantities, setVariantQuantities] = useState<
    Record<string, number>
  >({});

  const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const scrollTop = e.currentTarget?.scrollTop ?? 0;
    const scrollHeight = e.currentTarget?.scrollHeight ?? 0;
    const clientHeight = e.currentTarget?.clientHeight ?? 0;
    const scrollOffset = scrollHeight - scrollTop - clientHeight;

    if (scrollOffset > 16 || !AccountController.model.hasMoreLikes) {
      return;
    }

    AccountController.onNextLikedProductScrollAsync();
  };

  const onLoad = (e: React.SyntheticEvent<HTMLDivElement, Event>) => {
    if (accountProps.likesScrollPosition) {
      e.currentTarget.scrollTop = accountProps.likesScrollPosition as number;
      AccountController.updateLikesScrollPosition(undefined);
    }
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
                item: accountProps.selectedLikedProduct?.title,
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
    if (!accountProps.selectedLikedProduct) {
      return;
    }

    const variants: PricedVariant[] =
      accountProps.selectedLikedProduct?.variants;
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
  }, [accountProps.selectedLikedProduct]);

  const suspenceComponent = (
    <>
      <AccountLikesSuspenseDesktopComponent />
      <AccountLikesSuspenseTabletComponent />
      <AccountLikesSuspenseMobileComponent />
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <AuthenticatedComponent>
        <AccountLikesDesktopComponent
          storeProps={storeProps}
          accountProps={accountProps}
          openCartVariants={openCartVariants}
          variantQuantities={variantQuantities}
          setOpenCartVariants={setOpenCartVariants}
          setVariantQuantities={setVariantQuantities}
          onScroll={onScroll}
          onLoad={onLoad}
          onAddToCart={onAddToCart}
        />
        <AccountLikesTabletComponent
          storeProps={storeProps}
          accountProps={accountProps}
          openCartVariants={openCartVariants}
          variantQuantities={variantQuantities}
          setOpenCartVariants={setOpenCartVariants}
          setVariantQuantities={setVariantQuantities}
          onScroll={onScroll}
          onLoad={onLoad}
          onAddToCart={onAddToCart}
        />
        <AccountLikesMobileComponent
          storeProps={storeProps}
          accountProps={accountProps}
          openCartVariants={openCartVariants}
          variantQuantities={variantQuantities}
          setOpenCartVariants={setOpenCartVariants}
          setVariantQuantities={setVariantQuantities}
          onScroll={onScroll}
          onLoad={onLoad}
          onAddToCart={onAddToCart}
        />
      </AuthenticatedComponent>
    </React.Suspense>
  );
}
