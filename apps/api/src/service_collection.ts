import { ServiceCollection } from 'https://deno.land/x/di@v0.1.1/mod.ts';
import AccountService from './services/account.service.ts';
import BucketService from './services/bucket.service.ts';
import CryptoService from './services/crypto.service.ts';
import DeepLService from './services/deepl.service.ts';
import DeviceService from './services/device.service.ts';
import InterestService from './services/interest.service.ts';
import MapboxService from './services/mapbox.service.ts';
import MedusaService from './services/medusa.service.ts';
import MeiliSearchService from './services/meilisearch.service.ts';
import SupabaseService from './services/supabase.service.ts';

export const serviceTypes = {
  AccountFollowersService: Symbol('AccountFollowersService'),
  AccountNotificationService: Symbol('AccountNotificationService'),
  AccountService: Symbol('AccountService'),
  BucketService: Symbol('BucketService'),
  ChatService: Symbol('ChatService'),
  CryptoService: Symbol('CryptoService'),
  DeepLService: Symbol('DeepLService'),
  DeviceService: Symbol('DeviceService'),
  InterestService: Symbol('InterestService'),
  MailService: Symbol('MailService'),
  MapboxService: Symbol('MapboxService'),
  MedusaService: Symbol('MedusaService'),
  MeiliSearchService: Symbol('MeiliSearchService'),
  ProductLikesService: Symbol('ProductLikesService'),
  RedisService: Symbol('RedisService'),
  SupabaseService: Symbol('SupabaseService'),
};

const serviceCollection = new ServiceCollection();
// serviceCollection.addTransient(
//   serviceTypes.AccountFollowersService,
//   AccountFollowersService
// );
// serviceCollection.addTransient(
//   serviceTypes.AccountNotificationService,
//   AccountNotificationService
// );
//serviceCollection.addTransient(serviceTypes.RedisService, RedisService);
serviceCollection.addTransient(serviceTypes.MedusaService, MedusaService);
serviceCollection.addTransient(serviceTypes.AccountService, AccountService);
serviceCollection.addTransient(serviceTypes.BucketService, BucketService);
// serviceCollection.addTransient(serviceTypes.ChatService, ChatService);
serviceCollection.addTransient(serviceTypes.CryptoService, CryptoService);
serviceCollection.addTransient(serviceTypes.DeepLService, DeepLService);
serviceCollection.addTransient(serviceTypes.DeviceService, DeviceService);
serviceCollection.addTransient(serviceTypes.InterestService, InterestService);
// serviceCollection.addTransient(serviceTypes.MailService, MailService);
serviceCollection.addTransient(serviceTypes.MapboxService, MapboxService);
serviceCollection.addTransient(
  serviceTypes.MeiliSearchService,
  MeiliSearchService
);
// serviceCollection.addTransient(
//   serviceTypes.ProductLikesService,
//   ProductLikesService
// );
serviceCollection.addTransient(serviceTypes.SupabaseService, SupabaseService);

export default serviceCollection;
