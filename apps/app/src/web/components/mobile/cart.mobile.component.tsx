import { Button, Dropdown, Input, Line, Solid } from '@fuoco.appdev/core-ui';
import { Discount, LineItem } from '@medusajs/medusa';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import CartController from '../../../controllers/cart.controller';
import { RoutePathsType, useQuery } from '../../route-paths';
import CartItemComponent from '../cart-item.component';
import styles from '../cart.module.scss';
// @ts-ignore
import { StockLocation } from '@medusajs/stock-location/dist/models';
import { formatAmount } from 'medusa-react';
import ReactDOM from 'react-dom';
import ExploreController from '../../../controllers/explore.controller';
import { MedusaProductTypeNames } from '../../../types/medusa.type';
import CartVariantItemComponent from '../cart-variant-item.component';
import { CartResponsiveProps } from '../cart.component';
import { ResponsiveMobile } from '../responsive.component';
import StockLocationCartItemComponent from '../stock-location-cart-item.component';

export default function CartMobileComponent({
  cartProps,
  cartLocalProps,
  exploreProps,
  exploreLocalProps,
  storeProps,
  windowProps,
  salesChannelTabs,
  foodVariantQuantities,
  isFoodRequirementOpen,
  setIsFoodRequirementOpen,
  setFoodVariantQuantities,
  onCheckout,
  onAddFoodToCart,
}: CartResponsiveProps): JSX.Element {
  const navigate = useNavigate();
  const query = useQuery();
  const { t } = useTranslation();
  const [openCheckout, setOpenCheckout] = React.useState<boolean>(true);

  return (
    <ResponsiveMobile>
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
                onClick={() =>
                  navigate({
                    pathname: RoutePathsType.Signin,
                    search: query.toString(),
                  })
                }
              >
                {t('signIn')}
              </Button>
            </div>
          </div>
        )}
        <div
          className={[
            styles['shopping-carts-container'],
            styles['shopping-carts-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['shopping-cart-items-container'],
              styles['shopping-cart-items-container-mobile'],
            ].join(' ')}
          >
            {cartProps.stockLocations.map(
              (stockLocation: StockLocation, _index: number) => {
                const cartId = cartLocalProps.cartIds[stockLocation.id] ?? '';
                const cart = cartProps.carts[cartId];
                return (
                  <StockLocationCartItemComponent
                    key={stockLocation.id}
                    selected={
                      exploreLocalProps.selectedInventoryLocationId ===
                      stockLocation.id
                    }
                    stockLocation={stockLocation}
                    cart={cart}
                    onClick={() => {
                      ExploreController.updateSelectedInventoryLocationId(
                        stockLocation.id
                      );
                      setOpenCheckout(true);
                    }}
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
      {ReactDOM.createPortal(
        <>
          <Dropdown
            classNames={{
              touchscreenOverlay: styles['dropdown-touchscreen-overlay'],
            }}
            open={openCheckout}
            title={
              exploreProps?.selectedInventoryLocation?.company ?? undefined
            }
            touchScreen={true}
            onClose={() => setOpenCheckout(false)}
          >
            <div
              className={[
                styles['shopping-cart-container'],
                styles['shopping-cart-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['shopping-cart-items'],
                  styles['shopping-cart-items-mobile'],
                ].join(' ')}
              >
                {cartProps.cart?.items
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
                      storeProps={storeProps}
                      onQuantityChanged={(quantity) => {
                        CartController.updateLineItemQuantityAsync(
                          quantity,
                          item
                        );
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
                          setTimeout(
                            () =>
                              navigate({
                                pathname: RoutePathsType.Explore,
                                search: query.toString(),
                              }),
                            75
                          )
                        }
                      >
                        {t('explore')}
                      </Button>
                    </div>
                  </>
                )}
                {salesChannelTabs.length > 0 &&
                  (!cartProps.cart || cartProps.cart?.items.length <= 0) && (
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
                            setTimeout(
                              () =>
                                navigate({
                                  pathname: RoutePathsType.Store,
                                  search: query.toString(),
                                }),
                              75
                            )
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
                      amount: cartProps.cart?.subtotal ?? 0,
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
                      amount: -(cartProps.cart?.discount_total ?? 0),
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
                      amount: cartProps.cart?.shipping_total ?? 0,
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
                      amount: cartProps.cart?.tax_total ?? 0,
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
                  className={[
                    styles['total-text'],
                    styles['total-text-mobile'],
                  ].join(' ')}
                >
                  {t('total')}
                </div>
                <div
                  className={[
                    styles['total-text'],
                    styles['total-text-mobile'],
                  ].join(' ')}
                >
                  {storeProps.selectedRegion &&
                    formatAmount({
                      amount: cartProps.cart?.total ?? 0,
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
                  value={cartProps.discountCode}
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
              {cartProps.cart?.discounts?.map((value: Discount) => {
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
                touchScreen={true}
                classNames={{
                  button: styles['checkout-button'],
                }}
                rippleProps={{
                  color: 'rgba(233, 33, 66, .35)',
                }}
                block={true}
                disabled={!cartProps.cart || cartProps.cart?.items?.length <= 0}
                size={'large'}
                icon={<Line.ShoppingCart size={24} />}
                onClick={() => {
                  setOpenCheckout(false);
                  setTimeout(() => onCheckout(), 150);
                }}
              >
                {t('goToCheckout')}
              </Button>
            </div>
          </Dropdown>
          <Dropdown
            classNames={{
              touchscreenOverlay: styles['dropdown-touchscreen-overlay'],
            }}
            open={isFoodRequirementOpen}
            touchScreen={true}
            onClose={() => setIsFoodRequirementOpen(false)}
          >
            <div
              className={[
                styles['dropdown-title'],
                styles['dropdown-title-mobile'],
              ].join(' ')}
            >
              {t('foodRequirement') ?? ''}
            </div>
            <div
              className={[
                styles['dropdown-description'],
                styles['dropdown-description-mobile'],
              ].join(' ')}
            >
              {t('foodRequirementDescription', {
                region: exploreProps?.selectedInventoryLocation?.region,
              }) ?? ''}
            </div>
            <div
              className={[
                styles['add-variants-container'],
                styles['add-variants-container-mobile'],
              ].join(' ')}
            >
              {cartProps.requiredFoodProducts.map((product) => {
                return product?.variants.map((variant) => {
                  return (
                    <CartVariantItemComponent
                      productType={MedusaProductTypeNames.RequiredFood}
                      key={variant.id}
                      product={product}
                      variant={variant}
                      storeProps={storeProps}
                      variantQuantities={foodVariantQuantities}
                      setVariantQuantities={setFoodVariantQuantities}
                    />
                  );
                });
              })}
              <Button
                classNames={{
                  container: [
                    styles['add-to-cart-button-container'],
                    styles['add-to-cart-button-container-mobile'],
                  ].join(' '),
                  button: [
                    styles['add-to-cart-button'],
                    styles['add-to-cart-button-mobile'],
                  ].join(' '),
                }}
                block={true}
                size={'full'}
                rippleProps={{
                  color: 'rgba(233, 33, 66, .35)',
                }}
                icon={<Line.AddShoppingCart size={24} />}
                disabled={
                  Object.values(foodVariantQuantities).reduce(
                    (current, next) => {
                      return current + next;
                    },
                    0
                  ) <= 0
                }
                onClick={onAddFoodToCart}
              >
                {t('addToCart')}
              </Button>
            </div>
          </Dropdown>
        </>,
        document.body
      )}
    </ResponsiveMobile>
  );
}
