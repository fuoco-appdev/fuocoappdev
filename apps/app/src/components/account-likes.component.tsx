import { lazy } from '@loadable/component';
import { Product } from '@medusajs/medusa';
import { PricedVariant } from '@medusajs/medusa/dist/types/pricing';
import { useObservable } from '@ngneat/use-observable';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AccountController from '../controllers/account.controller';
import ProductController from '../controllers/product.controller';
import StoreController from '../controllers/store.controller';
import WindowController from '../controllers/window.controller';
import { AccountState } from '../models/account.model';
import { StoreState } from '../models/store.model';
import { ProductLikesMetadataResponse } from '../protobuf/product-like_pb';
import { RoutePathsType, useQuery } from '../route-paths';
import { AuthenticatedComponent } from './authenticated.component';
import { AccountLikesSuspenseDesktopComponent } from './desktop/suspense/account-likes.suspense.desktop.component';
import { AccountLikesSuspenseMobileComponent } from './mobile/suspense/account-likes.suspense.mobile.component';

const AccountLikesDesktopComponent = lazy(
  () => import('./desktop/account-likes.desktop.component')
);
const AccountLikesMobileComponent = lazy(
  () => import('./mobile/account-likes.mobile.component')
);

export interface AccountLikesResponsiveProps {
  storeProps: StoreState;
  accountProps: AccountState;
  openCartVariants: boolean;
  variantQuantities: Record<string, number>;
  isPreviewLoading: boolean;
  setIsPreviewLoading: (value: boolean) => void;
  setOpenCartVariants: (value: boolean) => void;
  setVariantQuantities: (value: Record<string, number>) => void;
  onAddToCart: () => void;
  onProductPreviewClick: (
    scrollTop: number,
    product: Product,
    productLikesMetadata: ProductLikesMetadataResponse | null
  ) => void;
  onProductPreviewRest: (product: Product) => void;
  onProductPreviewAddToCart: (product: Product) => void;
  onProductPreviewLikeChanged: (isLiked: boolean, product: Product) => void;
}

export default function AccountLikesComponent(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const query = useQuery();
  const [storeProps] = useObservable(StoreController.model.store);
  const [accountProps] = useObservable(AccountController.model.store);
  const [openCartVariants, setOpenCartVariants] =
    React.useState<boolean>(false);
  const [variantQuantities, setVariantQuantities] = React.useState<
    Record<string, number>
  >({});
  const [isPreviewLoading, setIsPreviewLoading] =
    React.useState<boolean>(false);

  const onProductPreviewClick = (
    scrollTop: number,
    _product: Product,
    _productLikesMetadata: ProductLikesMetadataResponse | null
  ) => {
    AccountController.updateLikesScrollPosition(scrollTop);
  };

  const onProductPreviewRest = (product: Product) => {
    navigate({
      pathname: `${RoutePathsType.Store}/${product.id}`,
      search: query.toString(),
    });
  };

  const onProductPreviewAddToCart = (_product: Product) => {
    setOpenCartVariants(true);
    setIsPreviewLoading(true);
  };

  const onProductPreviewLikeChanged = (isLiked: boolean, product: Product) => {
    ProductController.requestProductLike(isLiked, product.id ?? '');
  };

  const onAddToCart = () => {
    for (const id in variantQuantities) {
      const quantity = variantQuantities[id];
      ProductController.addToCartAsync(
        id,
        quantity,
        () => {
          WindowController.addToast({
            key: `add-to-cart-${Math.random()}`,
            message: t('addedToCart') ?? '',
            description:
              t('addedToCartDescription', {
                item: accountProps.selectedLikedProduct?.title,
              }) ?? '',
            type: 'success',
          });
          setIsPreviewLoading(false);
        },
        (error) => console.error(error)
      );
    }

    setOpenCartVariants(false);
    setVariantQuantities({});
  };

  React.useEffect(() => {
    AccountController.loadLikedProducts();
  }, []);

  React.useEffect(() => {
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
          isPreviewLoading={isPreviewLoading}
          setIsPreviewLoading={setIsPreviewLoading}
          setOpenCartVariants={setOpenCartVariants}
          setVariantQuantities={setVariantQuantities}
          onAddToCart={onAddToCart}
          onProductPreviewClick={onProductPreviewClick}
          onProductPreviewRest={onProductPreviewRest}
          onProductPreviewAddToCart={onProductPreviewAddToCart}
          onProductPreviewLikeChanged={onProductPreviewLikeChanged}
        />
        <AccountLikesMobileComponent
          storeProps={storeProps}
          accountProps={accountProps}
          openCartVariants={openCartVariants}
          variantQuantities={variantQuantities}
          isPreviewLoading={isPreviewLoading}
          setIsPreviewLoading={setIsPreviewLoading}
          setOpenCartVariants={setOpenCartVariants}
          setVariantQuantities={setVariantQuantities}
          onAddToCart={onAddToCart}
          onProductPreviewClick={onProductPreviewClick}
          onProductPreviewRest={onProductPreviewRest}
          onProductPreviewAddToCart={onProductPreviewAddToCart}
          onProductPreviewLikeChanged={onProductPreviewLikeChanged}
        />
      </AuthenticatedComponent>
    </React.Suspense>
  );
}
