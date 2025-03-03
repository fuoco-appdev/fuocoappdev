import { HttpTypes } from '@medusajs/types';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ProductLikesMetadataResponse } from '../../shared/protobuf/product-like_pb';
import { RoutePathsType } from '../../shared/route-paths-type';
import { useQuery } from '../route-paths';
import { DIContext } from './app.component';
import { AuthenticatedComponent } from './authenticated.component';
import { AccountLikesSuspenseDesktopComponent } from './desktop/suspense/account-likes.suspense.desktop.component';
import { AccountLikesSuspenseMobileComponent } from './mobile/suspense/account-likes.suspense.mobile.component';

const AccountLikesDesktopComponent = React.lazy(
  () => import('./desktop/account-likes.desktop.component')
);
const AccountLikesMobileComponent = React.lazy(
  () => import('./mobile/account-likes.mobile.component')
);

export interface AccountLikesResponsiveProps {
  openCartVariants: boolean;
  variantQuantities: Record<string, number>;
  isPreviewLoading: boolean;
  setIsPreviewLoading: (value: boolean) => void;
  setOpenCartVariants: (value: boolean) => void;
  setVariantQuantities: (value: Record<string, number>) => void;
  onAddToCart: () => void;
  onProductPreviewClick: (
    scrollTop: number,
    product: HttpTypes.StoreProduct,
    productLikesMetadata: ProductLikesMetadataResponse | null
  ) => void;
  onProductPreviewRest: (product: HttpTypes.StoreProduct) => void;
  onProductPreviewAddToCart: (product: HttpTypes.StoreProduct) => void;
  onProductPreviewLikeChanged: (
    isLiked: boolean,
    product: HttpTypes.StoreProduct
  ) => void;
}

function AccountLikesComponent(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const query = useQuery();
  const { AccountPublicController, ProductController, AccountController } =
    React.useContext(DIContext);
  const { suspense, selectedLikedProduct } = AccountController.model;
  const [openCartVariants, setOpenCartVariants] =
    React.useState<boolean>(false);
  const [variantQuantities, setVariantQuantities] = React.useState<
    Record<string, number>
  >({});
  const [isPreviewLoading, setIsPreviewLoading] =
    React.useState<boolean>(false);

  const onProductPreviewClick = (
    scrollTop: number,
    _product: HttpTypes.StoreProduct,
    _productLikesMetadata: ProductLikesMetadataResponse | null
  ) => {
    AccountController.updateLikesScrollPosition(scrollTop);
  };

  const onProductPreviewRest = (product: HttpTypes.StoreProduct) => {
    navigate({
      pathname: `${RoutePathsType.Store}/${product.id}`,
      search: query.toString(),
    });
  };

  const onProductPreviewAddToCart = (_product: HttpTypes.StoreProduct) => {
    setOpenCartVariants(true);
    setIsPreviewLoading(true);
  };

  const onProductPreviewLikeChanged = (
    isLiked: boolean,
    product: HttpTypes.StoreProduct
  ) => {
    ProductController.requestProductLike(isLiked, product.id ?? '');
  };

  const onAddToCart = () => {
    for (const id in variantQuantities) {
      const quantity = variantQuantities[id];
      ProductController.addToCartAsync(
        id,
        quantity,
        () => {
          // WindowController.addToast({
          //   key: `add-to-cart-${Math.random()}`,
          //   message: t('addedToCart') ?? '',
          //   description:
          //     t('addedToCartDescription', {
          //       item: accountProps.selectedLikedProduct?.title,
          //     }) ?? '',
          //   type: 'success',
          // });
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
    if (!selectedLikedProduct) {
      return;
    }

    const variants: HttpTypes.StoreProductVariant[] =
      selectedLikedProduct?.variants ?? [];
    const quantities: Record<string, number> = {};
    for (const variant of variants) {
      if (!variant?.id) {
        continue;
      }
      quantities[variant?.id] = 0;
    }

    const purchasableVariants = variants.filter(
      (value: HttpTypes.StoreProductVariant) =>
        value.inventory_quantity && value.inventory_quantity > 0
    );

    if (purchasableVariants.length > 0) {
      const cheapestVariant =
        ProductController.getCheapestPrice(purchasableVariants);
      if (cheapestVariant?.id && quantities[cheapestVariant.id] <= 0) {
        quantities[cheapestVariant.id] = 1;
      }
    }

    setVariantQuantities(quantities);
  }, [selectedLikedProduct]);

  const suspenceComponent = (
    <>
      <AccountLikesSuspenseDesktopComponent />
      <AccountLikesSuspenseMobileComponent />
    </>
  );

  if (suspense) {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <AuthenticatedComponent>
        <AccountLikesDesktopComponent
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

export default observer(AccountLikesComponent);
