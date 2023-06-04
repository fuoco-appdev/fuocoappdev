import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { LineItem, ProductOptionValue } from '@medusajs/medusa';
import styles from './cart-item.module.scss';
import { useEffect, useState } from 'react';
import { ProductOptions } from '../models/product.model';
import { useTranslation } from 'react-i18next';
import { Button, Line } from '@fuoco.appdev/core-ui';

export interface CartItemProps {
  item: LineItem;
}

function CartItemDesktopComponent({ item }: CartItemProps): JSX.Element {
  return <></>;
}

function CartItemMobileComponent({ item }: CartItemProps): JSX.Element {
  const [vintage, setVintage] = useState<string>('');
  const { t } = useTranslation();

  useEffect(() => {
    const vintageOption = item.variant.product.options.find(
      (value) => value.title === ProductOptions.Vintage
    );
    const vintageValue = item.variant.options?.find(
      (value: ProductOptionValue) => value.option_id === vintageOption?.id
    );
    setVintage(vintageValue?.value ?? '');
  }, [item]);

  return (
    <div key={item.variant_id} className={styles['container-mobile']}>
      <div className={styles['details-mobile']}>
        <div className={styles['thumbnail-mobile']}>
          <img
            className={styles['thumbnail-image-mobile']}
            src={item.thumbnail || '../assets/svg/wine-bottle.svg'}
          />
        </div>
        <div className={styles['title-container-mobile']}>
          <div className={styles['title-mobile']}>{item.title}</div>
          <div className={styles['variant-mobile']}>{`${t(
            'vintage'
          )}: ${vintage}`}</div>
        </div>
        <div className={styles['pricing-details-container-mobile']}>
          <div className={styles['quantity-container-mobile']}>
            <div className={styles['quantity-text-mobile']}>
              {t('quantity')}
            </div>
            <div className={styles['quantity-buttons-mobile']}>
              <Button
                block={true}
                classNames={{
                  button: styles['quantity-button'],
                }}
                type={'text'}
                rounded={true}
                size={'tiny'}
                icon={<Line.Remove size={18} />}
              />
              <div className={styles['quantity']}>{item.quantity}</div>
              <Button
                block={true}
                classNames={{
                  button: styles['quantity-button'],
                }}
                type={'text'}
                rounded={true}
                size={'tiny'}
                icon={<Line.Add size={18} />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CartItemComponent(props: CartItemProps): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <CartItemDesktopComponent {...props} />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <CartItemMobileComponent {...props} />
      </ResponsiveMobile>
    </>
  );
}
