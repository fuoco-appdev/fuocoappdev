import { Core } from './index.ts';
import {
  AccountController,
  MedusaController,
  ProductLikesController,
  AccountFollowersController,
  AccountNotificationController,
  DeepLController,
} from './controllers/index.ts';

const app = Core.registerApp([
  new AccountController(),
  new MedusaController(),
  new ProductLikesController(),
  new AccountFollowersController(),
  new AccountNotificationController(),
  new DeepLController(),
]);
app.listen({ port: 8001 });
