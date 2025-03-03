import { createClient } from '@supabase/supabase-js';
import { DIContainer } from 'rsdi';
import AccountPublicController from '../shared/controllers/account-public.controller';
import AccountController from '../shared/controllers/account.controller';
import AppController from '../shared/controllers/app.controller';
import CartController from '../shared/controllers/cart.controller';
import ChatController from '../shared/controllers/chat.controller';
import CheckoutController from '../shared/controllers/checkout.controller';
import EmailConfirmationController from '../shared/controllers/email-confirmation.controller';
import EventsController from '../shared/controllers/events.controller';
import ExploreController from '../shared/controllers/explore.controller';
import ForgotPasswordController from '../shared/controllers/forgot-password.controller';
import HelpController from '../shared/controllers/help.controller';
import LandingController from '../shared/controllers/landing.controller';
import NotificationsController from '../shared/controllers/notifications.controller';
import OrderConfirmedController from '../shared/controllers/order-confirmed.controller';
import PermissionsController from '../shared/controllers/permissions.controller';
import PrivacyPolicyController from '../shared/controllers/privacy-policy.controller';
import ProductController from '../shared/controllers/product.controller';
import ResetPasswordController from '../shared/controllers/reset-password.controller';
import SigninController from '../shared/controllers/signin.controller';
import SignupController from '../shared/controllers/signup.controller';
import StoreController from '../shared/controllers/store.controller';
import TermsOfServiceController from '../shared/controllers/terms-of-service.controller';
import WindowController from '../shared/controllers/window.controller';
import AccountFollowersService from '../shared/services/account-followers.service';
import AccountNotificationService from '../shared/services/account-notification.service';
import AccountService from '../shared/services/account.service';
import BucketService from '../shared/services/bucket.service';
import ChatService from '../shared/services/chat.service';
import ConfigService from '../shared/services/config.service';
import CryptoService from '../shared/services/crypto.service';
import DeepLService from '../shared/services/deepl.service';
import InterestService from '../shared/services/interest.service';
import LogflareService from '../shared/services/logflare.service';
import MapboxService from '../shared/services/mapbox.service';
import MedusaService from '../shared/services/medusa.service';
import MeiliSearchService from '../shared/services/meilisearch.service';
import OpenWebuiService from '../shared/services/open-webui.service';
import ProductLikesService from '../shared/services/product-likes.service';
import SupabaseService from '../shared/services/supabase.service';
const {
  CRYPTO_ENCRYPTION_KEY,
  CRYPTO_IV,
  HOST,
  LOGFLARE_ACCESS_TOKEN,
  MAPBOX_ACCESS_TOKEN,
  MEDUSA_PUBLIC_KEY,
  MEILISEARCH_PUBLIC_KEY,
  MODE,
  OPEN_WEBUI_API_TOKEN,
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
  SUPABASE_ANON_KEY,
} = import.meta.env;

export type AppDIContainer = ReturnType<typeof register>;

