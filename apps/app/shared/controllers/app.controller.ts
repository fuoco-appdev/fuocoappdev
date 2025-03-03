/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable } from 'mobx';
import { DIContainer } from 'rsdi';
import { Controller } from '../controller';
import AccountController from '../controllers/account.controller';
import PrivacyPolicyController from '../controllers/privacy-policy.controller';
import ResetPasswordController from '../controllers/reset-password.controller';
import SigninController from '../controllers/signin.controller';
import SignupController from '../controllers/signup.controller';
import TermsOfServiceController from '../controllers/terms-of-service.controller';
import WindowController from '../controllers/window.controller';
import { Model } from '../model';
import AccountService from '../services/account.service';
import BucketService from '../services/bucket.service';
import ConfigService from '../services/config.service';
import LogflareService from '../services/logflare.service';
import MedusaService from '../services/medusa.service';
import MeiliSearchService from '../services/meilisearch.service';
import OpenWebuiService from '../services/open-webui.service';
import SupabaseService from '../services/supabase.service';
import { StoreOptions } from '../store-options';
import EmailConfirmationController from './email-confirmation.controller';
import ForgotPasswordController from './forgot-password.controller';

export default class AppController extends Controller {
  private readonly _model: Model;

  constructor(
    private readonly _container: DIContainer<{
      AccountController: AccountController;
      LogflareService: LogflareService;
      MedusaService: MedusaService;
      AccountService: AccountService;
      SupabaseService: SupabaseService;
      ConfigService: ConfigService;
      OpenWebuiService: OpenWebuiService;
      WindowController: WindowController;
      SigninController: SigninController;
      SignupController: SignupController;
      EmailConfirmationController: EmailConfirmationController;
      ForgotPasswordController: ForgotPasswordController;
      TermsOfServiceController: TermsOfServiceController;
      PrivacyPolicyController: PrivacyPolicyController;
      ResetPasswordController: ResetPasswordController;
      MeiliSearchService: MeiliSearchService;
      BucketService: BucketService;
    }>,
    private readonly _storeOptions: StoreOptions
  ) {
    super();
    makeObservable(this);

    this._model = new Model(this._storeOptions);
  }

  public get model(): Model {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    //this._accountPublicController.initialize(renderCount);
    //this._exploreController.initialize(renderCount);
    //this._storeController.initialize(renderCount);
    //this._eventsController.initialize(renderCount);
    //this._cartController.initialize(renderCount);
    //this._chatController.initialize(renderCount);
    //this._notificationsController.initialize(renderCount);
    //this._productController.initialize(renderCount);
    //this._checkoutController.initialize(renderCount);
    //this._orderConfirmedController.initialize(renderCount);
    //this._permissionsController.initialize(renderCount);
    //this._helpController.initialize(renderCount);
    const windowController = this._container.get('WindowController');
    const accountController = this._container.get('AccountController');
    const signinController = this._container.get('SigninController');
    const signupController = this._container.get('SignupController');
    const emailConfirmationController = this._container.get(
      'EmailConfirmationController'
    );
    const forgotPasswordController = this._container.get(
      'ForgotPasswordController'
    );
    const termsOfServiceController = this._container.get(
      'TermsOfServiceController'
    );
    const privacyPolicyController = this._container.get(
      'PrivacyPolicyController'
    );
    const resetPasswordController = this._container.get(
      'ResetPasswordController'
    );
    windowController.initialize(renderCount);
    accountController.initialize(renderCount);
    signinController.initialize(renderCount);
    signupController.initialize(renderCount);
    emailConfirmationController.initialize(renderCount);
    forgotPasswordController.initialize(renderCount);
    termsOfServiceController.initialize(renderCount);
    privacyPolicyController.initialize(renderCount);
    resetPasswordController.initialize(renderCount);
  }

  public override load(_renderCount: number): void {}

