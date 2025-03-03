import { HttpTypes } from '@medusajs/types';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductLikesMetadataResponse } from '../../shared/protobuf/product-like_pb';
import { RoutePathsType } from '../../shared/route-paths-type';
import { useQuery } from '../route-paths';
import { DIContext } from './app.component';
import { AccountPublicLikesSuspenseDesktopComponent } from './desktop/suspense/account-public-likes.suspense.desktop.component';
import { AccountPublicLikesSuspenseMobileComponent } from './mobile/suspense/account-public-likes.suspense.mobile.component';

const AccountPublicLikesDesktopComponent = React.lazy(
  () => import('./desktop/account-public-likes.desktop.component')
);
const AccountPublicLikesMobileComponent = React.lazy(
  () => import('./mobile/account-public-likes.mobile.component')
);

export interface AccountPublicLikesResponsiveProps {
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

function AccountPublicLikesComponent(): JSX.Element {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const query = useQuery();
  const { AccountPublicController, ProductController } =
    React.useContext(DIContext);
  const { suspense, selectedLikedProduct } = AccountPublicController.model;
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
    AccountPublicController.updateLikesScrollPosition(scrollTop);
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
          //       item: accountPublicProps.selectedLikedProduct?.title,
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
    if (!id) {
      return;
    }

    AccountPublicController.loadLikedProductsAsync(id);
  }, [id]);

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
      <AccountPublicLikesSuspenseDesktopComponent />
      <AccountPublicLikesSuspenseMobileComponent />
    </>
  );

  if (suspense) {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <AccountPublicLikesDesktopComponent
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
      <AccountPublicLikesMobileComponent
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
    </React.Suspense>
  );
}

export default observer(AccountPublicLikesComponent);
