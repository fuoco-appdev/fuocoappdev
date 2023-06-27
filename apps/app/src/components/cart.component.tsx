import { useEffect, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import CartController from '../controllers/cart.controller';
import styles from './cart.module.scss';
import { Button, Input, Line, Solid } from '@fuoco.appdev/core-ui';
import { RoutePaths } from '../route-paths';
import { useTranslation } from 'react-i18next';
import { useObservable } from '@ngneat/use-observable';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { LineItem, ProductVariant, Discount } from '@medusajs/medusa';
import CartItemComponent from './cart-item.component';
import StoreController from '../controllers/store.controller';
// @ts-ignore
import { formatAmount } from 'medusa-react';

function CartDesktopComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(CartController.model.store);

  return <></>;
}

function CartMobileComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(CartController.model.store);
  const [storeProps] = useObservable(StoreController.model.store);
  const { t, i18n } = useTranslation();

  return (
    <div className={styles['root-mobile']}>
      <div className={styles['account-container-mobile']}>
        <div className={styles['already-have-an-account-title-mobile']}>
          {t('alreadyHaveAnAccount')}
        </div>
        <div className={styles['already-have-an-account-description-mobile']}>
          {t('alreadyHaveAnAccountDescription')}
        </div>
        <div className={styles['sign-in-button-container']}>
          <Button
            classNames={{
              button: styles['sign-in-button'],
            }}
            rippleProps={{
              color: 'rgba(133, 38, 122, .35)',
            }}
            size={'large'}
            touchScreen={true}
            onClick={() => navigate(RoutePaths.Signin)}
          >
            {t('signIn')}
          </Button>
        </div>
      </div>
      <div className={styles['shopping-cart-container-mobile']}>
        <div className={styles['shopping-cart-title-mobile']}>
          {t('shoppingCart')}
        </div>
        <div className={styles['shopping-cart-items-mobile']}>
          {props.cart?.items
            .sort((current: LineItem, next: LineItem) => {
              return (
                new Date(current.created_at).valueOf() -
                new Date(next.created_at).valueOf()
              );
            })
            .map((item: LineItem) => (
              <CartItemComponent
                key={item.id}
                item={item}
                onQuantityChanged={(quantity) => {
                  console.log(quantity);
                  CartController.updateLineItemQuantityAsync(quantity, item);
                }}
                onRemove={() => CartController.removeLineItemAsync(item)}
              />
            ))}
        </div>
      </div>
      <div className={styles['pricing-container']}>
        <div className={styles['subtotal-container']}>
          <div className={styles['subtotal-text']}>{t('subtotal')}</div>
          <div className={styles['subtotal-text']}>
            {storeProps.selectedRegion &&
              formatAmount({
                amount: props.cart?.subtotal ?? 0,
                region: storeProps.selectedRegion,
                includeTaxes: false,
              })}
          </div>
        </div>
        <div className={styles['total-detail-container']}>
          <div className={styles['total-detail-text']}>{t('discount')}</div>
          <div className={styles['total-detail-text']}>
            {storeProps.selectedRegion &&
              formatAmount({
                amount: -props.cart?.discount_total ?? 0,
                region: storeProps.selectedRegion,
                includeTaxes: false,
              })}
          </div>
        </div>
        <div className={styles['total-detail-container']}>
          <div className={styles['total-detail-text']}>{t('shipping')}</div>
          <div className={styles['total-detail-text']}>
            {storeProps.selectedRegion &&
              formatAmount({
                amount: props.cart?.shipping_total ?? 0,
                region: storeProps.selectedRegion,
                includeTaxes: false,
              })}
          </div>
        </div>
        <div className={styles['total-detail-container']}>
          <div className={styles['total-detail-text']}>{t('taxes')}</div>
          <div className={styles['total-detail-text']}>
            {storeProps.selectedRegion &&
              formatAmount({
                amount: props.cart?.tax_total ?? 0,
                region: storeProps.selectedRegion,
                includeTaxes: false,
              })}
          </div>
        </div>
        <div className={styles['total-container']}>
          <div className={styles['total-text']}>{t('total')}</div>
          <div className={styles['total-text']}>
            {storeProps.selectedRegion &&
              formatAmount({
                amount: props.cart?.total ?? 0,
                region: storeProps.selectedRegion,
                includeTaxes: true,
              })}
          </div>
        </div>
      </div>
      <div className={styles['discount-container']}>
        <div className={styles['discount-input-container']}>
          <Input
            classNames={{
              formLayout: {
                label: styles['input-form-layout-label'],
              },
              input: styles['input'],
              container: styles['input-container'],
            }}
            label={t('discount') ?? ''}
            value={props.discountCode}
            onChange={(event) =>
              CartController.updateDiscountCodeText(event.target.value)
            }
          />
        </div>
        <div className={styles['apply-button-container']}>
          <Button
            size={'large'}
            classNames={{
              button: styles['apply-button'],
            }}
            rippleProps={{
              color: 'rgba(133, 38, 122, .35)',
            }}
            onClick={() => CartController.updateDiscountCodeAsync()}
          >
            {t('apply')}
          </Button>
        </div>
      </div>
      <div className={styles['discount-list-container']}>
        {props.cart?.discounts?.map((value: Discount) => {
          return (
            <div key={value.id} className={styles['discount-code-tag']}>
              <div className={styles['discount-code-tag-text']}>
                {value.code}
              </div>
              <div className={styles['discount-code-tag-button-container']}>
                <Button
                  classNames={{
                    button: styles['discount-code-tag-button'],
                  }}
                  onClick={() =>
                    CartController.removeDiscountCodeAsync(value.code)
                  }
                  rippleProps={{}}
                  touchScreen={true}
                  block={true}
                  rounded={true}
                  type={'primary'}
                  size={'tiny'}
                  icon={<Solid.Cancel size={14} />}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles['go-to-checkout-container']}>
        <Button
          classNames={{
            button: styles['checkout-button'],
          }}
          rippleProps={{
            color: 'rgba(233, 33, 66, .35)',
          }}
          block={true}
          disabled={!props.cart || props.cart?.items?.length <= 0}
          size={'large'}
          icon={<Line.ShoppingCart size={24} />}
          onClick={() => navigate(RoutePaths.Checkout)}
        >
          {t('goToCheckout')}
        </Button>
      </div>
    </div>
  );
}

export default function CartComponent(): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <CartDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <CartMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
