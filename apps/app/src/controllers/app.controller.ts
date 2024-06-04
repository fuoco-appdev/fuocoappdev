/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from '../controller';
import AccountPublicController from '../controllers/account-public.controller';
import AccountController from '../controllers/account.controller';
import CartController from '../controllers/cart.controller';
import ChatController from '../controllers/chat.controller';
import CheckoutController from '../controllers/checkout.controller';
import EventsController from '../controllers/events.controller';
import HelpController from '../controllers/help.controller';
import NotificationsController from '../controllers/notifications.controller';
import OrderConfirmedController from '../controllers/order-confirmed.controller';
import PrivacyPolicyController from '../controllers/privacy-policy.controller';
import ProductController from '../controllers/product.controller';
import ResetPasswordController from '../controllers/reset-password.controller';
import SigninController from '../controllers/signin.controller';
import SignupController from '../controllers/signup.controller';
import StoreController from '../controllers/store.controller';
import TermsOfServiceController from '../controllers/terms-of-service.controller';
import WindowController from '../controllers/window.controller';
import BucketService from '../services/bucket.service';
import MedusaService from '../services/medusa.service';
import MeilisearchService from '../services/meilisearch.service';
import SupabaseService from '../services/supabase.service';
import EmailConfirmationController from './email-confirmation.controller';
import ExploreController from './explore.controller';
import ForgotPasswordController from './forgot-password.controller';
import PermissionsController from './permissions.controller';

class AppController extends Controller {
  constructor() {
    super();
  }

  public override initialize(renderCount: number): void {
    this.initializeAsync(renderCount);
  }

  public override load(_renderCount: number): void { }

  public override disposeInitialization(renderCount: number): void {
    AccountPublicController.disposeInitialization(renderCount);
    AccountController.disposeInitialization(renderCount);
    ExploreController.disposeInitialization(renderCount);
    StoreController.disposeInitialization(renderCount);
    EventsController.disposeInitialization(renderCount);
    ChatController.disposeInitialization(renderCount);
    CartController.disposeInitialization(renderCount);
    NotificationsController.disposeInitialization(renderCount);
    ProductController.disposeInitialization(renderCount);
    EmailConfirmationController.disposeInitialization(renderCount);
    SigninController.disposeInitialization(renderCount);
    SignupController.disposeInitialization(renderCount);
    ForgotPasswordController.disposeInitialization(renderCount);
    CheckoutController.disposeInitialization(renderCount);
    OrderConfirmedController.disposeInitialization(renderCount);
    TermsOfServiceController.disposeInitialization(renderCount);
    PrivacyPolicyController.disposeInitialization(renderCount);
    PermissionsController.disposeInitialization(renderCount);
    HelpController.disposeInitialization(renderCount);
    ResetPasswordController.disposeInitialization(renderCount);
    WindowController.disposeInitialization(renderCount);
  }

  public override disposeLoad(_renderCount: number): void { }

  public async initializeAsync(renderCount: number): Promise<void> {
    WindowController.initialize(renderCount);
    AccountPublicController.initialize(renderCount);
    AccountController.initialize(renderCount);
    ExploreController.initialize(renderCount);
    StoreController.initialize(renderCount);
    EventsController.initialize(renderCount);
    CartController.initialize(renderCount);
    ChatController.initialize(renderCount);
    NotificationsController.initialize(renderCount);
    ProductController.initialize(renderCount);
    SigninController.initialize(renderCount);
    SignupController.initialize(renderCount);
    EmailConfirmationController.initialize(renderCount);
    ForgotPasswordController.initialize(renderCount);
    CheckoutController.initialize(renderCount);
    OrderConfirmedController.initialize(renderCount);
    TermsOfServiceController.initialize(renderCount);
    PrivacyPolicyController.initialize(renderCount);
    PermissionsController.initialize(renderCount);
    HelpController.initialize(renderCount);
    ResetPasswordController.initialize(renderCount);
  }

  public async initializeServices(_renderCount: number): Promise<void> {
    try {
      SupabaseService.initializeSupabase();
      MeilisearchService.initializeMeiliSearch();
      MedusaService.intializeMedusa();
      BucketService.initializeS3();
    } catch (error: any) {
      console.error(error);
    }
  }
}

export default new AppController();
