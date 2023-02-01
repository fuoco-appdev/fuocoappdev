import { Core } from '../index.ts';
import {
  AppController,
  UserController,
  SecretsController,
} from '../controllers/index.ts';
import BucketService from '../services/bucket.service.ts';
import SupabaseService from '../services/supabase.service.ts';

SupabaseService.createClient({ isLocal: true });
await BucketService.initializeDevelopmentAsync();
const app = Core.registerApp([
  new UserController(),
  new AppController(),
  new SecretsController(),
]);
app.listen({ port: 8000 });
