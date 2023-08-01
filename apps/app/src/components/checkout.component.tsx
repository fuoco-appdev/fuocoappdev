import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import styles from './checkout.module.scss';
import {
  Button,
  Checkbox,
  OptionProps,
  Line,
  Radio,
  Input,
  Solid,
  Dropdown,
  FormLayout,
} from '@fuoco.appdev/core-ui';
import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useObservable } from '@ngneat/use-observable';
import CheckoutController from '../controllers/checkout.controller';
import AddressFormComponent, {
  AddressFormErrors,
  AddressFormValues,
} from './address-form.component';
import { RadioProps } from '@fuoco.appdev/core-ui/dist/cjs/src/components/radio/radio';
import StoreController from '../controllers/store.controller';
import { PricedShippingOption } from '@medusajs/medusa/dist/types/pricing';
import { ProviderType, ShippingType } from '../models/checkout.model';
import CartController from '../controllers/cart.controller';
import {
  Discount,
  GiftCard,
  PaymentSession,
  Customer,
  Cart,
} from '@medusajs/medusa';
// @ts-ignore
import { formatAmount } from 'medusa-react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../route-paths';
import WindowController from '../controllers/window.controller';
import AccountController from '../controllers/account.controller';
import {
  Elements,
  useElements,
  useStripe,
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from '@stripe/react-stripe-js';
import {
  loadStripe,
  StripeCardCvcElementOptions,
  StripeCardExpiryElementOptions,
  StripeCardNumberElement,
  StripeCardNumberElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import ConfigService from '../services/config.service';

interface PayButtonProps {
  stripeOptions?: StripeElementsOptions;
  onPaymentComplete: () => void;
}

function PayButtonComponent({
  stripeOptions,
  onPaymentComplete,
}: PayButtonProps): JSX.Element {
  const navigate = useNavigate();
  const elements = useElements();
  const stripe = useStripe();
  const [props] = useObservable(CheckoutController.model.store);
  const cardRef = useRef<StripeCardNumberElement | null | undefined>(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    cardRef.current = elements?.getElement('cardNumber');
    console.log(cardRef.current);
  }, [elements]);

  return (
    <div className={styles['pay-button-container']}>
      <Button
        classNames={{
          button: styles['pay-button'],
        }}
        rippleProps={{
          color: 'rgba(233, 33, 66, .35)',
        }}
        touchScreen={true}
        block={true}
        size={'large'}
        icon={<Line.Lock size={24} />}
        onClick={async () => {
          let id: string | undefined = undefined;
          if (props.selectedProviderId === ProviderType.Manual) {
            id = await CheckoutController.proceedToManualPaymentAsync();
          } else if (props.selectedProviderId === ProviderType.Stripe) {
            id = await CheckoutController.proceedToStripePaymentAsync(
              stripe,
              cardRef.current,
              stripeOptions?.clientSecret
            );
          }

          if (id) {
            onPaymentComplete?.();
            navigate(`${RoutePaths.OrderConfirmed}/${id}`);
          }
        }}
      >
        {t('pay')}
      </Button>
    </div>
  );
}

function CheckoutDesktopComponent(): JSX.Element {
  return <></>;
}

function CheckoutMobileComponent(): JSX.Element {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [props] = useObservable(CheckoutController.model.store);
  const [windowProps] = useObservable(WindowController.model.store);
  const [accountProps] = useObservable(AccountController.model.store);
  const [cartProps] = useObservable(CartController.model.store);
  const [storeProps] = useObservable(StoreController.model.store);
  const [shippingOptions, setShippingOptions] = useState<RadioProps[]>([]);
  const [providerOptions, setProviderOptions] = useState<RadioProps[]>([]);
  const [shippingAddressOptions, setShippingAddressOptions] = useState<
    RadioProps[]
  >([]);
  const [isAddDropdownOpen, setIsAddDropdownOpen] = useState<boolean>(false);
  const [isPayDropdownOpen, setIsPayDropdownOpen] = useState<boolean>(false);
  const [stripeOptions, setStripeOptions] = useState<StripeElementsOptions>({});
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const customer = accountProps.customer as Customer;
  const stripePromise = loadStripe(ConfigService.stripe.key);

  const stripeElementOptions:
    | StripeCardNumberElementOptions
    | StripeCardExpiryElementOptions
    | StripeCardCvcElementOptions = useMemo(() => {
    return {
      classes: {
        base: styles['stripe-input-base'],
      },
    };
  }, []);

  useEffect(() => {
    if (cartProps.cart && cartProps.cart.items.length <= 0) {
      navigate(RoutePaths.Store);
    }
  }, [cartProps.cart]);

  useEffect(() => {
    const radioOptions: RadioProps[] = [];
    for (const option of props.shippingOptions as PricedShippingOption[]) {
      let description = '';
      if (option.name === ShippingType.Standard) {
        description = t('standardShippingDescription');
      } else if (option.name === ShippingType.Express) {
        description = t('expressShippingDescription');
      }

      radioOptions.push({
        id: option.id,
        label: option.name ?? '',
        value: option.id ?? '',
        description: description,
        rightContent: () => (
          <div className={styles['radio-price-text']}>
            {storeProps.selectedRegion &&
              formatAmount({
                amount: option?.amount ?? 0,
                region: storeProps.selectedRegion,
                includeTaxes: false,
              })}
          </div>
        ),
      });
    }
    setShippingOptions(radioOptions);
  }, [props.shippingOptions]);

  useEffect(() => {
    if (!cartProps.cart) {
      return;
    }

    const cart = cartProps.cart as Cart;
    let radioOptions: RadioProps[] = [];
    for (const session of cart.payment_sessions as PaymentSession[]) {
      let description = '';
      let name = '';
      if (session.provider_id === ProviderType.Manual) {
        if (process.env['NODE_ENV'] === 'production') {
          continue;
        }
        name = t('manualProviderName');
        description = t('manualProviderDescription');
      } else if (session.provider_id === ProviderType.Stripe) {
        name = t('creditCardProviderName');
        description = t('creditCardProviderDescription');
      }

      radioOptions.push({
        id: session.provider_id,
        label: name,
        value: name,
        description: description,
      });
    }

    radioOptions = radioOptions.sort((a, b) => (a.label < b.label ? -1 : 1));
    setProviderOptions(radioOptions);

    if (cart.payment_session) {
      setStripeOptions({
        clientSecret: cart.payment_session.data['client_secret'] as
          | string
          | undefined,
      });
    }
  }, [cartProps.cart]);

  useEffect(() => {
    let radioOptions: RadioProps[] = [];
    if (!customer) {
      return;
    }

    for (const address of customer?.shipping_addresses) {
      let value = `${address.address_1}`;
      let description = `${address.first_name} ${address.last_name}, ${address.phone}`;
      if (address?.address_2) {
        value += ` ${address.address_2}, `;
      } else {
        value += ', ';
      }

      if (address?.province) {
        value += `${address.province}, `;
      }

      value += address.country_code?.toUpperCase();

      if (address.company) {
        description += `, ${address.company}`;
      }

      radioOptions.push({
        id: address.id,
        label: value,
        value: value,
        description: description,
      });
    }

    setShippingAddressOptions(radioOptions);
  }, [accountProps.customer]);

  useEffect(() => {
    CheckoutController.updateErrorStrings({
      email: t('fieldEmptyError') ?? '',
      firstName: t('fieldEmptyError') ?? '',
      lastName: t('fieldEmptyError') ?? '',
      address: t('fieldEmptyError') ?? '',
      postalCode: t('fieldEmptyError') ?? '',
      city: t('fieldEmptyError') ?? '',
      phoneNumber: t('fieldEmptyError') ?? '',
    });
  }, [i18n.language]);

  return (
    <div ref={rootRef} className={styles['root']}>
      <div className={styles['card-container']}>
        <div className={styles['card-content-container']}>
          <div className={styles['header-container']}>
            <div className={styles['step-count']}>1</div>
            <div className={styles['header-title']}>{t('shippingAddress')}</div>
            <div className={styles['header-right-content']}>
              {windowProps.isAuthenticated && (
                <div>
                  <Button
                    rounded={true}
                    icon={<Line.Add size={24} color={'#2A2A5F'} />}
                    type={'text'}
                    rippleProps={{
                      color: 'rgba(42, 42, 95, .35)',
                    }}
                    touchScreen={true}
                    onClick={() => setIsAddDropdownOpen(true)}
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
          {windowProps.isAuthenticated &&
            customer?.shipping_addresses?.length <= 0 && (
              <div className={styles['card-description']}>
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
                onClick={() => {
                  CheckoutController.updateShippingAddressErrors({
                    email: undefined,
                    firstName: undefined,
                    lastName: undefined,
                    company: undefined,
                    address: undefined,
                    apartments: undefined,
                    postalCode: undefined,
                    city: undefined,
                    region: undefined,
                    phoneNumber: undefined,
                  });

                  const errors = CheckoutController.getAddressFormErrors(
                    props.shippingForm
                  );

                  if (errors) {
                    CheckoutController.updateShippingAddressErrors(errors);
                    return;
                  }

                  CheckoutController.updateShippingFormComplete(true);
                  CheckoutController.updateBillingFormComplete(true);
                  CheckoutController.continueToDeliveryAsync();
                }}
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
              onClick={() => {
                CheckoutController.updateShippingAddressErrors({
                  email: undefined,
                  firstName: undefined,
                  lastName: undefined,
                  company: undefined,
                  address: undefined,
                  apartments: undefined,
                  postalCode: undefined,
                  city: undefined,
                  region: undefined,
                  phoneNumber: undefined,
                });

                const errors = CheckoutController.getAddressFormErrors(
                  props.shippingForm
                );

                if (errors) {
                  CheckoutController.updateShippingAddressErrors(errors);
                  return;
                }

                CheckoutController.updateShippingFormComplete(true);
                CheckoutController.continueToBilling();
              }}
            >
              {t('continueToBilling')}
            </Button>
          )}
        </div>
      </div>
      {!props.sameAsBillingAddress && (
        <div className={styles['card-container']}>
          <div className={styles['card-content-container']}>
            <div className={styles['header-container']}>
              <div className={styles['step-count']}>2</div>
              <div className={styles['header-title']}>{t('billing')}</div>
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
                    onClick={() => {
                      CheckoutController.updateBillingAddressErrors({
                        email: undefined,
                        firstName: undefined,
                        lastName: undefined,
                        company: undefined,
                        address: undefined,
                        apartments: undefined,
                        postalCode: undefined,
                        city: undefined,
                        region: undefined,
                        phoneNumber: undefined,
                      });

                      const errors = CheckoutController.getAddressFormErrors(
                        CheckoutController.model.billingForm
                      );

                      if (errors) {
                        CheckoutController.updateBillingAddressErrors(errors);
                        return;
                      }

                      CheckoutController.updateBillingFormComplete(true);
                      CheckoutController.continueToDeliveryAsync();
                    }}
                  >
                    {t('continueToDelivery')}
                  </Button>
                )}
              </>
            ) : (
              <div className={styles['card-description']}>
                {t('enterShippingAddressForBilling')}
              </div>
            )}
          </div>
        </div>
      )}
      <div className={styles['card-container']}>
        <div className={styles['card-content-container']}>
          <div className={styles['header-container']}>
            <div className={styles['step-count']}>
              {props.sameAsBillingAddress ? 2 : 3}
            </div>
            <div className={styles['header-title']}>{t('delivery')}</div>
          </div>
          {!props.shippingFormComplete && (
            <div className={styles['card-description']}>
              {t('enterShippingAddressForDelivery')}
            </div>
          )}
          {props.shippingFormComplete && !props.billingFormComplete && (
            <div className={styles['card-description']}>
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
      <div className={styles['card-container']}>
        <div className={styles['card-content-container']}>
          <div className={styles['header-container']}>
            <div className={styles['header-title']}>{t('giftCard')}</div>
          </div>
          <div className={styles['apply-card-container']}>
            <div className={styles['apply-card-input-container']}>
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
                  CheckoutController.updateGiftCardCodeText(event.target.value)
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
                onClick={() => CheckoutController.updateGiftCardCodeAsync()}
              >
                {t('apply')}
              </Button>
            </div>
          </div>
          {cartProps.cart?.gift_cards.length > 0 && (
            <div className={styles['tag-list-container']}>
              {cartProps.cart?.gift_cards?.map((value: GiftCard) => {
                return (
                  <div key={value.id} className={styles['tag']}>
                    <div className={styles['tag-text']}>{value.code}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className={styles['card-container']}>
        <div className={styles['card-content-container']}>
          <div className={styles['header-container']}>
            <div className={styles['header-title']}>{t('discount')}</div>
          </div>
          <div className={styles['apply-card-container']}>
            <div className={styles['apply-card-input-container']}>
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
                  CheckoutController.updateDiscountCodeText(event.target.value)
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
                onClick={() => CheckoutController.updateDiscountCodeAsync()}
              >
                {t('apply')}
              </Button>
            </div>
          </div>
          {cartProps.cart?.discounts.length > 0 && (
            <div className={styles['tag-list-container']}>
              {cartProps.cart?.discounts?.map((value: Discount) => {
                return (
                  <div key={value.id} className={styles['tag']}>
                    <div className={styles['tag-text']}>{value.code}</div>
                    <div className={styles['tag-button-container']}>
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
          )}
        </div>
      </div>
      <div className={styles['card-container']}>
        <div className={styles['card-content-container']}>
          <div className={styles['header-container']}>
            <div className={styles['header-title']}>{t('payment')}</div>
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
            <div className={styles['card-description']}>
              {t('enterBillingAddressForPayment')}
            </div>
          )}
        </div>
        <div className={styles['pricing-container']}>
          <div className={styles['subtotal-container']}>
            <div className={styles['subtotal-text']}>{t('subtotal')}</div>
            <div className={styles['subtotal-text']}>
              {storeProps.selectedRegion &&
                formatAmount({
                  amount: cartProps.cart?.subtotal ?? 0,
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
                  amount: -cartProps.cart?.discount_total ?? 0,
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
                  amount: cartProps.cart?.shipping_total ?? 0,
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
                  amount: cartProps.cart?.tax_total ?? 0,
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
                  amount: cartProps.cart?.total ?? 0,
                  region: storeProps.selectedRegion,
                  includeTaxes: true,
                })}
            </div>
          </div>
        </div>
        <div className={styles['pay-button-container']}>
          <Button
            classNames={{
              container: styles['submit-button-container'],
              button: styles['submit-button'],
            }}
            block={true}
            disabled={!props.shippingFormComplete || !props.billingFormComplete}
            size={'large'}
            icon={<Line.Payment size={24} />}
            onClick={() => setIsPayDropdownOpen(true)}
          >
            {t('proceedToPayment')}
          </Button>
        </div>
      </div>
      <Dropdown
        open={isAddDropdownOpen}
        touchScreen={true}
        onClose={() => setIsAddDropdownOpen(false)}
      >
        <div className={styles['add-address-container']}>
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
          <div className={styles['add-address-button-container']}>
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
              onClick={async () => {
                CheckoutController.updateAddShippingAddressErrors({
                  email: undefined,
                  firstName: undefined,
                  lastName: undefined,
                  company: undefined,
                  address: undefined,
                  apartments: undefined,
                  postalCode: undefined,
                  city: undefined,
                  region: undefined,
                  phoneNumber: undefined,
                });

                const errors = CheckoutController.getAddressFormErrors(
                  props.addShippingForm
                );
                if (errors) {
                  CheckoutController.updateAddShippingAddressErrors(errors);
                  return;
                }

                await CheckoutController.addShippingAddressAsync();
                setIsAddDropdownOpen(false);
              }}
            >
              {t('addAddress')}
            </Button>
          </div>
        </div>
      </Dropdown>
      <Dropdown
        open={isPayDropdownOpen}
        touchScreen={true}
        onClose={() => setIsPayDropdownOpen(false)}
      >
        <div className={styles['pay-container']}>
          {props.selectedProviderId === ProviderType.Manual && (
            <>
              <div className={styles['manual-provider-text']}>
                {t('manualProviderDescription')}
              </div>
              <PayButtonComponent
                onPaymentComplete={() => setIsPayDropdownOpen(false)}
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
                onPaymentComplete={() => setIsPayDropdownOpen(false)}
              />
            </Elements>
          )}
        </div>
      </Dropdown>
      {props.isPaymentLoading && (
        <div className={styles['loading-container']}>
          <img
            src={'../assets/svg/ring-resize-light.svg'}
            className={styles['loading-ring']}
          />
        </div>
      )}
    </div>
  );
}

export default function CheckoutComponent(): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <CheckoutDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <CheckoutMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
