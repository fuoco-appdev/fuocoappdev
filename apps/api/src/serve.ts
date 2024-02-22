import { Core } from "./index.ts";
import {
  AccountController,
  AccountFollowersController,
  AccountNotificationController,
  DeepLController,
  DeviceController,
  MedusaController,
  ProductLikesController,
} from "./controllers/index.ts";

const app = Core.registerApp([
  new AccountController(),
  new MedusaController(),
  new ProductLikesController(),
  new AccountFollowersController(),
  new AccountNotificationController(),
  new DeepLController(),
  new DeviceController(),
]);
app.listen({ port: 8001 });
