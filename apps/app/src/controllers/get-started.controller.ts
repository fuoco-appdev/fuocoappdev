/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller } from '../controller';
import { GetStartedModel } from '../models/get-started.model';
import AccountService from '../services/account.service';
import * as core from '../protobuf/core_pb';

class GetStartedController extends Controller {
  private readonly _model: GetStartedModel;

  constructor() {
    super();

    this._model = new GetStartedModel();
  }

  public get model(): GetStartedModel {
    return this._model;
  }

  public initialize(): void {}

  public dispose(): void {}

  public updateCompanyName(value: string): void {
    this._model.companyName = value;
  }

  public updatePhoneNumber(value: string): void {
    this._model.phoneNumber = value;
  }

  public updateComment(value: string): void {
    this._model.comment = value;
  }

  public async sendRequestAsync(): Promise<void> {
    if (
      this._model.companyName.length <= 0 &&
      this._model.phoneNumber.length <= 0 &&
      this._model.comment.length <= 0
    ) {
      return;
    }

    if (
      AccountService.activeAccount?.requestStatus === core.RequestStatus.IDLE
    ) {
      await AccountService.requestGettingStartedAsync({
        company: this._model.companyName,
        phoneNumber: this._model.phoneNumber,
        comment: this._model.comment,
      });

      this._model.requestSent = true;
    }
  }
}

export default new GetStartedController();
