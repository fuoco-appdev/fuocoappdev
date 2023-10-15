import { useObservable } from '@ngneat/use-observable';
import ProductController from '../controllers/product.controller';
import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';
import { Suspense, useEffect, useRef, useState } from 'react';
import { RouteObject, useParams } from 'react-router-dom';
import { ProductOptions, ProductState } from '../models/product.model';
import { ProductOptionValue, ProductOption } from '@medusajs/medusa';
import {
  PricedProduct,
  PricedVariant,
} from '@medusajs/medusa/dist/types/pricing';
import { TabProps } from '@fuoco.appdev/core-ui/dist/cjs/src/components/tabs/tabs';
import { Helmet } from 'react-helmet';
import MedusaService from '../services/medusa.service';
import StoreController from '../controllers/store.controller';
import { StoreState } from '../models/store.model';
import { lazy } from '@loadable/component';
import { timeout } from 'promise-timeout';
import React from 'react';
import { ProductSuspenseDesktopComponent } from './desktop/suspense/product.suspense.desktop.component';
import { ProductSuspenseMobileComponent } from './mobile/suspense/product.suspense.mobile.component';

const ProductDesktopComponent = lazy(() =>
  timeout(import('./desktop/product.desktop.component'), 150)
);
const ProductMobileComponent = lazy(() =>
  timeout(import('./mobile/product.mobile.component'), 150)
);

export interface ProductProps {
  product?: PricedProduct | undefined;
}

export interface ProductResponsiveProps {
  productProps: ProductState;
  storeProps: StoreState;
  remarkPlugins: any[];
  description: string;
  tabs: TabProps[];
  activeVariantId: string | undefined;
  activeDetails: string | undefined;
  alcohol: string | undefined;
  brand: string | undefined;
  varietals: string | undefined;
  producerBottler: string | undefined;
  format: string | undefined;
  region: string | undefined;
  residualSugar: string | undefined;
  type: string | undefined;
  uvc: string | undefined;
  vintage: string | undefined;
  quantity: number;
  setActiveDetails: (value: string | undefined) => void;
  setDescription: (value: string) => void;
  setQuantity: (value: number) => void;
}

