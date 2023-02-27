import { Core } from '../../index.ts';
import { UserController } from '../../controllers/index.ts';

const app = Core.registerApp([new UserController()]);
app.listen({ port: 8000 });
