import {
  Key,
  LegacyRef,
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styles from './product-preview.module.scss';
import { MoneyAmount, Product, LineItem } from '@medusajs/medusa';
import {
  PricedProduct,
  PricedVariant,
} from '@medusajs/medusa/dist/types/pricing';
import { Button, Card, Line } from '@fuoco.appdev/core-ui';
import { animated, useSpring } from 'react-spring';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import i18n from '../i18n';
import ProductController from '../controllers/product.controller';
import StoreController from '../controllers/store.controller';
import { useObservable } from '@ngneat/use-observable';
import WindowController from '../controllers/window.controller';
import { useTranslation } from 'react-i18next';
import CartController from '../controllers/cart.controller';
// @ts-ignore
import { formatAmount } from 'medusa-react';
import { ProductPreviewDesktopComponent } from './desktop/product-preview.desktop.component';
import { ProductPreviewMobileComponent } from './mobile/product-preview.mobile.component';
import { StoreState } from '../models/store.model';

export interface ProductPreviewProps {
  storeProps: StoreState;
  parentRef: MutableRefObject<HTMLDivElement | null>;
  preview: PricedProduct;
  onClick?: () => void;
  onRest?: () => void;
}

export interface ProductPreviewResponsiveProps extends ProductPreviewProps {
  price: string;
  selectedVariantId: string | undefined;
  setPrice: (value: string) => void;
  setSelectedVariantId: (value: string | undefined) => void;
  formatPrice: (price: MoneyAmount) => string;
  addToCartAsync: () => void;
}

export default function ProductPreviewComponent({
  storeProps,
  parentRef,
  preview,
  onClick,
  onRest,
}: ProductPreviewProps): JSX.Element {
  const [price, setPrice] = useState<string>('');
  const [addedToCartCount, setAddedToCartCount] = useState<number>(0);
  const [selectedVariantId, setSelectedVariantId] = useState<
    string | undefined
  >(undefined);
  const { t } = useTranslation();

  const formatPrice = (price: MoneyAmount): string => {
    if (!price.amount) {
      return 'null';
    }

    let value = price.amount.toString();
    let charList = value.split('');
    charList.splice(-2, 0, '.');
    value = charList.join('');

    return new Intl.NumberFormat(i18n.language, {
      style: 'currency',
      currency: price.currency_code,
    }).format(Number(value));
  };

  useEffect(() => {
    const purchasableVariants = preview.variants.filter(
      (value) => value.purchasable === true
    );

    if (purchasableVariants.length > 0) {
      const cheapestVariant =
        ProductController.getCheapestPrice(purchasableVariants);
      if (cheapestVariant && storeProps.selectedRegion) {
        setSelectedVariantId(cheapestVariant.id);
        setPrice(
          formatAmount({
            amount: cheapestVariant.calculated_price ?? 0,
            region: storeProps.selectedRegion,
            includeTaxes: false,
          })
        );
      }
    } else {
      setSelectedVariantId(undefined);
      setPrice('');
    }
  }, [preview, addedToCartCount, storeProps.selectedRegion]);

  const addToCartAsync = async () => {
    if (!selectedVariantId) {
      return;
    }

    ProductController.addToCartAsync(selectedVariantId, 1, () => {
      WindowController.addToast({
        key: `add-to-cart-${Math.random()}`,
        message: t('addedToCart') ?? '',
        description:
          t('addedToCartDescription', {
            item: preview.title,
          }) ?? '',
        type: 'success',
      });
      setAddedToCartCount(addedToCartCount + 1);
    });
  };

  return (
    <>
      <ResponsiveDesktop inheritStyles={false}>
        <ProductPreviewDesktopComponent
          storeProps={storeProps}
          parentRef={parentRef}
          preview={preview}
          onClick={onClick}
          onRest={onRest}
          price={price}
          selectedVariantId={selectedVariantId}
          setPrice={setPrice}
          setSelectedVariantId={setSelectedVariantId}
          formatPrice={formatPrice}
          addToCartAsync={addToCartAsync}
        />
      </ResponsiveDesktop>
      <ResponsiveMobile inheritStyles={false}>
        <ProductPreviewMobileComponent
          storeProps={storeProps}
          parentRef={parentRef}
          preview={preview}
          onClick={onClick}
          onRest={onRest}
          price={price}
          selectedVariantId={selectedVariantId}
          setPrice={setPrice}
          setSelectedVariantId={setSelectedVariantId}
          formatPrice={formatPrice}
          addToCartAsync={addToCartAsync}
        />
      </ResponsiveMobile>
    </>
  );
}
