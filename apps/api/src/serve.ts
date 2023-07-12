import { Core } from './index.ts';
import {
  AccountController,
  MedusaController,
  SecretsController,
} from './controllers/index.ts';

const app = Core.registerApp([
  new AccountController(),
  new MedusaController(),
  new SecretsController(),
]);
app.listen({ port: 8001 });
