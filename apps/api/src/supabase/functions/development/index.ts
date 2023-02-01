import { Core } from '../index.ts';
import {
  AppController,
  UserController,
  SecretsController,
} from '../controllers/index.ts';
import BucketService from '../services/bucket.service.ts';
import { corsHeaders } from '../index.ts';

await BucketService.initializeDevelopmentAsync();
const app = Core.registerApp(
  [new UserController(), new AppController(), new SecretsController()],
  corsHeaders
);
app.listen({ port: 8000 });
