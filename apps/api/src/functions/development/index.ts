import { Core } from '../../index.ts';
import {
  AppController,
  UserController,
  AccountController,
  SecretsController,
  CustomerController,
} from '../../controllers/index.ts';

const app = Core.registerApp([
  new UserController(),
  new CustomerController(),
  new AccountController(),
  new AppController(),
  new SecretsController(),
]);
app.listen({ port: 8000 });
