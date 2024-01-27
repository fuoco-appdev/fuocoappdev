import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';
import { useEffect, useRef, useState } from 'react';
import { TabProps } from '@fuoco.appdev/core-ui/dist/cjs/src/components/tabs/tabs';
import StoreController from '../controllers/store.controller';
import { useObservable } from '@ngneat/use-observable';
import CartController from '../controllers/cart.controller';
import ExploreController from '../controllers/explore.controller';
import WindowController from '../controllers/window.controller';
import ProductController from '../controllers/product.controller';
import { Store } from '@ngneat/elf';
import {
  ExploreLocalState,
  ExploreState,
  InventoryLocation,
} from '../models/explore.model';
import { Helmet } from 'react-helmet';
import { CartState } from '../models/cart.model';
import { StoreState } from '../models/store.model';
import { WindowState } from '../models/window.model';
import { lazy } from '@loadable/component';
import React from 'react';
import { CartSuspenseDesktopComponent } from './desktop/suspense/cart.suspense.desktop.component';
import { CartSuspenseMobileComponent } from './mobile/suspense/cart.suspense.mobile.component';
import { CartSuspenseTabletComponent } from './tablet/suspense/cart.suspense.tablet.component';
import { RoutePathsType, useQuery } from '../route-paths';
import { useNavigate } from 'react-router-dom';
import {
  PricedProduct,
  PricedVariant,
} from '@medusajs/medusa/dist/types/pricing';
import { useTranslation } from 'react-i18next';

const CartDesktopComponent = lazy(
  () => import('./desktop/cart.desktop.component')
);
const CartTabletComponent = lazy(
  () => import('./tablet/cart.tablet.component')
);
const CartMobileComponent = lazy(
  () => import('./mobile/cart.mobile.component')
);

export interface CartResponsiveProps {
  cartProps: CartState;
  exploreProps: ExploreState;
  storeProps: StoreState;
  windowProps: WindowState;
  exploreLocalProps: ExploreLocalState;
  salesChannelTabs: TabProps[];
  isFoodRequirementOpen: boolean;
  foodVariantQuantities: Record<string, number>;
  setIsFoodRequirementOpen: (value: boolean) => void;
  setFoodVariantQuantities: (value: Record<string, number>) => void;
  onCheckout: () => void;
  onAddFoodToCart: () => void;
}

