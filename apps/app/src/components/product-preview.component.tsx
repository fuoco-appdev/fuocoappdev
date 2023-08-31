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

export interface ProductPreviewProps {
  parentRef: MutableRefObject<HTMLDivElement | null>;
  preview: Product;
  onClick?: () => void;
  onRest?: () => void;
}

export interface ProductPreviewResponsiveProps extends ProductPreviewProps {
  price: string;
  addedToCartCount: number;
  selectedVariantId: string | undefined;
  setPrice: (value: string) => void;
  setAddedToCartCount: (value: number) => void;
  setSelectedVariantId: (value: string | undefined) => void;
  formatPrice: (price: MoneyAmount) => string;
}

export default function ProductPreviewComponent({
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
  const [storeProps] = useObservable(StoreController.model.store);

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
    const variantPrices: MoneyAmount[] = [];
    const purchasableVariants = preview.variants.filter(
      (value) => value.purchasable === true
    );
    for (const variant of purchasableVariants) {
      if (!storeProps.selectedRegion) {
        continue;
      }

      const selectedCurrencyPrices = ProductController.getPricesByRegion(
        storeProps.selectedRegion,
        variant
      );

      if (!selectedCurrencyPrices || selectedCurrencyPrices.length <= 0) {
        continue;
      }

      const availablePrices = ProductController.getAvailablePrices(
        selectedCurrencyPrices,
        variant
      );
      if (!availablePrices || availablePrices.length <= 0) {
        continue;
      }

      const cheapestPrice = ProductController.getCheapestPrice(availablePrices);
      if (!cheapestPrice) {
        continue;
      }

      variantPrices.push(cheapestPrice);
    }

    if (variantPrices.length > 0) {
      const cheapestVariantPrice =
        ProductController.getCheapestPrice(variantPrices);
      if (cheapestVariantPrice) {
        setSelectedVariantId(cheapestVariantPrice.variant_id);
        setPrice(
          formatAmount({
            amount: cheapestVariantPrice.amount ?? 0,
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

  return (
    <>
      <ResponsiveDesktop>
        <ProductPreviewDesktopComponent
          parentRef={parentRef}
          preview={preview}
          onClick={onClick}
          onRest={onRest}
          price={price}
          addedToCartCount={addedToCartCount}
          selectedVariantId={selectedVariantId}
          setPrice={setPrice}
          setAddedToCartCount={setAddedToCartCount}
          setSelectedVariantId={setSelectedVariantId}
          formatPrice={formatPrice}
        />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <ProductPreviewMobileComponent
          parentRef={parentRef}
          preview={preview}
          onClick={onClick}
          onRest={onRest}
          price={price}
          addedToCartCount={addedToCartCount}
          selectedVariantId={selectedVariantId}
          setPrice={setPrice}
          setAddedToCartCount={setAddedToCartCount}
          setSelectedVariantId={setSelectedVariantId}
          formatPrice={formatPrice}
        />
      </ResponsiveMobile>
    </>
  );
}
