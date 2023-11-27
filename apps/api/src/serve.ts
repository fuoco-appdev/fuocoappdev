import { Core } from './index.ts';
import {
  AccountController,
  MedusaController,
  SecretsController,
  ProductLikesController,
} from './controllers/index.ts';

const app = Core.registerApp([
  new AccountController(),
  new MedusaController(),
  new SecretsController(),
  new ProductLikesController(),
]);
app.listen({ port: 8001 });
