import {
  AddressFormErrors,
  AddressFormValues,
} from '../components/address-form.component';
import { Controller } from '../controller';
import { CheckoutModel } from '../models/checkout.model';

class CheckoutController extends Controller {
  private readonly _model: CheckoutModel;

  constructor() {
    super();

    this._model = new CheckoutModel();
  }

  public get model(): CheckoutModel {
    return this._model;
  }

  public initialize(renderCount: number): void {}

  public dispose(renderCount: number): void {}

  public updateShippingAddress(value: AddressFormValues): void {
    this._model.shippingForm = { ...this._model.shippingForm, ...value };
  }

  public updateShippingAddressErrors(value: AddressFormErrors): void {
    this._model.shippingFormErrors = value;
  }

  public updateBillingAddress(value: AddressFormValues): void {
    this._model.billingForm = { ...this._model.billingForm, ...value };
  }

  public updateBillingAddressErrors(value: AddressFormErrors): void {
    this._model.billingFormErrors = value;
  }

  public updateSameAsBillingAddress(value: boolean): void {
    this._model.sameAsBillingAddress = value;
    this._model.billingFormComplete = value;
  }

  public updateShippingFormComplete(value: boolean): void {
    this._model.shippingFormComplete = value;
  }

  public updateBillingFormComplete(value: boolean): void {
    this._model.billingFormComplete = value;
  }

  public continueToDelivery(): void {
    this._model.shippingFormComplete = true;
    this._model.billingFormComplete = true;
    if (this._model.sameAsBillingAddress) {
      this._model.billingForm = this._model.shippingForm;
    }
  }
  public continueToBilling(): void {
    this._model.shippingFormComplete = true;
  }
}

export default new CheckoutController();
