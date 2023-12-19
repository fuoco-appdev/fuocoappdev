import { Core } from './index.ts';
import {
  AccountController,
  MedusaController,
  SecretsController,
  ProductLikesController,
  AccountFollowersController,
} from './controllers/index.ts';

const app = Core.registerApp([
  new AccountController(),
  new MedusaController(),
  new SecretsController(),
  new ProductLikesController(),
  new AccountFollowersController(),
]);
app.listen({ port: 8001 });
