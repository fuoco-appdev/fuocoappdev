/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from '../controller';
import SecretsService from '../services/secrets.service';
import BucketService from '../services/bucket.service';
import MedusaService from '../services/medusa.service';
import WindowController from '../controllers/window.controller';
import SigninController from '../controllers/signin.controller';
import SignupController from '../controllers/signup.controller';
import ForgotPasswordController from './forgot-password.controller';
import HomeController from '../controllers/home.controller';
import StoreController from '../controllers/store.controller';
import EventsController from '../controllers/events.controller';
import CartController from '../controllers/cart.controller';
import CheckoutController from '../controllers/checkout.controller';
import OrderConfirmedController from '../controllers/order-confirmed.controller';
import NotificationsController from '../controllers/notifications.controller';
import TermsOfServiceController from '../controllers/terms-of-service.controller';
import PrivacyPolicyController from '../controllers/privacy-policy.controller';
import PermissionsController from './permissions.controller';
import HelpController from '../controllers/help.controller';
import LoadingController from '../controllers/loading.controller';
import ResetPasswordController from '../controllers/reset-password.controller';
import AccountController from '../controllers/account.controller';
import ProductController from '../controllers/product.controller';
import SupabaseService from '../services/supabase.service';
import MeilisearchService from '../services/meilisearch.service';
import DeepLService from '../services/deepl.service';

class AppController extends Controller {
  constructor() {
    super();
  }

  public override initialize(renderCount: number): void {
    this.initializeAsync(renderCount);
  }

  public override dispose(renderCount: number): void {
    SecretsService.clearPublicSecrets();

    WindowController.dispose(renderCount);
    SigninController.dispose(renderCount);
    SignupController.dispose(renderCount);
    ForgotPasswordController.dispose(renderCount);
    TermsOfServiceController.dispose(renderCount);
    PrivacyPolicyController.dispose(renderCount);
    PermissionsController.dispose(renderCount);
    HelpController.dispose(renderCount);
    ResetPasswordController.dispose(renderCount);
    AccountController.dispose(renderCount);
    LoadingController.dispose(renderCount);
    HomeController.dispose(renderCount);
    StoreController.dispose(renderCount);
    EventsController.dispose(renderCount);
    CartController.dispose(renderCount);
    CheckoutController.dispose(renderCount);
    OrderConfirmedController.dispose(renderCount);
    NotificationsController.dispose(renderCount);
    ProductController.dispose(renderCount);
  }

  public async initializeAsync(renderCount: number): Promise<void> {
    this.dispose(renderCount);

    await this.requestPublicSecretsAsync();

    WindowController.initialize(renderCount);
    LoadingController.initialize(renderCount);
    SigninController.initialize(renderCount);
    SignupController.initialize(renderCount);
    ResetPasswordController.initialize(renderCount);
    ForgotPasswordController.initialize(renderCount);
    TermsOfServiceController.initialize(renderCount);
    PrivacyPolicyController.initialize(renderCount);
    PermissionsController.initialize(renderCount);
    HelpController.initialize(renderCount);
    AccountController.initialize(renderCount);
    HomeController.initialize(renderCount);
    StoreController.initialize(renderCount);
    EventsController.initialize(renderCount);
    CartController.initialize(renderCount);
    CheckoutController.initialize(renderCount);
    OrderConfirmedController.initialize(renderCount);
    NotificationsController.initialize(renderCount);
    ProductController.initialize(renderCount);
  }

  private async requestPublicSecretsAsync(): Promise<void> {
    try {
      const secrets = await SecretsService.requestPublicAsync();
      SupabaseService.initializeSupabase(secrets.supabaseAnonKey);
      MeilisearchService.initializeMeiliSearch(secrets.meilisearchPublicKey);
      MedusaService.intializeMedusa(secrets.medusaPublicKey);
      DeepLService.initializeDeepL(secrets.deeplAuthKey);
    } catch (error: any) {
      console.error(error);
    }
  }
}

export default new AppController();
