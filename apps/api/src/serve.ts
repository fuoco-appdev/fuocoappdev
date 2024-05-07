import {
  AccountController,
  AccountFollowersController,
  AccountNotificationController,
  ChatController,
  DeepLController,
  DeviceController,
  InterestController,
  MedusaController,
  ProductLikesController
} from "./controllers/index.ts";
import { Core } from "./index.ts";

const app = Core.registerApp([
  new AccountController(),
  new MedusaController(),
  new ProductLikesController(),
  new AccountFollowersController(),
  new AccountNotificationController(),
  new DeepLController(),
  new DeviceController(),
  new InterestController(),
  new ChatController()
]);
app.listen({ port: 8001 });
