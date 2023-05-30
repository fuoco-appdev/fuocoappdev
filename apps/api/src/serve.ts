import { Core } from './index.ts';
import { AccountController, MedusaController } from './controllers/index.ts';

const app = Core.registerApp([new AccountController(), new MedusaController()]);
app.listen({ port: 8001 });
