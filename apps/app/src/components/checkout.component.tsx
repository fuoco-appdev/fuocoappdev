import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import styles from './checkout.module.scss';
import {
  Button,
  Checkbox,
  OptionProps,
  Line,
  Radio,
  Input,
} from '@fuoco.appdev/core-ui';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { useObservable } from '@ngneat/use-observable';
import CheckoutController from '../controllers/checkout.controller';
import AddressFormComponent, {
  AddressFormErrors,
  AddressFormValues,
} from './address-form.component';
import { RadioProps } from '@fuoco.appdev/core-ui/dist/cjs/src/components/radio/radio';
import StoreController from '../controllers/store.controller';
import { PricedShippingOption } from '@medusajs/medusa/dist/types/pricing';
import { ShippingType } from '../models/checkout.model';
// @ts-ignore
import { formatAmount } from 'medusa-react';

function CheckoutDesktopComponent(): JSX.Element {
  return <></>;
}

function CheckoutMobileComponent(): JSX.Element {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [props] = useObservable(CheckoutController.model.store);
  const [storeProps] = useObservable(StoreController.model.store);
  const [shippingOptions, setShippingOptions] = useState<RadioProps[]>([]);
  const { t } = useTranslation();

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

  const getAddressFormErrors = (
    form: AddressFormValues
  ): AddressFormErrors | undefined => {
    const errors: AddressFormErrors = {};

    if (!form.email || form.email?.length <= 0) {
      errors.email = t('fieldEmptyError') ?? '';
    }

    if (!form.firstName || form.firstName?.length <= 0) {
      errors.firstName = t('fieldEmptyError') ?? '';
    }

    if (!form.lastName || form.lastName?.length <= 0) {
      errors.lastName = t('fieldEmptyError') ?? '';
    }

    if (!form.address || form.address?.length <= 0) {
      errors.address = t('fieldEmptyError') ?? '';
    }

    if (!form.postalCode || form.postalCode?.length <= 0) {
      errors.postalCode = t('fieldEmptyError') ?? '';
    }

    if (!form.city || form.city?.length <= 0) {
      errors.city = t('fieldEmptyError') ?? '';
    }

    if (!form.phoneNumber || form.phoneNumber?.length <= 0) {
      errors.phoneNumber = t('fieldEmptyError') ?? '';
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    }
    return undefined;
  };

  return (
    <div ref={rootRef} className={styles['root']}>
      <div className={styles['card-container']}>
        <div className={styles['card-content-container']}>
          <div className={styles['header-container']}>
            <div className={styles['step-count']}>1</div>
            <div className={styles['header-title']}>{t('shippingAddress')}</div>
          </div>
          <AddressFormComponent
            values={props.shippingForm}
            errors={props.shippingFormErrors}
            isComplete={props.shippingFormComplete}
            onEdit={() => CheckoutController.updateShippingFormComplete(false)}
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
          {!props.shippingFormComplete && props.sameAsBillingAddress && (
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

                const errors = getAddressFormErrors(
                  CheckoutController.model.shippingForm
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

                const errors = getAddressFormErrors(
                  CheckoutController.model.shippingForm
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

                      const errors = getAddressFormErrors(
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
                value={props.discountCode}
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
        </div>
      </div>
      <div className={styles['card-container']}></div>
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
