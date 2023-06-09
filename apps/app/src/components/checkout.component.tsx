import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import styles from './checkout.module.scss';
import { Button, Checkbox, OptionProps, Line } from '@fuoco.appdev/core-ui';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { useObservable } from '@ngneat/use-observable';
import CheckoutController from '../controllers/checkout.controller';
import AddressFormComponent, {
  AddressFormErrors,
  AddressFormValues,
} from './address-form.component';

function CheckoutDesktopComponent(): JSX.Element {
  return <></>;
}

function CheckoutMobileComponent(): JSX.Element {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [props] = useObservable(CheckoutController.model.store);
  const { t } = useTranslation();

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
        </div>
      </div>
      <div className={styles['card-container']}>
        <div className={styles['card-content-container']}>
          <div className={styles['header-container']}>
            <div className={styles['header-title']}>{t('giftCard')}</div>
          </div>
        </div>
      </div>
      <div className={styles['card-container']}>
        <div className={styles['card-content-container']}>
          <div className={styles['header-container']}>
            <div className={styles['header-title']}>{t('discount')}</div>
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
