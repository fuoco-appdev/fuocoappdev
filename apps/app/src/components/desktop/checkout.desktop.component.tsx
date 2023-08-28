import styles from '../checkout.module.scss';
import {
  Button,
  Checkbox,
  Line,
  Radio,
  Input,
  Solid,
  Dropdown,
  FormLayout,
  Modal,
} from '@fuoco.appdev/core-ui';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { useObservable } from '@ngneat/use-observable';
import CheckoutController from '../../controllers/checkout.controller';
import AddressFormComponent from '../address-form.component';
import StoreController from '../../controllers/store.controller';
import { ProviderType } from '../../models/checkout.model';
import CartController from '../../controllers/cart.controller';
import { Discount, GiftCard, Customer } from '@medusajs/medusa';
// @ts-ignore
import { formatAmount } from 'medusa-react';
import WindowController from '../../controllers/window.controller';
import AccountController from '../../controllers/account.controller';
import {
  Elements,
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from '@stripe/react-stripe-js';
import PayButtonComponent from '../pay-button.component';
import { CheckoutResponsiveProps } from '../checkout.component';

export function CheckoutDesktopComponent({
  shippingOptions,
  providerOptions,
  shippingAddressOptions,
  isAddAddressOpen,
  isPayOpen,
  stripeOptions,
  stripePromise,
  stripeElementOptions,
  setIsAddAddressOpen,
  setIsPayOpen,
  onContinueToDeliveryFromShippingAddress,
  onContinueToBillingFromShippingAddress,
  onContinueToDeliveryFromBillingAddress,
  onAddAddressAsync,
}: CheckoutResponsiveProps): JSX.Element {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [props] = useObservable(CheckoutController.model.store);
  const [accountProps] = useObservable(AccountController.model.store);
  const [storeProps] = useObservable(StoreController.model.store);
  const [cartProps] = useObservable(CartController.model.store);
  const [windowProps] = useObservable(WindowController.model.store);
  const { t } = useTranslation();

  const customer = accountProps.customer as Customer;
  return (
    <div
      ref={rootRef}
      className={[styles['root'], styles['root-desktop']].join(' ')}
    >
      <div
        className={[
          styles['left-content'],
          styles['left-content-desktop'],
        ].join(' ')}
      >
        <div
          className={[
            styles['card-container'],
            styles['card-container-desktop'],
          ].join(' ')}
        >
          <div className={[styles['card-content-container']].join(' ')}>
            <div
              className={[
                styles['header-container'],
                styles['header-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['step-count'],
                  styles['step-count-desktop'],
                ].join(' ')}
              >
                1
              </div>
              <div
                className={[
                  styles['header-title'],
                  styles['header-title-desktop'],
                ].join(' ')}
              >
                {t('shippingAddress')}
              </div>
              <div
                className={[
                  styles['header-right-content'],
                  styles['header-right-content-desktop'],
                ].join(' ')}
              >
                {windowProps.isAuthenticated && (
                  <div>
                    <Button
                      classNames={{
                        button: styles['button'],
                      }}
                      floatingLabel={t('add') ?? ''}
                      rounded={true}
                      icon={<Line.Add size={24} color={'#2A2A5F'} />}
                      type={'text'}
                      rippleProps={{
                        color: 'rgba(42, 42, 95, .35)',
                      }}
                      onClick={() => setIsAddAddressOpen(true)}
                    />
                  </div>
                )}
              </div>
            </div>
            {!windowProps.isAuthenticated && (
              <AddressFormComponent
                values={props.shippingForm}
                errors={props.shippingFormErrors}
                isComplete={props.shippingFormComplete}
                onEdit={() =>
                  CheckoutController.updateShippingFormComplete(false)
                }
                onChangeCallbacks={{
                  email: (event) =>
                    CheckoutController.updateShippingAddress({
                      email: event.target.value,
                    }),
                  firstName: (event) =>
                    CheckoutController.updateShippingAddress({
                      firstName: event.target.value,
                    }),
                  lastName: (event) =>
                    CheckoutController.updateShippingAddress({
                      lastName: event.target.value,
                    }),
                  company: (event) =>
                    CheckoutController.updateShippingAddress({
                      company: event.target.value,
                    }),
                  address: (event) =>
                    CheckoutController.updateShippingAddress({
                      address: event.target.value,
                    }),
                  apartments: (event) =>
                    CheckoutController.updateShippingAddress({
                      apartments: event.target.value,
                    }),
                  postalCode: (event) =>
                    CheckoutController.updateShippingAddress({
                      postalCode: event.target.value,
                    }),
                  city: (event) =>
                    CheckoutController.updateShippingAddress({
                      city: event.target.value,
                    }),
                  country: (index, id, value) =>
                    CheckoutController.updateShippingAddress({
                      countryCode: id,
                    }),
                  region: (index, id, value) =>
                    CheckoutController.updateShippingAddress({
                      region: value,
                    }),
                  phoneNumber: (value, event, formattedValue) =>
                    CheckoutController.updateShippingAddress({
                      phoneNumber: value,
                    }),
                }}
              />
            )}
            {windowProps.isAuthenticated &&
              customer?.shipping_addresses?.length > 0 && (
                <Radio.Group
                  id={''}
                  activeId={props.selectedShippingAddressOptionId ?? ''}
                  rippleProps={{
                    color: 'rgba(42, 42, 95, .35)',
                  }}
                  classNames={{
                    radio: {
                      containerCard: styles['radio-container-card'],
                      labelText: styles['radio-label-text'],
                      labelDescription: styles['radio-label-description-text'],
                      containerCardActive:
                        styles['radio-container-card-active'],
                    },
                  }}
                  options={shippingAddressOptions}
                  type={'cards'}
                  onChange={(event) =>
                    CheckoutController.updateSelectedShippingAddressOptionIdAsync(
                      event.target.id
                    )
                  }
                />
              )}
            {windowProps.isAuthenticated &&
              customer?.shipping_addresses?.length <= 0 && (
                <div
                  className={[
                    styles['card-description'],
                    styles['card-description-desktop'],
                  ].join(' ')}
                >
                  {t('noAddressAddedDescription')}
                </div>
              )}
            <Checkbox
              classNames={{
                container: styles['checkbox-container'],
                checkbox: styles['checkbox'],
                labelContainerLabelSpan: styles['checkbox-label'],
              }}
              label={t('sameAsBillingAddress') ?? ''}
              checked={props.sameAsBillingAddress}
              onChange={() =>
                CheckoutController.updateSameAsBillingAddress(
                  !props.sameAsBillingAddress
                )
              }
            />
            {!accountProps.customer &&
              !props.shippingFormComplete &&
              props.sameAsBillingAddress && (
                <Button
                  classNames={{
                    container: styles['submit-button-container'],
                    button: styles['submit-button'],
                  }}
                  block={true}
                  size={'large'}
                  icon={<Line.DeliveryDining size={24} />}
                  onClick={onContinueToDeliveryFromShippingAddress}
                >
                  {t('continueToDelivery')}
                </Button>
              )}
            {!props.shippingFormComplete && !props.sameAsBillingAddress && (
              <Button
                classNames={{
                  container: styles['submit-button-container'],
                  button: styles['submit-button'],
                }}
                block={true}
                size={'large'}
                icon={<Line.Receipt size={24} />}
                onClick={onContinueToBillingFromShippingAddress}
              >
                {t('continueToBilling')}
              </Button>
            )}
          </div>
        </div>
        {!props.sameAsBillingAddress && (
          <div
            className={[
              styles['card-container'],
              styles['card-container-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['card-content-container'],
                styles['card-content-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['header-container'],
                  styles['header-container-desktop'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['step-count'],
                    styles['step-count-desktop'],
                  ].join(' ')}
                >
                  2
                </div>
                <div
                  className={[
                    styles['header-title'],
                    styles['header-title-desktop'],
                  ].join(' ')}
                >
                  {t('billing')}
                </div>
              </div>
              {props.shippingFormComplete ? (
                <>
                  <AddressFormComponent
                    values={props.billingForm}
                    errors={props.billingFormErrors}
                    isComplete={props.billingFormComplete}
                    onEdit={() =>
                      CheckoutController.updateBillingFormComplete(false)
                    }
                    onChangeCallbacks={{
                      email: (event) =>
                        CheckoutController.updateBillingAddress({
                          email: event.target.value,
                        }),
                      firstName: (event) =>
                        CheckoutController.updateBillingAddress({
                          firstName: event.target.value,
                        }),
                      lastName: (event) =>
                        CheckoutController.updateBillingAddress({
                          lastName: event.target.value,
                        }),
                      company: (event) =>
                        CheckoutController.updateBillingAddress({
                          company: event.target.value,
                        }),
                      address: (event) =>
                        CheckoutController.updateBillingAddress({
                          address: event.target.value,
                        }),
                      apartments: (event) =>
                        CheckoutController.updateBillingAddress({
                          apartments: event.target.value,
                        }),
                      postalCode: (event) =>
                        CheckoutController.updateBillingAddress({
                          postalCode: event.target.value,
                        }),
                      city: (event) =>
                        CheckoutController.updateBillingAddress({
                          city: event.target.value,
                        }),
                      country: (index, id) =>
                        CheckoutController.updateBillingAddress({
                          countryCode: id,
                        }),
                      region: (index, id, value) =>
                        CheckoutController.updateBillingAddress({
                          region: value,
                        }),
                      phoneNumber: (value, event, formattedValue) =>
                        CheckoutController.updateBillingAddress({
                          phoneNumber: value,
                        }),
                    }}
                  />
                  {!props.billingFormComplete && (
                    <Button
                      classNames={{
                        container: styles['submit-button-container'],
                        button: styles['submit-button'],
                      }}
                      block={true}
                      size={'large'}
                      icon={<Line.DeliveryDining size={24} />}
                      onClick={onContinueToDeliveryFromBillingAddress}
                    >
                      {t('continueToDelivery')}
                    </Button>
                  )}
                </>
              ) : (
                <div
                  className={[
                    styles['card-description'],
                    styles['card-description-desktop'],
                  ].join(' ')}
                >
                  {t('enterShippingAddressForBilling')}
                </div>
              )}
            </div>
          </div>
        )}
        <div
          className={[
            styles['card-container'],
            styles['card-container-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['card-content-container'],
              styles['card-content-container-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['header-container'],
                styles['header-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['step-count'],
                  styles['step-count-desktop'],
                ].join(' ')}
              >
                {props.sameAsBillingAddress ? 2 : 3}
              </div>
              <div
                className={[
                  styles['header-title'],
                  styles['header-title-desktop'],
                ].join(' ')}
              >
                {t('delivery')}
              </div>
            </div>
            {!props.shippingFormComplete && (
              <div
                className={[
                  styles['card-description'],
                  styles['card-description-desktop'],
                ].join(' ')}
              >
                {t('enterShippingAddressForDelivery')}
              </div>
            )}
            {props.shippingFormComplete && !props.billingFormComplete && (
              <div
                className={[
                  styles['card-description'],
                  styles['card-description-desktop'],
                ].join(' ')}
              >
                {t('enterBillingAddressForDelivery')}
              </div>
            )}
            {props.shippingFormComplete && props.billingFormComplete && (
              <Radio.Group
                id={''}
                activeId={props.selectedShippingOptionId ?? ''}
                rippleProps={{
                  color: 'rgba(42, 42, 95, .35)',
                }}
                classNames={{
                  radio: {
                    containerCard: styles['radio-container-card'],
                    labelText: styles['radio-label-text'],
                    labelDescription: styles['radio-label-description-text'],
                    containerCardActive: styles['radio-container-card-active'],
                  },
                }}
                options={shippingOptions}
                type={'cards'}
                onChange={(event) =>
                  CheckoutController.updateSelectedShippingOptionIdAsync(
                    event.target.value
                  )
                }
              />
            )}
          </div>
        </div>
      </div>
      <div
        className={[
          styles['right-content'],
          styles['right-content-desktop'],
        ].join(' ')}
      >
        <div
          className={[
            styles['card-container'],
            styles['card-container-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['card-content-container'],
              styles['card-content-container-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['header-container'],
                styles['header-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['header-title'],
                  styles['header-title-desktop'],
                ].join(' ')}
              >
                {t('giftCard')}
              </div>
            </div>
            <div
              className={[
                styles['apply-card-container'],
                styles['apply-card-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['apply-card-input-container'],
                  styles['apply-card-input-container-desktop'],
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
                  label={t('code') ?? ''}
                  value={props.giftCardCode}
                  onChange={(event) =>
                    CheckoutController.updateGiftCardCodeText(
                      event.target.value
                    )
                  }
                />
              </div>
              <div
                className={[
                  styles['apply-button-container'],
                  styles['apply-button-container-desktop'],
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
                  onClick={() => CheckoutController.updateGiftCardCodeAsync()}
                >
                  {t('apply')}
                </Button>
              </div>
            </div>
            {cartProps.cart?.gift_cards.length > 0 && (
              <div
                className={[
                  styles['tag-list-container'],
                  styles['tag-list-container-desktop'],
                ].join(' ')}
              >
                {cartProps.cart?.gift_cards?.map((value: GiftCard) => {
                  return (
                    <div
                      key={value.id}
                      className={[styles['tag'], styles['tag-desktop']].join(
                        ' '
                      )}
                    >
                      <div
                        className={[
                          styles['tag-text'],
                          styles['tag-text-desktop'],
                        ].join(' ')}
                      >
                        {value.code}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div
          className={[
            styles['card-container'],
            styles['card-container-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['card-content-container'],
              styles['card-content-container-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['header-container'],
                styles['header-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['header-title'],
                  styles['header-title-desktop'],
                ].join(' ')}
              >
                {t('discount')}
              </div>
            </div>
            <div
              className={[
                styles['apply-card-container'],
                styles['apply-card-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['apply-card-input-container'],
                  styles['apply-card-input-container-desktop'],
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
                  label={t('code') ?? ''}
                  value={props.discountCode}
                  onChange={(event) =>
                    CheckoutController.updateDiscountCodeText(
                      event.target.value
                    )
                  }
                />
              </div>
              <div
                className={[
                  styles['apply-button-container'],
                  styles['apply-button-container-desktop'],
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
                  onClick={() => CheckoutController.updateDiscountCodeAsync()}
                >
                  {t('apply')}
                </Button>
              </div>
            </div>
            {cartProps.cart?.discounts.length > 0 && (
              <div
                className={[
                  styles['tag-list-container'],
                  styles['tag-list-container-desktop'],
                ].join(' ')}
              >
                {cartProps.cart?.discounts?.map((value: Discount) => {
                  return (
                    <div
                      key={value.id}
                      className={[styles['tag'], styles['tag-desktop']].join(
                        ' '
                      )}
                    >
                      <div
                        className={[
                          styles['tag-text'],
                          styles['tag-text-desktop'],
                        ].join(' ')}
                      >
                        {value.code}
                      </div>
                      <div
                        className={[
                          styles['tag-button-container'],
                          styles['tag-button-container-desktop'],
                        ].join(' ')}
                      >
                        <Button
                          classNames={{
                            button: styles['tag-button'],
                          }}
                          onClick={() =>
                            CartController.removeDiscountCodeAsync(value.code)
                          }
                          rippleProps={{}}
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
            )}
          </div>
        </div>
        <div
          className={[
            styles['card-container'],
            styles['card-container-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['card-content-container'],
              styles['card-content-container-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['header-container'],
                styles['header-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['header-title'],
                  styles['header-title-desktop'],
                ].join(' ')}
              >
                {t('payment')}
              </div>
            </div>
            {props.billingFormComplete && (
              <Radio.Group
                id={''}
                activeId={props.selectedProviderId ?? ''}
                rippleProps={{
                  color: 'rgba(42, 42, 95, .35)',
                }}
                classNames={{
                  radio: {
                    containerCard: styles['radio-container-card'],
                    labelText: styles['radio-label-text'],
                    labelDescription: styles['radio-label-description-text'],
                    containerCardActive: styles['radio-container-card-active'],
                  },
                }}
                options={providerOptions}
                type={'cards'}
                onChange={(event) =>
                  CheckoutController.updateSelectedProviderIdAsync(
                    event.target.id as ProviderType
                  )
                }
              />
            )}
            {!props.billingFormComplete && (
              <div
                className={[
                  styles['card-description'],
                  styles['card-description-desktop'],
                ].join(' ')}
              >
                {t('enterBillingAddressForPayment')}
              </div>
            )}
          </div>
          <div
            className={[
              styles['pricing-container'],
              styles['pricing-container-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['subtotal-container'],
                styles['subtotal-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['subtotal-text'],
                  styles['subtotal-text-desktop'],
                ].join(' ')}
              >
                {t('subtotal')}
              </div>
              <div
                className={[
                  styles['subtotal-text'],
                  styles['subtotal-text-desktop'],
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
                styles['total-detail-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['total-detail-text'],
                  styles['total-detail-text-desktop'],
                ].join(' ')}
              >
                {t('discount')}
              </div>
              <div
                className={[
                  styles['total-detail-text'],
                  styles['total-detail-text-desktop'],
                ].join(' ')}
              >
                {storeProps.selectedRegion &&
                  formatAmount({
                    amount: -cartProps.cart?.discount_total ?? 0,
                    region: storeProps.selectedRegion,
                    includeTaxes: false,
                  })}
              </div>
            </div>
            <div
              className={[
                styles['total-detail-container'],
                styles['total-detail-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['total-detail-text'],
                  styles['total-detail-text-desktop'],
                ].join(' ')}
              >
                {t('shipping')}
              </div>
              <div
                className={[
                  styles['total-detail-text'],
                  styles['total-detail-text-desktop'],
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
                styles['total-detail-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['total-detail-text'],
                  styles['total-detail-text-desktop'],
                ].join(' ')}
              >
                {t('taxes')}
              </div>
              <div
                className={[
                  styles['total-detail-text'],
                  styles['total-detail-text-desktop'],
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
                styles['total-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['total-text'],
                  styles['total-text-desktop'],
                ].join(' ')}
              >
                {t('total')}
              </div>
              <div
                className={[
                  styles['total-text'],
                  styles['total-text-desktop'],
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
              styles['pay-button-container'],
              styles['pay-button-container-desktop'],
            ].join(' ')}
          >
            <Button
              classNames={{
                container: styles['submit-button-container'],
                button: styles['submit-button'],
              }}
              block={true}
              disabled={
                !props.shippingFormComplete || !props.billingFormComplete
              }
              size={'large'}
              icon={<Line.Payment size={24} />}
              onClick={() => setIsPayOpen(true)}
            >
              {t('proceedToPayment')}
            </Button>
          </div>
        </div>
      </div>
      <Modal
        classNames={{
          overlay: [
            styles['modal-overlay'],
            styles['modal-overlay-desktop'],
          ].join(' '),

          title: [styles['modal-title'], styles['modal-title-desktop']].join(
            ' '
          ),
          description: [
            styles['modal-description'],
            styles['modal-description-desktop'],
          ].join(' '),
          footerButtonContainer: [
            styles['modal-footer-button-container'],
            styles['modal-footer-button-container-desktop'],
            styles['modal-address-footer-button-container-desktop'],
          ].join(' '),
          cancelButton: {
            button: [
              styles['modal-cancel-button'],
              styles['modal-cancel-button-desktop'],
            ].join(' '),
          },
          confirmButton: {
            button: [
              styles['modal-confirm-button'],
              styles['modal-confirm-button-desktop'],
            ].join(' '),
          },
        }}
        hideFooter={true}
        visible={isAddAddressOpen}
        onCancel={() => setIsAddAddressOpen(false)}
      >
        <div
          className={[
            styles['add-address-container'],
            styles['add-address-container-desktop'],
          ].join(' ')}
        >
          <AddressFormComponent
            isAuthenticated={true}
            values={props.addShippingForm}
            errors={props.addShippingFormErrors}
            onChangeCallbacks={{
              firstName: (event) =>
                CheckoutController.updateAddShippingAddress({
                  firstName: event.target.value,
                }),
              lastName: (event) =>
                CheckoutController.updateAddShippingAddress({
                  lastName: event.target.value,
                }),
              company: (event) =>
                CheckoutController.updateAddShippingAddress({
                  company: event.target.value,
                }),
              address: (event) =>
                CheckoutController.updateAddShippingAddress({
                  address: event.target.value,
                }),
              apartments: (event) =>
                CheckoutController.updateAddShippingAddress({
                  apartments: event.target.value,
                }),
              postalCode: (event) =>
                CheckoutController.updateAddShippingAddress({
                  postalCode: event.target.value,
                }),
              city: (event) =>
                CheckoutController.updateAddShippingAddress({
                  city: event.target.value,
                }),
              country: (index, id, value) =>
                CheckoutController.updateAddShippingAddress({
                  countryCode: id,
                }),
              region: (index, id, value) =>
                CheckoutController.updateAddShippingAddress({
                  region: value,
                }),
              phoneNumber: (value, event, formattedValue) =>
                CheckoutController.updateAddShippingAddress({
                  phoneNumber: value,
                }),
            }}
          />
          <div
            className={[
              styles['add-address-button-container'],
              styles['add-address-button-container-desktop'],
            ].join(' ')}
          >
            <Button
              classNames={{
                button: styles['add-address-button'],
              }}
              rippleProps={{
                color: 'rgba(233, 33, 66, .35)',
              }}
              block={true}
              size={'large'}
              onClick={onAddAddressAsync}
            >
              {t('addAddress')}
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        classNames={{
          overlay: [
            styles['modal-overlay'],
            styles['modal-overlay-desktop'],
          ].join(' '),

          title: [styles['modal-title'], styles['modal-title-desktop']].join(
            ' '
          ),
          description: [
            styles['modal-description'],
            styles['modal-description-desktop'],
          ].join(' '),
          footerButtonContainer: [
            styles['modal-footer-button-container'],
            styles['modal-footer-button-container-desktop'],
            styles['modal-address-footer-button-container-desktop'],
          ].join(' '),
          cancelButton: {
            button: [
              styles['modal-cancel-button'],
              styles['modal-cancel-button-desktop'],
            ].join(' '),
          },
          confirmButton: {
            button: [
              styles['modal-confirm-button'],
              styles['modal-confirm-button-desktop'],
            ].join(' '),
          },
        }}
        visible={isPayOpen}
        onCancel={() => setIsPayOpen(false)}
        hideFooter={true}
      >
        <div
          className={[
            styles['pay-container'],
            styles['pay-container-desktop'],
          ].join(' ')}
        >
          {props.selectedProviderId === ProviderType.Manual && (
            <>
              <div
                className={[
                  styles['manual-provider-text'],
                  styles['manual-provider-text-desktop'],
                ].join(' ')}
              >
                {t('manualProviderDescription')}
              </div>
              <PayButtonComponent
                onPaymentComplete={() => setIsPayOpen(false)}
              />
            </>
          )}
          {props.selectedProviderId === ProviderType.Stripe && (
            <Elements stripe={stripePromise} options={stripeOptions}>
              <FormLayout
                label={t('creditCardNumber') ?? ''}
                error={''}
                classNames={{
                  label: styles['input-form-layout-label'],
                }}
              >
                <CardNumberElement options={stripeElementOptions} />
              </FormLayout>
              <div className={styles['horizontal-input-container']}>
                <FormLayout
                  label={t('expirationDate') ?? ''}
                  error={''}
                  classNames={{
                    root: styles['input-form-root'],
                    label: styles['input-form-layout-label'],
                  }}
                >
                  <CardExpiryElement options={stripeElementOptions} />
                </FormLayout>
                <FormLayout
                  label={t('cvc') ?? ''}
                  error={''}
                  classNames={{
                    root: styles['input-form-root'],
                    label: styles['input-form-layout-label'],
                  }}
                >
                  <CardCvcElement options={stripeElementOptions} />
                </FormLayout>
              </div>
              <PayButtonComponent
                stripeOptions={stripeOptions}
                onPaymentComplete={() => setIsPayOpen(false)}
              />
            </Elements>
          )}
        </div>
      </Modal>
      {props.isPaymentLoading && (
        <div
          className={[
            styles['loading-container'],
            styles['loading-container-desktop'],
          ].join(' ')}
        >
          <img
            src={'../assets/svg/ring-resize-light.svg'}
            className={[
              styles['loading-ring'],
              styles['loading-ring-desktop'],
            ].join(' ')}
          />
        </div>
      )}
    </div>
  );
}