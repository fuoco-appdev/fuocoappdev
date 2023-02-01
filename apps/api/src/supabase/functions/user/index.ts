import { Core, corsOptionsDelegate } from '../index.ts';
import { UserController } from '../controllers/index.ts';

const app = Core.registerApp([new UserController()], corsOptionsDelegate);
app.listen({ port: 8000 });
