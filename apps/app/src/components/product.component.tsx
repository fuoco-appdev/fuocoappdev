import { useObservable } from '@ngneat/use-observable';
import ProductController from '../controllers/product.controller';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductOptions } from '../models/product.model';
import { ProductOptionValue, ProductOption } from '@medusajs/medusa';
import { PricedVariant } from '@medusajs/medusa/dist/types/pricing';
import { TabProps } from '@fuoco.appdev/core-ui/dist/cjs/src/components/tabs/tabs';
import StoreController from '../controllers/store.controller';
import { ProductDesktopComponent } from './desktop/product.desktop.component';
import { ProductMobileComponent } from './mobile/product.mobile.component';
import { Helmet } from 'react-helmet-async';

export interface ProductProps {}

export interface ProductResponsiveProps {
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

export default function ProductComponent(): JSX.Element {
  const [props] = useObservable(ProductController.model.store);
  const { id } = useParams();
  const [fullName, setFullName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [shortDescription, setShortDescription] = useState<string>('');
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

  const formatDescription = (description: string): string => {
    const regex = /\*\*(.*?)\*\*/g;
    const cleanDescription = description.trim();
    const descriptionWithoutTitles = cleanDescription.replace(regex, '');
    return descriptionWithoutTitles;
  };

  useEffect(() => {
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

  useEffect(() => {
    let name = props.title;
    if (props.subtitle.length > 0) {
      name += `, ${props.subtitle}`;
    }
    setFullName(name);
  }, [props.title, props.subtitle]);

  useEffect(() => {
    const formattedDescription = formatDescription(
      `${props.description?.slice(0, 205)}...`
    );
    setShortDescription(formattedDescription);
  }, [props.description]);

  return (
    <>
      <Helmet>
        <title>{fullName}</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={fullName} />
        <meta name="description" content={shortDescription} />
        <meta property="og:image" content={props.thumbnail} />
        <meta property="og:title" content={fullName} />
        <meta property="og:description" content={shortDescription} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Helmet>
      <ResponsiveDesktop>
        <ProductDesktopComponent
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