export default function register() {
  const container = new DIContainer();
  return container
    .add('MODE', () => MODE ?? 'development')
    .add('HOST', () => HOST ?? 'localhost')
    .add('S3_ACCESS_KEY_ID', () => S3_ACCESS_KEY_ID ?? '')
    .add('S3_SECRET_ACCESS_KEY', () => S3_SECRET_ACCESS_KEY ?? '')
    .add('CRYPTO_ENCRYPTION_KEY', () => CRYPTO_ENCRYPTION_KEY ?? '')
    .add('CRYPTO_IV', () => CRYPTO_IV ?? '')
    .add('MAPBOX_ACCESS_TOKEN', () => MAPBOX_ACCESS_TOKEN ?? '')
    .add('MEDUSA_PUBLIC_KEY', () => MEDUSA_PUBLIC_KEY ?? '')
    .add('MEILISEARCH_PUBLIC_KEY', () => MEILISEARCH_PUBLIC_KEY ?? '')
    .add('SUPABASE_ANON_KEY', () => SUPABASE_ANON_KEY ?? '')
    .add('OPEN_WEBUI_API_TOKEN', () => OPEN_WEBUI_API_TOKEN ?? '')
    .add('LOGFLARE_ACCESS_TOKEN', () => LOGFLARE_ACCESS_TOKEN ?? '')
    .add('StoreOptions', () => ({
      strategy: {},
    }))
    .add(
      'ConfigService',
      ({ MODE, HOST, SUPABASE_ANON_KEY, StoreOptions }) =>
        new ConfigService(MODE, HOST, SUPABASE_ANON_KEY, StoreOptions)
    )
    .add('SUPABASE_CLIENT', ({ ConfigService, SUPABASE_ANON_KEY }) =>
      createClient(ConfigService.kong.url, SUPABASE_ANON_KEY, {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
        },
      })
    )
    .add(
      'SupabaseService',
      ({ SUPABASE_ANON_KEY, ConfigService, StoreOptions, SUPABASE_CLIENT }) =>
        new SupabaseService(
          SUPABASE_ANON_KEY,
          ConfigService,
          StoreOptions,
          SUPABASE_CLIENT
        )
    )
    .add(
      'LogflareService',
      ({
        LOGFLARE_ACCESS_TOKEN,
        ConfigService,
        SUPABASE_ANON_KEY,
        StoreOptions,
      }) =>
        new LogflareService(
          LOGFLARE_ACCESS_TOKEN,
          ConfigService,
          SUPABASE_ANON_KEY,
          StoreOptions
        )
    )
    .add(
      'AccountFollowersService',
      ({
        SupabaseService,
        LogflareService,
        ConfigService,
        SUPABASE_ANON_KEY,
        StoreOptions,
      }) =>
        new AccountFollowersService(
          SupabaseService,
          LogflareService,
          ConfigService,
          SUPABASE_ANON_KEY,
          StoreOptions
        )
    )
    .add(
      'AccountNotificationService',
      ({
        SupabaseService,
        LogflareService,
        ConfigService,
        SUPABASE_ANON_KEY,
        StoreOptions,
      }) =>
        new AccountNotificationService(
          SupabaseService,
          LogflareService,
          ConfigService,
          SUPABASE_ANON_KEY,
          StoreOptions
        )
    )
    .add(
      'AccountService',
      ({
        SupabaseService,
        LogflareService,
        ConfigService,
        SUPABASE_ANON_KEY,
        StoreOptions,
      }) =>
        new AccountService(
          SupabaseService,
          LogflareService,
          ConfigService,
          SUPABASE_ANON_KEY,
          StoreOptions
        )
    )
    .add(
      'BucketService',
      ({
        S3_ACCESS_KEY_ID,
        S3_SECRET_ACCESS_KEY,
        SupabaseService,
        LogflareService,
        ConfigService,
        SUPABASE_ANON_KEY,
        StoreOptions,
      }) =>
        new BucketService(
          S3_ACCESS_KEY_ID,
          S3_SECRET_ACCESS_KEY,
          SupabaseService,
          LogflareService,
          ConfigService,
          SUPABASE_ANON_KEY,
          StoreOptions
        )
    )
    .add(
      'ChatService',
      ({
        SupabaseService,
        LogflareService,
        ConfigService,
        SUPABASE_ANON_KEY,
        StoreOptions,
      }) =>
        new ChatService(
          SupabaseService,
          LogflareService,
          ConfigService,
          SUPABASE_ANON_KEY,
          StoreOptions
        )
    )
    .add(
      'CryptoService',
      ({
        CRYPTO_ENCRYPTION_KEY,
        CRYPTO_IV,
        LogflareService,
        ConfigService,
        SUPABASE_ANON_KEY,
        StoreOptions,
      }) =>
        new CryptoService(
          CRYPTO_ENCRYPTION_KEY,
          CRYPTO_IV,
          ConfigService,
          LogflareService,
          SUPABASE_ANON_KEY,
          StoreOptions
        )
    )
    .add(
      'DeepLService',
      ({ ConfigService, LogflareService, SUPABASE_ANON_KEY, StoreOptions }) =>
        new DeepLService(
          ConfigService,
          LogflareService,
          SUPABASE_ANON_KEY,
          StoreOptions
        )
    )
    .add(
      'InterestService',
      ({
        SupabaseService,
        ConfigService,
        LogflareService,
        SUPABASE_ANON_KEY,
        StoreOptions,
      }) =>
        new InterestService(
          SupabaseService,
          ConfigService,
          LogflareService,
          SUPABASE_ANON_KEY,
          StoreOptions
        )
    )
    .add(
      'MapboxService',
      ({
        MAPBOX_ACCESS_TOKEN,
        ConfigService,
        LogflareService,
        SUPABASE_ANON_KEY,
        StoreOptions,
      }) =>
        new MapboxService(
          MAPBOX_ACCESS_TOKEN,
          ConfigService,
          LogflareService,
          SUPABASE_ANON_KEY,
          StoreOptions
        )
    )
    .add(
      'MedusaService',
      ({
        MEDUSA_PUBLIC_KEY,
        SupabaseService,
        LogflareService,
        ConfigService,
        SUPABASE_ANON_KEY,
        StoreOptions,
      }) =>
        new MedusaService(
          MEDUSA_PUBLIC_KEY,
          ConfigService,
          SupabaseService,
          LogflareService,
          SUPABASE_ANON_KEY,
          StoreOptions
        )
    )
    .add(
      'MeiliSearchService',
      ({
        MEILISEARCH_PUBLIC_KEY,
        ConfigService,
        LogflareService,
        SUPABASE_ANON_KEY,
        StoreOptions,
      }) =>
        new MeiliSearchService(
          MEILISEARCH_PUBLIC_KEY,
          ConfigService,
          LogflareService,
          SUPABASE_ANON_KEY,
          StoreOptions
        )
    )
    .add(
      'OpenWebuiService',
      ({
        OPEN_WEBUI_API_TOKEN,
        ConfigService,
        LogflareService,
        StoreOptions,
      }) =>
        new OpenWebuiService(
          OPEN_WEBUI_API_TOKEN,
          ConfigService,
          LogflareService,
          SUPABASE_ANON_KEY,
          StoreOptions
        )
    )
    .add(
      'ProductLikesService',
      ({
        SupabaseService,
        ConfigService,
        LogflareService,
        SUPABASE_ANON_KEY,
        StoreOptions,
      }) =>
        new ProductLikesService(
          SupabaseService,
          ConfigService,
          LogflareService,
          SUPABASE_ANON_KEY,
          StoreOptions
        )
    )
    .add(
      'AccountPublicController',
      ({ StoreOptions }) =>
        new AccountPublicController(
          container as DIContainer<{
            MedusaService: MedusaService;
            AccountService: AccountService;
            AccountController: AccountController;
            AccountFollowersService: AccountFollowersService;
            ProductLikesService: ProductLikesService;
            BucketService: BucketService;
          }>,
          StoreOptions
        )
    )
    .add(
      'AccountController',
      ({ StoreOptions }) =>
        new AccountController(
          container as DIContainer<{
            MedusaService: MedusaService;
            AccountService: AccountService;
            SupabaseService: SupabaseService;
            AccountFollowersService: AccountFollowersService;
            InterestService: InterestService;
            ProductLikesService: ProductLikesService;
            BucketService: BucketService;
            OpenWebuiService: OpenWebuiService;
            CryptoService: CryptoService;
          }>,
          StoreOptions
        )
    )
    .add(
      'CartController',
      ({ StoreOptions }) =>
        new CartController(
          container as DIContainer<{
            ExploreController: ExploreController;
            StoreController: StoreController;
            MedusaService: MedusaService;
          }>,
          StoreOptions
        )
    )
    .add(
      'ChatController',
      ({ StoreOptions }) =>
        new ChatController(
          container as DIContainer<{
            AccountService: AccountService;
            MeiliSearchService: MeiliSearchService;
            AccountController: AccountController;
            ChatService: ChatService;
            CryptoService: CryptoService;
          }>,
          StoreOptions
        )
    )
    .add(
      'CheckoutController',
      ({ StoreOptions }) =>
        new CheckoutController(
          container as DIContainer<{
            MedusaService: MedusaService;
            SupabaseService: SupabaseService;
            ExploreController: ExploreController;
            CartController: CartController;
            AccountController: AccountController;
            StoreController: StoreController;
          }>,
          StoreOptions
        )
    )
    .add(
      'EmailConfirmationController',
      ({ StoreOptions }) =>
        new EmailConfirmationController(
          container as DIContainer<{
            SupabaseService: SupabaseService;
          }>,
          StoreOptions
        )
    )
    .add(
      'EventsController',
      ({ StoreOptions }) => new EventsController(container, StoreOptions)
    )
    .add(
      'ExploreController',
      ({ StoreOptions }) =>
        new ExploreController(
          container as DIContainer<{
            MedusaService: MedusaService;
            ExploreController: ExploreController;
            MeiliSearchService: MeiliSearchService;
            BucketService: BucketService;
          }>,
          StoreOptions
        )
    )
    .add(
      'ForgotPasswordController',
      ({ StoreOptions }) =>
        new ForgotPasswordController(
          container as DIContainer<{
            SupabaseService: SupabaseService;
          }>,
          StoreOptions
        )
    )
    .add(
      'HelpController',
      ({ StoreOptions }) => new HelpController(container, StoreOptions)
    )
    .add(
      'NotificationsController',
      ({ StoreOptions }) =>
        new NotificationsController(
          container as DIContainer<{
            AccountController: AccountController;
            AccountFollowersService: AccountFollowersService;
            WindowController: WindowController;
            AccountNotificationService: AccountNotificationService;
          }>,
          StoreOptions
        )
    )
    .add(
      'OrderConfirmedController',
      ({ StoreOptions }) =>
        new OrderConfirmedController(
          container as DIContainer<{
            MedusaService: MedusaService;
            StoreController: StoreController;
          }>,
          StoreOptions
        )
    )
    .add(
      'ProductController',
      ({ StoreOptions }) =>
        new ProductController(
          container as DIContainer<{
            AccountController: AccountController;
            MeiliSearchService: MeiliSearchService;
            StoreController: StoreController;
            ProductLikesService: ProductLikesService;
            AccountPublicController: AccountPublicController;
            MedusaService: MedusaService;
            CartController: CartController;
            ExploreController: ExploreController;
          }>,
          StoreOptions
        )
    )
    .add(
      'ResetPasswordController',
      ({ StoreOptions }) =>
        new ResetPasswordController(
          container as DIContainer<{
            SupabaseService: SupabaseService;
          }>,
          StoreOptions
        )
    )
    .add(
      'SigninController',
      ({ StoreOptions }) =>
        new SigninController(
          container as DIContainer<{
            SupabaseService: SupabaseService;
            WindowController: WindowController;
          }>,
          StoreOptions
        )
    )
    .add(
      'SignupController',
      ({ StoreOptions }) =>
        new SignupController(
          container as DIContainer<{
            SupabaseService: SupabaseService;
          }>,
          StoreOptions
        )
    )
    .add(
      'StoreController',
      ({ StoreOptions }) =>
        new StoreController(
          container as DIContainer<{
            AccountController: AccountController;
            MeiliSearchService: MeiliSearchService;
            StoreController: StoreController;
            ProductLikesService: ProductLikesService;
            MedusaService: MedusaService;
            CartController: CartController;
            ExploreController: ExploreController;
          }>,
          StoreOptions
        )
    )
    .add(
      'TermsOfServiceController',
      ({ StoreOptions }) =>
        new TermsOfServiceController(
          container as DIContainer<{
            SupabaseService: SupabaseService;
          }>,
          StoreOptions
        )
    )
    .add(
      'PrivacyPolicyController',
      ({ StoreOptions }) =>
        new PrivacyPolicyController(
          container as DIContainer<{
            SupabaseService: SupabaseService;
          }>,
          StoreOptions
        )
    )
    .add(
      'PermissionsController',
      ({ StoreOptions }) =>
        new PermissionsController(
          container as DIContainer<{
            SupabaseService: SupabaseService;
          }>,
          StoreOptions
        )
    )
    .add(
      'LandingController',
      ({ StoreOptions }) =>
        new LandingController(container as DIContainer, StoreOptions)
    )
    .add(
      'WindowController',
      ({ StoreOptions }) =>
        new WindowController(
          container as DIContainer<{
            AccountController: AccountController;
            MedusaService: MedusaService;
            CartController: CartController;
            ExploreController: ExploreController;
            SupabaseService: SupabaseService;
            AccountService: AccountService;
            AccountNotificationService: AccountNotificationService;
            NotificationsController: NotificationsController;
          }>,
          StoreOptions
        )
    )
    .add(
      'AppController',
      ({ StoreOptions }) =>
        new AppController(
          container as DIContainer<{
            AccountController: AccountController;
            LogflareService: LogflareService;
            MedusaService: MedusaService;
            SupabaseService: SupabaseService;
            AccountService: AccountService;
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
          StoreOptions
        )
    );
}