function ProductComponent({ product }: ProductProps): JSX.Element {
  const [productProps] = useObservable(ProductController.model.store);
  const [storeProps] = useObservable(StoreController.model.store);
  const { id } = useParams();
  const [description, setDescription] = useState<string>('');
  const [tabs, setTabs] = useState<TabProps[]>([]);
  const [activeVariantId, setActiveVariantId] = useState<string | undefined>();
  const [activeDetails, setActiveDetails] = useState<string | undefined>(
    'information'
  );
  const [alcohol, setAlcohol] = useState<string | undefined>('');
  const [brand, setBrand] = useState<string | undefined>('');
  const [varietals, setVarietals] = useState<string | undefined>('');
  const [producerBottler, setProducerBottler] = useState<string | undefined>(
    ''
  );
  const [format, setFormat] = useState<string | undefined>('');
  const [region, setRegion] = useState<string | undefined>('');
  const [residualSugar, setResidualSugar] = useState<string | undefined>('');
  const [type, setType] = useState<string | undefined>('');
  const [uvc, setUVC] = useState<string | undefined>('');
  const [vintage, setVintage] = useState<string | undefined>('');
  const [remarkPlugins, setRemarkPlugins] = useState<any[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  const formatName = (title: string, subtitle?: string | null) => {
    let name = productProps.title;
    if (subtitle && subtitle?.length > 0) {
      name += `, ${productProps.subtitle}`;
    }
    return name;
  };

  const formatDescription = (description: string): string => {
    const regex = /\*\*(.*?)\*\*/g;
    const cleanDescription = description.trim();
    const descriptionWithoutTitles = cleanDescription.replace(regex, '');
    return descriptionWithoutTitles.trim();
  };

  const [fullName, setFullName] = useState<string>(
    formatName(product?.title ?? '', product?.subtitle) ?? ''
  );
  const [shortDescription, setShortDescription] = useState<string>(
    formatDescription(`${productProps.description?.slice(0, 205)}...`)
  );

  useEffect(() => {
    const formattedName = formatName(productProps.title, productProps.subtitle);
    setFullName(formattedName);
  }, [productProps.title, productProps.subtitle]);

  useEffect(() => {
    const formattedDescription = formatDescription(
      `${productProps.description?.slice(0, 205)}...`
    );
    setShortDescription(formattedDescription);
  }, [productProps.description]);

  useEffect(() => {
    import('remark-gfm').then((plugin) => {
      setRemarkPlugins([plugin.default]);
    });

    ProductController.updateProductId(id);
  }, []);

  useEffect(() => {
    let tabProps: TabProps[] = [];
    const vintageOption = productProps.options.find(
      (value: ProductOption) => value.title === ProductOptions.Vintage
    );
    if (vintageOption) {
      for (const variant of vintageOption.values) {
        tabProps.push({ id: variant.variant_id, label: variant.value });
      }
      tabProps = tabProps.sort((n1, n2) => {
        if (n1.label && n2.label) {
          return n1.label > n2.label ? 1 : -1;
        }

        return 1;
      });
      setTabs(tabProps);
    }
  }, [productProps.options]);

  useEffect(() => {
    setActiveVariantId(productProps.selectedVariant?.id);
  }, [productProps.selectedVariant]);

  useEffect(() => {
    const alcoholOption = ProductController.model.options.find(
      (value) => value.title === ProductOptions.Alcohol
    );
    const formatOption = ProductController.model.options.find(
      (value) => value.title === ProductOptions.Format
    );
    const residualSugarOption = ProductController.model.options.find(
      (value) => value.title === ProductOptions.ResidualSugar
    );
    const uvcOption = ProductController.model.options.find(
      (value) => value.title === ProductOptions.UVC
    );
    const vintageOption = ProductController.model.options.find(
      (value) => value.title === ProductOptions.Vintage
    );

    if (productProps.selectedVariant?.options) {
      const variant = productProps.selectedVariant as PricedVariant;
      const alcoholValue = variant.options?.find(
        (value: ProductOptionValue) => value.option_id === alcoholOption?.id
      );
      const formatValue = variant.options?.find(
        (value: ProductOptionValue) => value.option_id === formatOption?.id
      );
      const residualSugarValue = variant.options?.find(
        (value: ProductOptionValue) =>
          value.option_id === residualSugarOption?.id
      );
      const uvcValue = variant.options?.find(
        (value: ProductOptionValue) => value.option_id === uvcOption?.id
      );
      const vintageValue = variant.options?.find(
        (value: ProductOptionValue) => value.option_id === vintageOption?.id
      );

      setBrand(productProps.metadata?.['brand'] as string);
      setRegion(productProps.metadata?.['region'] as string);
      setVarietals(productProps.metadata?.['varietals'] as string);
      setProducerBottler(productProps.metadata?.['producer_bottler'] as string);
      setType(productProps.metadata?.['type'] as string);
      setAlcohol(alcoholValue?.value);
      setFormat(formatValue?.value);
      setResidualSugar(residualSugarValue?.value);
      setUVC(uvcValue?.value);
      setVintage(vintageValue?.value);
    }
  }, [productProps.selectedVariant, productProps.metadata]);

  const suspenceComponent = (
    <>
      <ProductSuspenseDesktopComponent />
      <ProductSuspenseMobileComponent />
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <>
      <Helmet>
        <title>
          {fullName.length > 0 ? `${fullName} | Cruthology` : 'Cruthology'}
        </title>
        <link rel="canonical" href={window.location.href} />
        <meta
          name="title"
          content={
            fullName.length > 0 ? `${fullName} | Cruthology` : 'Cruthology'
          }
        />
        <meta name="description" content={shortDescription} />
        <meta property="og:image" content={productProps.thumbnail} />
        <meta property="og:image:secure_url" content={productProps.thumbnail} />
        <meta
          property="og:title"
          content={
            fullName.length > 0 ? `${fullName} | Cruthology` : 'Cruthology'
          }
        />
        <meta property="og:description" content={shortDescription} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta
          property="twitter:title"
          content={
            fullName.length > 0 ? `${fullName} | Cruthology` : 'Cruthology'
          }
        />
        <meta property="twitter:image" content={productProps.thumbnail} />
        <meta property="twitter:description" content={shortDescription} />
      </Helmet>
      <React.Suspense fallback={suspenceComponent}>
        <ProductDesktopComponent
          productProps={productProps}
          storeProps={storeProps}
          remarkPlugins={remarkPlugins}
          description={description}
          tabs={tabs}
          activeVariantId={activeVariantId}
          activeDetails={activeDetails}
          alcohol={alcohol}
          brand={brand}
          varietals={varietals}
          producerBottler={producerBottler}
          format={format}
          region={region}
          residualSugar={residualSugar}
          type={type}
          uvc={uvc}
          vintage={vintage}
          quantity={quantity}
          setActiveDetails={setActiveDetails}
          setDescription={setDescription}
          setQuantity={setQuantity}
        />
        <ProductMobileComponent
          productProps={productProps}
          storeProps={storeProps}
          remarkPlugins={remarkPlugins}
          description={description}
          tabs={tabs}
          activeVariantId={activeVariantId}
          activeDetails={activeDetails}
          alcohol={alcohol}
          brand={brand}
          varietals={varietals}
          producerBottler={producerBottler}
          format={format}
          region={region}
          residualSugar={residualSugar}
          type={type}
          uvc={uvc}
          vintage={vintage}
          quantity={quantity}
          setActiveDetails={setActiveDetails}
          setDescription={setDescription}
          setQuantity={setQuantity}
        />
      </React.Suspense>
    </>
  );
}

ProductComponent.getServerSidePropsAsync = async (
  route: RouteObject,
  request: Request,
  result: Response
): Promise<ProductProps> => {
  const id = request.url.split('/').at(-1) ?? '';
  const product = await MedusaService.requestProductAsync(id);
  ProductController.updateDetails(product);
  return Promise.resolve({
    product: product,
  });
};

export default ProductComponent;
