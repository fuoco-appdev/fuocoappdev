import { Core } from './index.ts';
import {
  AccountController,
  MedusaController,
  ProductLikesController,
  AccountFollowersController,
  AccountNotificationController,
} from './controllers/index.ts';

const app = Core.registerApp([
  new AccountController(),
  new MedusaController(),
  new ProductLikesController(),
  new AccountFollowersController(),
  new AccountNotificationController(),
]);
app.listen({ port: 8001 });
