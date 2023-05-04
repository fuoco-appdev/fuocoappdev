import { Core } from './index.ts';
import { AccountController } from './controllers/index.ts';

const app = Core.registerApp([new AccountController()]);
app.listen({ port: 8001 });
