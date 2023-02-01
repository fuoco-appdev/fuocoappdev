import { Core, corsHeaders } from '../index.ts';
import { UserController } from '../controllers/index.ts';

const app = Core.registerApp([new UserController()], corsHeaders);
app.listen({ port: 8000 });
