/* eslint-disable jsx-a11y/alt-text */
import {
  Button,
  Checkbox,
  Dropdown,
  FormLayout,
  Input,
  Line,
  Radio,
} from '@fuoco.appdev/web-components';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ProviderType } from '../../../shared/models/checkout.model';
import { RoutePathsType } from '../../../shared/route-paths-type';
import styles from '../../modules/checkout.module.scss';
import { useQuery } from '../../route-paths';
import AddressFormComponent from '../address-form.component';
import { DIContext } from '../app.component';
import { CheckoutResponsiveProps } from '../checkout.component';
import { ResponsiveMobile } from '../responsive.component';
import StripePayButtonComponent from '../stripe-pay-button.component';

function CheckoutMobileComponent({
  shippingOptions,
  providerOptions,
  shippingAddressOptions,
  isAddAddressOpen,
  isPayOpen,
  stripeOptions,
  stripeElementOptions,
  setIsAddAddressOpen,
  setIsPayOpen,
  onContinueToDeliveryFromShippingAddress,
  onContinueToBillingFromShippingAddress,
  onContinueToDeliveryFromBillingAddress,
  onAddAddressAsync,
}: CheckoutResponsiveProps): JSX.Element {
  const stripePromise = loadStripe(
    import.meta.env['STRIPE_PUBLISHABLE_KEY'] ?? ''
  );
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const query = useQuery();
  const { t, i18n } = useTranslation();
  const {
    AccountController,
    WindowController,
    CheckoutController,
    CartController,
    StoreController,
    MedusaService,
  } = React.useContext(DIContext);
  const { isAuthenticated } = WindowController.model;
  const { selectedRegion } = StoreController.model;
  const {
    shippingForm,
    shippingFormErrors,
    shippingFormComplete,
    selectedShippingAddressOptionId,
    sameAsBillingAddress,
    billingForm,
    billingFormErrors,
    billingFormComplete,
    selectedShippingOptionId,
    giftCardCode,
    discountCode,
    selectedProviderId,
    isLegalAge,
    addShippingForm,
    addShippingFormErrors,
    isPaymentLoading,
  } = CheckoutController.model;
  const { cart } = CartController.model;
  const { account, customer } = AccountController.model;

  return (
    <ResponsiveMobile>
      <div
        ref={rootRef}
        className={[styles['root'], styles['root-mobile']].join(' ')}
      >
        <div
          className={[
            styles['card-container'],
            styles['card-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['card-content-container'],
              styles['card-content-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['header-container'],
                styles['header-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['step-count'],
                  styles['step-count-mobile'],
                ].join(' ')}
              >
                1
              </div>
              <div
                className={[
                  styles['header-title'],
                  styles['header-title-mobile'],
                ].join(' ')}
              >
                {t('shippingAddress')}
              </div>
              <div
                className={[
                  styles['header-right-content'],
                  styles['header-right-content-mobile'],
                ].join(' ')}
              >
                {isAuthenticated && (
                  <div>
                    <Button
                      rounded={true}
                      icon={<Line.Add size={24} color={'#2A2A5F'} />}
                      type={'text'}
                      rippleProps={{
                        color: 'rgba(42, 42, 95, .35)',
                      }}
                      touchScreen={true}
                      onClick={() => setIsAddAddressOpen(true)}
                    />
                  </div>
                )}
              </div>
            </div>
            {!isAuthenticated && (
              <AddressFormComponent
                values={shippingForm}
                errors={shippingFormErrors}
                isComplete={shippingFormComplete}
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
                  country: (id, _value) =>
                    CheckoutController.updateShippingAddress({
                      countryCode: id,
                    }),
                  region: (_id, value) =>
                    CheckoutController.updateShippingAddress({
                      region: value,
                    }),
                  phoneNumber: (value, _event, _formattedValue) =>
                    CheckoutController.updateShippingAddress({
                      phoneNumber: value,
                    }),
                }}
              />
            )}
            {isAuthenticated && customer?.default_shipping_address_id && (
              <Radio.Group
                id={''}
                activeId={selectedShippingAddressOptionId ?? ''}
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
                options={shippingAddressOptions}
                type={'cards'}
                onChange={(event) =>
                  CheckoutController.updateSelectedShippingAddressOptionIdAsync(
                    event.target.id
                  )
                }
              />
            )}
            {isAuthenticated && customer?.default_shipping_address_id && (
              <div
                className={[
                  styles['card-description'],
                  styles['card-description-mobile'],
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
              checked={sameAsBillingAddress}
              onChange={() =>
                CheckoutController.updateSameAsBillingAddress(
                  !sameAsBillingAddress
                )
              }
            />
            {!customer && !shippingFormComplete && sameAsBillingAddress && (
              <Button
                classNames={{
                  container: styles['submit-button-container'],
                  button: styles['submit-button'],
                }}
                block={true}
                size={'large'}
                touchScreen={true}
                icon={<Line.DeliveryDining size={24} />}
                onClick={onContinueToDeliveryFromShippingAddress}
              >
                {t('continueToDelivery')}
              </Button>
            )}
            {!shippingFormComplete && !sameAsBillingAddress && (
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
        {!sameAsBillingAddress && (
          <div
            className={[
              styles['card-container'],
              styles['card-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['card-content-container'],
                styles['card-content-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['header-container'],
                  styles['header-container-mobile'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['step-count'],
                    styles['step-count-mobile'],
                  ].join(' ')}
                >
                  2
                </div>
                <div
                  className={[
                    styles['header-title'],
                    styles['header-title-mobile'],
                  ].join(' ')}
                >
                  {t('billing')}
                </div>
              </div>
              {shippingFormComplete ? (
                <>
                  <AddressFormComponent
                    values={billingForm}
                    errors={billingFormErrors}
                    isComplete={billingFormComplete}
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
                      country: (id, _value) =>
                        CheckoutController.updateBillingAddress({
                          countryCode: id,
                        }),
                      region: (_id, value) =>
                        CheckoutController.updateBillingAddress({
                          region: value,
                        }),
                      phoneNumber: (value, _event, _formattedValue) =>
                        CheckoutController.updateBillingAddress({
                          phoneNumber: value,
                        }),
                    }}
                  />
                  {!billingFormComplete && (
                    <Button
                      classNames={{
                        container: styles['submit-button-container'],
                        button: styles['submit-button'],
                      }}
                      block={true}
                      touchScreen={true}
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
                    styles['card-description-mobile'],
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
            styles['card-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['card-content-container'],
              styles['card-content-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['header-container'],
                styles['header-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['step-count'],
                  styles['step-count-mobile'],
                ].join(' ')}
              >
                {sameAsBillingAddress ? 2 : 3}
              </div>
              <div
                className={[
                  styles['header-title'],
                  styles['header-title-mobile'],
                ].join(' ')}
              >
                {t('delivery')}
              </div>
            </div>
            {!shippingFormComplete && (
              <div
                className={[
                  styles['card-description'],
                  styles['card-description-mobile'],
                ].join(' ')}
              >
                {t('enterShippingAddressForDelivery')}
              </div>
            )}
            {shippingFormComplete && !billingFormComplete && (
              <div
                className={[
                  styles['card-description'],
                  styles['card-description-mobile'],
                ].join(' ')}
              >
                {t('enterBillingAddressForDelivery')}
              </div>
            )}
            {shippingOptions.length > 0 &&
              shippingFormComplete &&
              billingFormComplete && (
                <Radio.Group
                  id={''}
                  activeId={selectedShippingOptionId ?? ''}
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
        <div
          className={[
            styles['card-container'],
            styles['card-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['card-content-container'],
              styles['card-content-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['header-container'],
                styles['header-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['header-title'],
                  styles['header-title-mobile'],
                ].join(' ')}
              >
                {t('giftCard')}
              </div>
            </div>
            <div
              className={[
                styles['apply-card-container'],
                styles['apply-card-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['apply-card-input-container'],
                  styles['apply-card-input-container-mobile'],
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
                  value={giftCardCode}
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
                  touchScreen={true}
                  onClick={() => CheckoutController.updateGiftCardCodeAsync()}
                >
                  {t('apply')}
                </Button>
              </div>
            </div>
            {/* {cart?.gift_cards &&
              cart?.gift_cards.length > 0 && (
                <div
                  className={[
                    styles['tag-list-container'],
                    styles['tag-list-container-mobile'],
                  ].join(' ')}
                >
                  {cart?.gift_cards?.map((value: GiftCard) => {
                    return (
                      <div
                        key={value.id}
                        className={[styles['tag'], styles['tag-mobile']].join(
                          ' '
                        )}
                      >
                        <div
                          className={[
                            styles['tag-text'],
                            styles['tag-text-mobile'],
                          ].join(' ')}
                        >
                          {value.code}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )} */}
          </div>
        </div>
        <div
          className={[
            styles['card-container'],
            styles['card-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['card-content-container'],
              styles['card-content-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['header-container'],
                styles['header-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['header-title'],
                  styles['header-title-mobile'],
                ].join(' ')}
              >
                {t('discount')}
              </div>
            </div>
            <div
              className={[
                styles['apply-card-container'],
                styles['apply-card-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['apply-card-input-container'],
                  styles['apply-card-input-container-mobile'],
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
                  value={discountCode}
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
                  touchScreen={true}
                  onClick={() => CheckoutController.updateDiscountCodeAsync()}
                >
                  {t('apply')}
                </Button>
              </div>
            </div>
            {/* {cart?.discounts &&
              cart?.discounts.length > 0 && (
                <div
                  className={[
                    styles['tag-list-container'],
                    styles['tag-list-container-mobile'],
                  ].join(' ')}
                >
                  {cart?.discounts?.map((value: Discount) => {
                    return (
                      <div
                        key={value.id}
                        className={[styles['tag'], styles['tag-mobile']].join(
                          ' '
                        )}
                      >
                        <div
                          className={[
                            styles['tag-text'],
                            styles['tag-text-mobile'],
                          ].join(' ')}
                        >
                          {value.code}
                        </div>
                        <div
                          className={[
                            styles['tag-button-container'],
                            styles['tag-button-container-mobile'],
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
              )} */}
          </div>
        </div>
        <div
          className={[
            styles['card-container'],
            styles['card-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['card-content-container'],
              styles['card-content-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['header-container'],
                styles['header-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['header-title'],
                  styles['header-title-mobile'],
                ].join(' ')}
              >
                {t('payment')}
              </div>
            </div>
            {billingFormComplete && (
              <Radio.Group
                id={''}
                activeId={selectedProviderId ?? ''}
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
            {!billingFormComplete && (
              <div
                className={[
                  styles['card-description'],
                  styles['card-description-mobile'],
                ].join(' ')}
              >
                {t('enterBillingAddressForPayment')}
              </div>
            )}
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
                {selectedRegion &&
                  MedusaService.formatAmount(
                    cart?.subtotal ?? 0,
                    selectedRegion.currency_code,
                    i18n.language
                  )}
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
                {selectedRegion &&
                  MedusaService.formatAmount(
                    -(cart?.discount_total ?? 0),
                    selectedRegion.currency_code,
                    i18n.language
                  )}
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
                {selectedRegion &&
                  MedusaService.formatAmount(
                    cart?.shipping_total ?? 0,
                    selectedRegion.currency_code,
                    i18n.language
                  )}
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
                {selectedRegion &&
                  MedusaService.formatAmount(
                    cart?.tax_total ?? 0,
                    selectedRegion.currency_code,
                    i18n.language
                  )}
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
                {selectedRegion &&
                  MedusaService.formatAmount(
                    cart?.total ?? 0,
                    selectedRegion.currency_code,
                    i18n.language
                  )}
              </div>
            </div>
          </div>
          <div
            className={[
              styles['is-legal-age-container'],
              styles['is-legal-age-container-mobile'],
            ].join(' ')}
          >
            <Checkbox
              classNames={{
                checkbox: styles['checkbox'],
                labelContainerLabel: styles['checkbox-label'],
              }}
              label={t('isLegalAgeDescription') ?? ''}
              checked={isLegalAge}
              onChange={() => CheckoutController.updateIsLegalAge(!isLegalAge)}
            />
          </div>
          <div
            className={[
              styles['pay-button-container'],
              styles['pay-button-container-mobile'],
            ].join(' ')}
          >
            <Button
              classNames={{
                container: styles['submit-button-container'],
                button: styles['submit-button'],
              }}
              block={true}
              touchScreen={true}
              disabled={
                !shippingFormComplete ||
                !billingFormComplete ||
                !selectedShippingOptionId ||
                !isLegalAge
              }
              size={'large'}
              icon={<Line.Payment size={24} />}
              onClick={() => setIsPayOpen(true)}
            >
              {t('proceedToPayment')}
            </Button>
          </div>
        </div>
        {ReactDOM.createPortal(
          <>
            <Dropdown
              classNames={{
                touchscreenOverlay: styles['dropdown-touchscreen-overlay'],
              }}
              open={isAddAddressOpen}
              touchScreen={true}
              onClose={() => setIsAddAddressOpen(false)}
            >
              <div
                className={[
                  styles['add-address-container'],
                  styles['add-address-container-mobile'],
                ].join(' ')}
              >
                <AddressFormComponent
                  isAuthenticated={true}
                  values={addShippingForm}
                  errors={addShippingFormErrors}
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
                    country: (id, _value) =>
                      CheckoutController.updateAddShippingAddress({
                        countryCode: id,
                      }),
                    region: (_id, value) =>
                      CheckoutController.updateAddShippingAddress({
                        region: value,
                      }),
                    phoneNumber: (value, _event, _formattedValue) =>
                      CheckoutController.updateAddShippingAddress({
                        phoneNumber: value,
                      }),
                  }}
                />
                <div
                  className={[
                    styles['add-address-button-container'],
                    styles['add-address-button-container-mobile'],
                  ].join(' ')}
                >
                  <Button
                    classNames={{
                      button: styles['add-address-button'],
                    }}
                    rippleProps={{
                      color: 'rgba(233, 33, 66, .35)',
                    }}
                    touchScreen={true}
                    block={true}
                    size={'large'}
                    onClick={onAddAddressAsync}
                  >
                    {t('addAddress')}
                  </Button>
                </div>
              </div>
            </Dropdown>
            <Dropdown
              classNames={{
                touchscreenOverlay: styles['dropdown-touchscreen-overlay'],
              }}
              open={isPayOpen}
              touchScreen={true}
              onClose={() => setIsPayOpen(false)}
            >
              <div
                className={[
                  styles['pay-container'],
                  styles['pay-container-mobile'],
                ].join(' ')}
              >
                {selectedProviderId === ProviderType.Manual && (
                  <>
                    <div
                      className={[
                        styles['manual-provider-text'],
                        styles['manual-provider-text-mobile'],
                      ].join(' ')}
                    >
                      {t('manualProviderDescription')}
                    </div>
                    <Button
                      classNames={{
                        button: styles['pay-button'],
                      }}
                      rippleProps={{
                        color: 'rgba(233, 33, 66, .35)',
                      }}
                      block={true}
                      size={'large'}
                      icon={<Line.Lock size={24} />}
                      onClick={async () => {
                        setIsPayOpen(false);
                        const id =
                          await CheckoutController.proceedToManualPaymentAsync();
                        navigate({
                          pathname: `${RoutePathsType.OrderConfirmed}/${id}`,
                          search: query.toString(),
                        });
                      }}
                    >
                      {t('pay')}
                    </Button>
                  </>
                )}
                {selectedProviderId === ProviderType.Stripe && (
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
                    <StripePayButtonComponent
                      stripeOptions={stripeOptions}
                      onPaymentClick={() => setIsPayOpen(false)}
                    />
                  </Elements>
                )}
              </div>
            </Dropdown>
            {isPaymentLoading && (
              <div
                className={[
                  styles['loading-container'],
                  styles['loading-container-mobile'],
                ].join(' ')}
              >
                <img
                  src={'../assets/svg/ring-resize-light.svg'}
                  className={[
                    styles['loading-ring'],
                    styles['loading-ring-mobile'],
                  ].join(' ')}
                />
              </div>
            )}
          </>,
          document.body
        )}
      </div>
    </ResponsiveMobile>
  );
}

export default observer(CheckoutMobileComponent);
