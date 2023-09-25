import { useEffect, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import CartController from '../../controllers/cart.controller';
import styles from '../cart.module.scss';
import { Button, Input, Line, Solid, Tabs } from '@fuoco.appdev/core-ui';
import { RoutePathsType } from '../../route-paths';
import { useTranslation } from 'react-i18next';
import { useObservable } from '@ngneat/use-observable';
import { LineItem, ProductVariant, Discount, Cart } from '@medusajs/medusa';
import CartItemComponent from '../cart-item.component';
import StoreController from '../../controllers/store.controller';
// @ts-ignore
import { formatAmount } from 'medusa-react';
import WindowController from '../../controllers/window.controller';
import { CartResponsiveProps } from '../cart.component';
import HomeController from '../../controllers/home.controller';
import { Store } from '@ngneat/elf';

export function CartMobileComponent({
  salesChannelTabs,
}: CartResponsiveProps): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(CartController.model.store);
  const [storeProps] = useObservable(StoreController.model.store);
  const [windowProps] = useObservable(WindowController.model.store);
  const [homeLocalProps] = useObservable(
    HomeController.model.localStore ?? Store.prototype
  );
  const { t, i18n } = useTranslation();

  return (
    <div className={[styles['root'], styles['root-mobile']].join(' ')}>
      {!windowProps.isAuthenticated && (
        <div
          className={[
            styles['account-container'],
            styles['account-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['already-have-an-account-title'],
              styles['already-have-an-account-title-mobile'],
            ].join(' ')}
          >
            {t('alreadyHaveAnAccount')}
          </div>
          <div
            className={[
              styles['already-have-an-account-description'],
              styles['already-have-an-account-description-mobile'],
            ].join(' ')}
          >
            {t('alreadyHaveAnAccountDescription')}
          </div>
          <div
            className={[
              styles['sign-in-button-container'],
              styles['sign-in-button-container-mobile'],
            ].join(' ')}
          >
            <Button
              classNames={{
                button: styles['outline-button'],
              }}
              rippleProps={{
                color: 'rgba(133, 38, 122, .35)',
              }}
              size={'large'}
              touchScreen={true}
              onClick={() => navigate(RoutePathsType.Signin)}
            >
              {t('signIn')}
            </Button>
          </div>
        </div>
      )}
      <div
        className={[
          styles['shopping-cart-container'],
          styles['shopping-cart-container-mobile'],
        ].join(' ')}
      >
        <div
          className={[
            styles['shopping-cart-title'],
            styles['shopping-cart-title-mobile'],
          ].join(' ')}
        >
          {t('shoppingCart')}
        </div>
        <div
          className={[
            styles['shopping-cart-items'],
            styles['shopping-cart-items-mobile'],
          ].join(' ')}
        >
          {salesChannelTabs.length > 0 && (
            <div
              className={[
                styles['tab-container'],
                styles['tab-container-mobile'],
              ].join(' ')}
            >
              <Tabs
                flex={true}
                touchScreen={true}
                classNames={{
                  nav: styles['tab-nav'],
                  tabButton: styles['tab-button'],
                  selectedTabButton: styles['selected-tab-button'],
                  tabSliderPill: styles['tab-slider-pill'],
                }}
                type={'pills'}
                activeId={homeLocalProps.selectedInventoryLocationId}
                onChange={(id: string) =>
                  HomeController.updateSelectedInventoryLocationId(id)
                }
                tabs={salesChannelTabs}
              />
            </div>
          )}
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
                  CartController.updateLineItemQuantityAsync(quantity, item);
                }}
                onRemove={() => CartController.removeLineItemAsync(item)}
              />
            ))}
          {salesChannelTabs.length <= 0 && (
            <>
              <div
                className={[
                  styles['no-items-text'],
                  styles['no-items-text-mobile'],
                ].join(' ')}
              >
                {t('chooseASalesChannel')}
              </div>
              <div
                className={[
                  styles['no-items-container'],
                  styles['no-items-container-mobile'],
                ].join(' ')}
              >
                <Button
                  classNames={{
                    button: styles['outline-button'],
                  }}
                  rippleProps={{
                    color: 'rgba(133, 38, 122, .35)',
                  }}
                  size={'large'}
                  touchScreen={true}
                  onClick={() =>
                    setTimeout(() => navigate(RoutePathsType.Home), 150)
                  }
                >
                  {t('home')}
                </Button>
              </div>
            </>
          )}
          {salesChannelTabs.length > 0 &&
            (!props.cart || props.cart?.items.length <= 0) && (
              <>
                <div
                  className={[
                    styles['no-items-text'],
                    styles['no-items-text-mobile'],
                  ].join(' ')}
                >
                  {t('noCartItems')}
                </div>
                <div
                  className={[
                    styles['no-items-container'],
                    styles['no-items-container-mobile'],
                  ].join(' ')}
                >
                  <Button
                    classNames={{
                      button: styles['outline-button'],
                    }}
                    rippleProps={{
                      color: 'rgba(133, 38, 122, .35)',
                    }}
                    size={'large'}
                    touchScreen={true}
                    onClick={() =>
                      setTimeout(() => navigate(RoutePathsType.Store), 150)
                    }
                  >
                    {t('shopNow')}
                  </Button>
                </div>
              </>
            )}
        </div>
      </div>
      <div
        className={[
          styles['pricing-container'],
          styles['pricing-container-mobile'],
        ].join(' ')}
      >
        <div
          className={[
            styles['subtotal-container'],
            styles['subtotal-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['subtotal-text'],
              styles['subtotal-text-mobile'],
            ].join(' ')}
          >
            {t('subtotal')}
          </div>
          <div
            className={[
              styles['subtotal-text'],
              styles['subtotal-text-mobile'],
            ].join(' ')}
          >
            {storeProps.selectedRegion &&
              formatAmount({
                amount: props.cart?.subtotal ?? 0,
                region: storeProps.selectedRegion,
                includeTaxes: false,
              })}
          </div>
        </div>
        <div
          className={[
            styles['total-detail-container'],
            styles['total-detail-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['total-detail-text'],
              styles['total-detail-text-mobile'],
            ].join(' ')}
          >
            {t('discount')}
          </div>
          <div
            className={[
              styles['total-detail-text'],
              styles['total-detail-text-mobile'],
            ].join(' ')}
          >
            {storeProps.selectedRegion &&
              formatAmount({
                amount: -props.cart?.discount_total ?? 0,
                region: storeProps.selectedRegion,
                includeTaxes: false,
              })}
          </div>
        </div>
        <div
          className={[
            styles['total-detail-container'],
            styles['total-detail-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['total-detail-text'],
              styles['total-detail-text-mobile'],
            ].join(' ')}
          >
            {t('shipping')}
          </div>
          <div
            className={[
              styles['total-detail-text'],
              styles['total-detail-text-mobile'],
            ].join(' ')}
          >
            {storeProps.selectedRegion &&
              formatAmount({
                amount: props.cart?.shipping_total ?? 0,
                region: storeProps.selectedRegion,
                includeTaxes: false,
              })}
          </div>
        </div>
        <div
          className={[
            styles['total-detail-container'],
            styles['total-detail-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['total-detail-text'],
              styles['total-detail-text-mobile'],
            ].join(' ')}
          >
            {t('taxes')}
          </div>
          <div
            className={[
              styles['total-detail-text'],
              styles['total-detail-text-mobile'],
            ].join(' ')}
          >
            {storeProps.selectedRegion &&
              formatAmount({
                amount: props.cart?.tax_total ?? 0,
                region: storeProps.selectedRegion,
                includeTaxes: false,
              })}
          </div>
        </div>
        <div
          className={[
            styles['total-container'],
            styles['total-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[styles['total-text'], styles['total-text-mobile']].join(
              ' '
            )}
          >
            {t('total')}
          </div>
          <div
            className={[styles['total-text'], styles['total-text-mobile']].join(
              ' '
            )}
          >
            {storeProps.selectedRegion &&
              formatAmount({
                amount: props.cart?.total ?? 0,
                region: storeProps.selectedRegion,
                includeTaxes: true,
              })}
          </div>
        </div>
      </div>
      <div
        className={[
          styles['discount-container'],
          styles['discount-container-mobile'],
        ].join(' ')}
      >
        <div
          className={[
            styles['discount-input-container'],
            styles['discount-input-container-mobile'],
          ].join(' ')}
        >
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
        <div
          className={[
            styles['apply-button-container'],
            styles['apply-button-container-mobile'],
          ].join(' ')}
        >
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
      <div
        className={[
          styles['discount-list-container'],
          styles['discount-list-container-mobile'],
        ].join(' ')}
      >
        {props.cart?.discounts?.map((value: Discount) => {
          return (
            <div
              key={value.id}
              className={[
                styles['discount-code-tag'],
                styles['discount-code-tag-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['discount-code-tag-text'],
                  styles['discount-code-tag-text-mobile'],
                ].join(' ')}
              >
                {value.code}
              </div>
              <div
                className={[
                  styles['discount-code-tag-button-container'],
                  styles['discount-code-tag-button-container-mobile'],
                ].join(' ')}
              >
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
      <div
        className={[
          styles['go-to-checkout-container'],
          styles['go-to-checkout-container-mobile'],
        ].join(' ')}
      >
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
          onClick={() =>
            setTimeout(() => navigate(RoutePathsType.Checkout), 150)
          }
        >
          {t('goToCheckout')}
        </Button>
      </div>
    </div>
  );
}
