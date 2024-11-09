import 'https://cdn.skypack.dev/@abraham/reflection@%5E0.7.0';
import { AccountController, MedusaController } from './controllers/index.ts';
import { Core } from './index.ts';

const app = Core.registerApp([new AccountController(), new MedusaController()]);
app.listen({ port: 8001 });
