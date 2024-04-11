import { Core } from "./index.ts";
import {
  AccountController,
  AccountFollowersController,
  AccountNotificationController,
  DeepLController,
  DeviceController,
  InterestController,
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
  new InterestController(),
]);
app.listen({ port: 8001 });