export default function CartComponent(): JSX.Element {
  const navigate = useNavigate();
  const query = useQuery();
  const [cartProps] = useObservable(CartController.model.store);
  const [exploreProps] = useObservable(ExploreController.model.store);
  const [storeProps] = useObservable(StoreController.model.store);
  const [windowProps] = useObservable(WindowController.model.store);
  const [cartLocalProps] = useObservable(
    CartController.model.localStore ?? Store.prototype
  );
  const [exploreLocalProps] = useObservable(
    ExploreController.model.localStore ?? Store.prototype
  );
  const [salesChannelTabs, setSalesChannelTabs] = useState<TabProps[]>([]);
  const [isFoodRequirementOpen, setIsFoodRequirementOpen] =
    useState<boolean>(false);
  const [foodVariantQuantities, setFoodVariantQuantities] = useState<
    Record<string, number>
  >({});
  const renderCountRef = useRef<number>(0);
  const { t, i18n } = useTranslation();

  const onAddFoodToCart = () => {
    for (const id in foodVariantQuantities) {
      const quantity = foodVariantQuantities[id];
      ProductController.addToCartAsync(
        id,
        quantity,
        () => {},
        (error) => console.error(error)
      );
    }

    setIsFoodRequirementOpen(false);
  };

  const onCheckout = () => {
    if (!CartController.isFoodRequirementInCart()) {
      setIsFoodRequirementOpen(true);
      return;
    }

    setTimeout(
      () =>
        navigate({
          pathname: RoutePathsType.Checkout,
          search: query.toString(),
        }),
      75
    );
  };

  useEffect(() => {
    renderCountRef.current += 1;
    CartController.load(renderCountRef.current);
    return () => {
      CartController.disposeLoad(renderCountRef.current);
    };
  }, []);

  useEffect(() => {
    const tabProps: TabProps[] = [];
    const locations = exploreProps.inventoryLocations as InventoryLocation[];
    for (const key in cartLocalProps.cartIds) {
      if (!key.startsWith('sloc_')) {
        continue;
      }

      const location = locations.find((value) => value.id === key);
      const salesChannel = location?.salesChannels[0];
      tabProps.push({ id: key, label: salesChannel?.name });
    }

    setSalesChannelTabs(tabProps);
  }, [cartLocalProps.cartIds, exploreProps.inventoryLocations]);

  useEffect(() => {
    const quantities: Record<string, number> = {};
    for (const product of cartProps.requiredFoodProducts as PricedProduct[]) {
      for (const variant of product?.variants) {
        if (!variant?.id) {
          continue;
        }
        quantities[variant?.id] = 0;
      }
    }

    setFoodVariantQuantities(quantities);
  }, [cartProps.requiredFoodProducts]);

  const suspenceComponent = (
    <>
      <CartSuspenseDesktopComponent />
      <CartSuspenseTabletComponent />
      <CartSuspenseMobileComponent />
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <>
      <Helmet>
        <title>Cruthology</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Cruthology'} />
        <meta
          name="description"
          content={
            'An exclusive wine club offering high-end dinners, entertainment, and enchanting wine tastings, providing a gateway to extraordinary cultural experiences.'
          }
        />
        <meta
          property="og:image"
          content={'https://cruthology.com/assets/opengraph/opengraph.jpg'}
        />
        <meta property="og:title" content={'Home | Cruthology'} />
        <meta
          property="og:description"
          content={
            'An exclusive wine club offering high-end dinners, entertainment, and enchanting wine tastings, providing a gateway to extraordinary cultural experiences.'
          }
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <React.Suspense fallback={suspenceComponent}>
        <CartDesktopComponent
          cartProps={cartProps}
          exploreProps={exploreProps}
          storeProps={storeProps}
          windowProps={windowProps}
          exploreLocalProps={exploreLocalProps}
          salesChannelTabs={salesChannelTabs}
          foodVariantQuantities={foodVariantQuantities}
          setFoodVariantQuantities={setFoodVariantQuantities}
          isFoodRequirementOpen={isFoodRequirementOpen}
          setIsFoodRequirementOpen={setIsFoodRequirementOpen}
          onCheckout={onCheckout}
          onAddFoodToCart={onAddFoodToCart}
        />
        <CartTabletComponent
          cartProps={cartProps}
          exploreProps={exploreProps}
          storeProps={storeProps}
          windowProps={windowProps}
          exploreLocalProps={exploreLocalProps}
          salesChannelTabs={salesChannelTabs}
          foodVariantQuantities={foodVariantQuantities}
          setFoodVariantQuantities={setFoodVariantQuantities}
          isFoodRequirementOpen={isFoodRequirementOpen}
          setIsFoodRequirementOpen={setIsFoodRequirementOpen}
          onCheckout={onCheckout}
          onAddFoodToCart={onAddFoodToCart}
        />
        <CartMobileComponent
          cartProps={cartProps}
          exploreProps={exploreProps}
          storeProps={storeProps}
          windowProps={windowProps}
          exploreLocalProps={exploreLocalProps}
          salesChannelTabs={salesChannelTabs}
          foodVariantQuantities={foodVariantQuantities}
          setFoodVariantQuantities={setFoodVariantQuantities}
          isFoodRequirementOpen={isFoodRequirementOpen}
          setIsFoodRequirementOpen={setIsFoodRequirementOpen}
          onCheckout={onCheckout}
          onAddFoodToCart={onAddFoodToCart}
        />
      </React.Suspense>
    </>
  );
}
