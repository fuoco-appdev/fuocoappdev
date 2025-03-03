import { TabProps } from '@fuoco.appdev/web-components/dist/cjs/src/components/tabs/tabs';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { RoutePathsType } from '../../shared/route-paths-type';
import { useQuery } from '../route-paths';
import { DIContext } from './app.component';
import { CartSuspenseDesktopComponent } from './desktop/suspense/cart.suspense.desktop.component';
import { CartSuspenseMobileComponent } from './mobile/suspense/cart.suspense.mobile.component';

const CartDesktopComponent = React.lazy(
  () => import('./desktop/cart.desktop.component')
);
const CartMobileComponent = React.lazy(
  () => import('./mobile/cart.mobile.component')
);

export interface CartResponsiveProps {
  salesChannelTabs: TabProps[];
  isFoodRequirementOpen: boolean;
  foodVariantQuantities: Record<string, number>;
  setIsFoodRequirementOpen: (value: boolean) => void;
  setFoodVariantQuantities: (value: Record<string, number>) => void;
  onCheckout: () => void;
  onAddFoodToCart: () => void;
}

function CartComponent(): JSX.Element {
  const navigate = useNavigate();
  const query = useQuery();
  const { CartController, ExploreController, ProductController } =
    React.useContext(DIContext);
  const { inventoryLocations } = ExploreController.model;
  const { suspense, cartIds, requiredFoodProducts } = CartController.model;
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

  React.useEffect(() => {
    renderCountRef.current += 1;
    CartController.load(renderCountRef.current);
    return () => {
      CartController.disposeLoad(renderCountRef.current);
    };
  }, []);

  React.useEffect(() => {
    const tabProps: TabProps[] = [];
    for (const key in cartIds) {
      if (!key.startsWith('sloc_')) {
        continue;
      }

      const location = inventoryLocations.find((value) => value.id === key);
      const salesChannel = location?.salesChannels[0];
      tabProps.push({ id: key, label: salesChannel?.name });
    }

    setSalesChannelTabs(tabProps);
  }, [cartIds, inventoryLocations]);

  React.useEffect(() => {
    const quantities: Record<string, number> = {};
    for (const product of requiredFoodProducts) {
      for (const variant of product?.variants ?? []) {
        if (!variant?.id) {
          continue;
        }
        quantities[variant?.id] = 0;
      }
    }

    setFoodVariantQuantities(quantities);
  }, [requiredFoodProducts]);

  const suspenceComponent = (
    <>
      <CartSuspenseDesktopComponent />
      <CartSuspenseMobileComponent />
    </>
  );

  if (suspense) {
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
        <meta property="og:title" content={'Home | fuoco.appdev'} />
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
          salesChannelTabs={salesChannelTabs}
          foodVariantQuantities={foodVariantQuantities}
          setFoodVariantQuantities={setFoodVariantQuantities}
          isFoodRequirementOpen={isFoodRequirementOpen}
          setIsFoodRequirementOpen={setIsFoodRequirementOpen}
          onCheckout={onCheckout}
          onAddFoodToCart={onAddFoodToCart}
        />
        <CartMobileComponent
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

export default observer(CartComponent);
