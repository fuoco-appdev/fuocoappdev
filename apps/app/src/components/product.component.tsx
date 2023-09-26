import { useObservable } from '@ngneat/use-observable';
import ProductController from '../controllers/product.controller';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { Suspense, useEffect, useRef, useState } from 'react';
import { RouteObject, useParams } from 'react-router-dom';
import { ProductOptions } from '../models/product.model';
import { ProductOptionValue, ProductOption } from '@medusajs/medusa';
import {
  PricedProduct,
  PricedVariant,
} from '@medusajs/medusa/dist/types/pricing';
import { TabProps } from '@fuoco.appdev/core-ui/dist/cjs/src/components/tabs/tabs';
import { ProductDesktopComponent } from './desktop/product.desktop.component';
import { ProductMobileComponent } from './mobile/product.mobile.component';
import { Helmet } from 'react-helmet';
import MedusaService from '../services/medusa.service';

// let product: PricedProduct | undefined = undefined;
//   if (!StoreController.model.selectedPreview) {
//     const id = window.location.pathname.split('/').at(-1) ?? '';
//     product = await MedusaService.requestProductAsync(id);
//     console.log(product);
//   }
//   const component = await import(
//     './loadable/product-headers.loadable.component'
//   );
//   return () => <component.default product={product} />;

export interface ProductProps {
  product?: PricedProduct | undefined;
}

export interface ProductResponsiveProps {
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
  setActiveDetails: (value: string | undefined) => void;
  setDescription: (value: string) => void;
}

function ProductComponent({ product }: ProductProps): JSX.Element {
  const [props] = useObservable(ProductController.model.store);
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

  const formatName = (title: string, subtitle?: string | null) => {
    let name = props.title;
    if (subtitle && subtitle?.length > 0) {
      name += `, ${props.subtitle}`;
    }
    return name;
  };

  const formatDescription = (description: string): string => {
    const regex = /\*\*(.*?)\*\*/g;
    const cleanDescription = description.trim();
    const descriptionWithoutTitles = cleanDescription.replace(regex, '');
    return descriptionWithoutTitles.replace(/\s/g, '');
  };

  const [fullName, setFullName] = useState<string>(
    formatName(product?.title ?? '', product?.subtitle) ?? ''
  );
  const [shortDescription, setShortDescription] = useState<string>(
    formatDescription(`${props.description?.slice(0, 205)}...`)
  );

  useEffect(() => {
    const formattedName = formatName(props.title, props.subtitle);
    setFullName(formattedName);
  }, [props.title, props.subtitle]);

  useEffect(() => {
    const formattedDescription = formatDescription(
      `${props.description?.slice(0, 205)}...`
    );
    setShortDescription(formattedDescription);
  }, [props.description]);

  useEffect(() => {
    import('remark-gfm').then((plugin) => {
      setRemarkPlugins([plugin.default]);
    });

    ProductController.updateProductId(id);
  }, []);

  useEffect(() => {
    let tabProps: TabProps[] = [];
    const vintageOption = props.options.find(
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
  }, [props.options]);

  useEffect(() => {
    setActiveVariantId(props.selectedVariant?.id);
  }, [props.selectedVariant]);

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

    if (props.selectedVariant?.options) {
      const variant = props.selectedVariant as PricedVariant;
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

      setBrand(props.metadata?.['brand'] as string);
      setRegion(props.metadata?.['region'] as string);
      setVarietals(props.metadata?.['varietals'] as string);
      setProducerBottler(props.metadata?.['producer_bottler'] as string);
      setType(props.metadata?.['type'] as string);
      setAlcohol(alcoholValue?.value);
      setFormat(formatValue?.value);
      setResidualSugar(residualSugarValue?.value);
      setUVC(uvcValue?.value);
      setVintage(vintageValue?.value);
    }
  }, [props.selectedVariant, props.metadata]);

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
        <meta property="og:image" content={props.thumbnail} />
        <meta property="og:image:secure_url" content={props.thumbnail} />
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
        <meta property="twitter:description" content={shortDescription} />
      </Helmet>
      <ResponsiveDesktop>
        <ProductDesktopComponent
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
          setActiveDetails={setActiveDetails}
          setDescription={setDescription}
        />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <ProductMobileComponent
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
          setActiveDetails={setActiveDetails}
          setDescription={setDescription}
        />
      </ResponsiveMobile>
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
