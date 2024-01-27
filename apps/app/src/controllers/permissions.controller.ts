/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Subscription } from 'rxjs';
import { Controller } from '../controller';
import { AccountModel } from '../models/account.model';
import AccountService from '../services/account.service';
import * as core from '../protobuf/core_pb';
import SupabaseService from '../services/supabase.service';
import BucketService from '../services/bucket.service';
import MedusaService from '../services/medusa.service';
import { StorePostCustomersReq, Customer, Address } from '@medusajs/medusa';
import WindowController from './window.controller';
import {
  ProfileFormErrors,
  ProfileFormValues,
} from '../components/account-profile-form.component';
import { v4 as uuidv4 } from 'uuid';
import mime from 'mime';
import { User } from '@supabase/supabase-js';
import {
  AddressFormErrors,
  AddressFormValues,
} from '../components/address-form.component';
import { RoutePathsType } from '../route-paths';
import { LanguageInfo } from '@fuoco.appdev/core-ui';
import { select } from '@ngneat/elf';
import { PermissionsModel } from '../models/permissions.model';

class PermissionsController extends Controller {
  private readonly _model: PermissionsModel;

  constructor() {
    super();

    this._model = new PermissionsModel();
  }

  public get model(): PermissionsModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    if (renderCount <= 1) {
      this.checkPermissionsAsync();
    }
  }

  public override load(renderCount: number): void {}

  public override disposeInitialization(renderCount: number): void {}

  public override disposeLoad(renderCount: number): void {}

  public updateAccessLocation(value: boolean): void {
    this._model.accessLocation = value;
  }

  public updateCurrentPosition(value: GeolocationPosition | undefined): void {
    this._model.currentPosition = value;
    this._model.accessLocation = Boolean(value);
  }

  public async checkPermissionsAsync(): Promise<boolean> {
    try {
      if (!this._model.currentPosition) {
        const position = await this.getCurrentPositionAsync();
        this.updateCurrentPosition(position);
      }
    } catch (error: any) {
      this.updateCurrentPosition(undefined);
      this._model.arePermissionsActive = false;
      console.error(error);
      return false;
    }

    this._model.arePermissionsActive = true;
    return true;
  }

  private async getCurrentPositionAsync(): Promise<GeolocationPosition> {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    });
  }
}

export default new PermissionsController();
