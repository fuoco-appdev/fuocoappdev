import { TabProps } from '@fuoco.appdev/web-components/dist/cjs/src/components/tabs/tabs';
import { lazy } from '@loadable/component';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { Store } from '@ngneat/elf';
import { useObservable } from '@ngneat/use-observable';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import CartController from '../../controllers/cart.controller';
import ExploreController from '../../controllers/explore.controller';
import ProductController from '../../controllers/product.controller';
import StoreController from '../../controllers/store.controller';
import WindowController from '../../controllers/window.controller';
import { CartLocalState, CartState } from '../../models/cart.model';
import {
  ExploreLocalState,
  ExploreState,
  InventoryLocation,
} from '../../models/explore.model';
import { StoreState } from '../../models/store.model';
import { WindowState } from '../../models/window.model';
import { RoutePathsType, useQuery } from '../route-paths';
import { CartSuspenseDesktopComponent } from './desktop/suspense/cart.suspense.desktop.component';
import { CartSuspenseMobileComponent } from './mobile/suspense/cart.suspense.mobile.component';

const CartDesktopComponent = lazy(
  () => import('./desktop/cart.desktop.component')
);
const CartMobileComponent = lazy(
  () => import('./mobile/cart.mobile.component')
);

export interface CartResponsiveProps {
  cartProps: CartState;
  cartLocalProps: CartLocalState;
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
  const [salesChannelTabs, setSalesChannelTabs] = React.useState<TabProps[]>(
    []
  );
  const [isFoodRequirementOpen, setIsFoodRequirementOpen] =
    React.useState<boolean>(false);
  const [foodVariantQuantities, setFoodVariantQuantities] = React.useState<
    Record<string, number>
  >({});
  const renderCountRef = React.useRef<number>(0);

  const onAddFoodToCart = () => {
    for (const id in foodVariantQuantities) {
      const quantity = foodVariantQuantities[id];
      ProductController.addToCartAsync(
        id,
        quantity,
        () => { },
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

  React.useEffect(() => {
    renderCountRef.current += 1;
    CartController.load(renderCountRef.current);
    return () => {
      CartController.disposeLoad(renderCountRef.current);
    };
  }, []);

  React.useEffect(() => {
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

  React.useEffect(() => {
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
          cartLocalProps={cartLocalProps}
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
          cartLocalProps={cartLocalProps}
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