  public override disposeInitialization(renderCount: number): void {
    const windowController = this._container.get('WindowController');
    const accountController = this._container.get('AccountController');
    const signinController = this._container.get('SigninController');
    const signupController = this._container.get('SignupController');
    const emailConfirmationController = this._container.get(
      'EmailConfirmationController'
    );
    const forgotPasswordController = this._container.get(
      'ForgotPasswordController'
    );
    const termsOfServiceController = this._container.get(
      'TermsOfServiceController'
    );
    const privacyPolicyController = this._container.get(
      'PrivacyPolicyController'
    );
    const resetPasswordController = this._container.get(
      'ResetPasswordController'
    );
    //this._accountPublicController.disposeInitialization(renderCount);
    accountController.disposeInitialization(renderCount);
    //this._exploreController.disposeInitialization(renderCount);
    //this._storeController.disposeInitialization(renderCount);
    //this._eventsController.disposeInitialization(renderCount);
    //this._chatController.disposeInitialization(renderCount);
    //this._cartController.disposeInitialization(renderCount);
    //this._notificationsController.disposeInitialization(renderCount);
    //this._productController.disposeInitialization(renderCount);
    emailConfirmationController.disposeInitialization(renderCount);
    signinController.disposeInitialization(renderCount);
    signupController.disposeInitialization(renderCount);
    forgotPasswordController.disposeInitialization(renderCount);
    //this._checkoutController.disposeInitialization(renderCount);
    //this._orderConfirmedController.disposeInitialization(renderCount);
    termsOfServiceController.disposeInitialization(renderCount);
    privacyPolicyController.disposeInitialization(renderCount);
    //this._permissionsController.disposeInitialization(renderCount);
    //this._helpController.disposeInitialization(renderCount);
    resetPasswordController.disposeInitialization(renderCount);
    windowController.disposeInitialization(renderCount);
    this._model.dispose();
  }

  public override disposeLoad(_renderCount: number): void {}

  public async initializeAsync(renderCount: number): Promise<void> {}

  public async initializeServices(_renderCount: number): Promise<void> {
    const supabaseService = this._container.get('SupabaseService');
    const meiliSearchService = this._container.get('MeiliSearchService');
    const medusaService = this._container.get('MedusaService');
    const bucketService = this._container.get('BucketService');
    try {
      supabaseService.initializeSupabase();
      meiliSearchService.initializeMeiliSearch();
      bucketService.initializeS3();
    } catch (error: any) {
      console.error(error);
    }
  }

  public debugSuspense(value: boolean): void {
    const windowController = this._container.get('WindowController');
    const accountController = this._container.get('AccountController');
    const signinController = this._container.get('SigninController');
    const signupController = this._container.get('SignupController');
    const emailConfirmationController = this._container.get(
      'EmailConfirmationController'
    );
    const forgotPasswordController = this._container.get(
      'ForgotPasswordController'
    );
    const termsOfServiceController = this._container.get(
      'TermsOfServiceController'
    );
    const privacyPolicyController = this._container.get(
      'PrivacyPolicyController'
    );
    const resetPasswordController = this._container.get(
      'ResetPasswordController'
    );

    this.updateSuspense(value);
    windowController.updateSuspense(value);
    // accountPublicController.updateSuspense(value);
    accountController.updateSuspense(value);
    // exploreController.updateSuspense(value);
    // storeController.updateSuspense(value);
    // eventsController.updateSuspense(value);
    // cartController.updateSuspense(value);
    // chatController.updateSuspense(value);
    // notificationsController.updateSuspense(value);
    // productController.updateSuspense(value);
    signinController.updateSuspense(value);
    signupController.updateSuspense(value);
    emailConfirmationController.updateSuspense(value);
    forgotPasswordController.updateSuspense(value);
    // checkoutController.updateSuspense(value);
    // orderConfirmedController.updateSuspense(value);
    termsOfServiceController.updateSuspense(value);
    privacyPolicyController.updateSuspense(value);
    // permissionsController.updateSuspense(value);
    // helpController.updateSuspense(value);
    resetPasswordController.updateSuspense(value);
  }

  public async requestHealthCheckAsync(): Promise<boolean> {
    const logflareService = this._container.get('LogflareService');
    const supabaseService = this._container.get('SupabaseService');
    const accountService = this._container.get('AccountService');
    const medusaService = this._container.get('MedusaService');
    const openWebuiService = this._container.get('OpenWebuiService');

    try {
      if (
        !(await logflareService.requestHealthAsync()) ||
        !(await supabaseService.requestHealthAsync()) ||
        !(await accountService.requestHealthAsync()) ||
        !(await medusaService.requestHealthAsync()) ||
        !(await openWebuiService.requestHealthAsync())
      ) {
        return false;
      }
    } catch (error: any) {
      console.error(error);
      return false;
    }

    return true;
  }
}
