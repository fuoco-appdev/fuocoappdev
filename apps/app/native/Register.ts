import {
  CRYPTO_ENCRYPTION_KEY,
  CRYPTO_IV,
  HOST,
  MAPBOX_ACCESS_TOKEN,
  MEDUSA_PUBLIC_KEY,
  MEILISEARCH_PUBLIC_KEY,
  MODE,
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
  SUPABASE_ANON_KEY,
} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import 'reflect-metadata';
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
import MapboxService from '../shared/services/mapbox.service';
import MedusaService from '../shared/services/medusa.service';
import MeiliSearchService from '../shared/services/meilisearch.service';
import ProductLikesService from '../shared/services/product-likes.service';
import SupabaseService from '../shared/services/supabase.service';

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
    .add('StoreOptions', () => ({
      strategy: {
        local: AsyncStorage,
        session: AsyncStorage,
      },
    }))
    .add(
      'ConfigService',
      ({ MODE, HOST, SUPABASE_ANON_KEY, StoreOptions }) =>
        new ConfigService(MODE, HOST, SUPABASE_ANON_KEY, StoreOptions)
    )
    .add('SUPABASE_CLIENT', ({ ConfigService, SUPABASE_ANON_KEY }) =>
      createClient(ConfigService.supabase.url, SUPABASE_ANON_KEY, {
        auth: {
          storage: AsyncStorage,
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
      'AccountFollowersService',
      ({ SupabaseService, ConfigService, SUPABASE_ANON_KEY, StoreOptions }) =>
        new AccountFollowersService(
          SupabaseService,
          ConfigService,
          SUPABASE_ANON_KEY,
          StoreOptions
        )
    )
    .add(
      'AccountNotificationService',
      ({ SupabaseService, ConfigService, SUPABASE_ANON_KEY, StoreOptions }) =>
        new AccountNotificationService(
          SupabaseService,
          ConfigService,
          SUPABASE_ANON_KEY,
          StoreOptions
        )
    )
    .add(
      'AccountService',
      ({ SupabaseService, ConfigService, SUPABASE_ANON_KEY, StoreOptions }) =>
        new AccountService(
          SupabaseService,
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
        ConfigService,
        SUPABASE_ANON_KEY,
        StoreOptions,
      }) =>
        new BucketService(
          S3_ACCESS_KEY_ID,
          S3_SECRET_ACCESS_KEY,
          SupabaseService,
          ConfigService,
          SUPABASE_ANON_KEY,
          StoreOptions
        )
    )
    .add(
      'ChatService',
      ({ SupabaseService, ConfigService, SUPABASE_ANON_KEY, StoreOptions }) =>
        new ChatService(
          SupabaseService,
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
        ConfigService,
        SUPABASE_ANON_KEY,
        StoreOptions,
      }) =>
        new CryptoService(
          CRYPTO_ENCRYPTION_KEY,
          CRYPTO_IV,
          ConfigService,
          SUPABASE_ANON_KEY,
          StoreOptions
        )
    )
    .add(
      'DeepLService',
      ({ ConfigService, SUPABASE_ANON_KEY, StoreOptions }) =>
        new DeepLService(ConfigService, SUPABASE_ANON_KEY, StoreOptions)
    )
    .add(
      'InterestService',
      ({ SupabaseService, ConfigService, SUPABASE_ANON_KEY, StoreOptions }) =>
        new InterestService(
          SupabaseService,
          ConfigService,
          SUPABASE_ANON_KEY,
          StoreOptions
        )
    )
    .add(
      'MapboxService',
      ({
        MAPBOX_ACCESS_TOKEN,
        ConfigService,
        SUPABASE_ANON_KEY,
        StoreOptions,
      }) =>
        new MapboxService(
          MAPBOX_ACCESS_TOKEN,
          ConfigService,
          SUPABASE_ANON_KEY,
          StoreOptions
        )
    )
    .add(
      'MedusaService',
      ({
        MEDUSA_PUBLIC_KEY,
        SupabaseService,
        ConfigService,
        SUPABASE_ANON_KEY,
        StoreOptions,
      }) =>
        new MedusaService(
          MEDUSA_PUBLIC_KEY,
          ConfigService,
          SupabaseService,
          SUPABASE_ANON_KEY,
          StoreOptions
        )
    )
    .add(
      'MeiliSearchService',
      ({
        MEILISEARCH_PUBLIC_KEY,
        SupabaseService,
        ConfigService,
        SUPABASE_ANON_KEY,
        StoreOptions,
      }) =>
        new MeiliSearchService(
          MEILISEARCH_PUBLIC_KEY,
          ConfigService,
          SUPABASE_ANON_KEY,
          StoreOptions
        )
    )
    .add(
      'ProductLikesService',
      ({ SupabaseService, ConfigService, SUPABASE_ANON_KEY, StoreOptions }) =>
        new ProductLikesService(
          SupabaseService,
          ConfigService,
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
          }>,
          StoreOptions
        )
    )
    .add(
      'PermissionsController',
      ({ StoreOptions }) =>
        new PermissionsController(container as DIContainer<{}>, StoreOptions)
    )
    .add(
      'PrivacyPolicyController',
      ({ StoreOptions }) =>
        new PrivacyPolicyController(container as DIContainer<{}>, StoreOptions)
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
            MedusaService: MedusaService;
            SupabaseService: SupabaseService;
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
