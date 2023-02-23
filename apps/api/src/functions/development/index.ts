import { Core } from '../../index.ts';
import {
  AppController,
  UserController,
  AccountController,
  SecretsController,
} from '../../controllers/index.ts';

const app = Core.registerApp([
  new UserController(),
  new AccountController(),
  new AppController(),
  new SecretsController(),
]);
app.listen({ port: 8000 });
