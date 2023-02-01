import { Core, corsOptionsDelegate } from '../index.ts';
import { AppController } from '../controllers/index.ts';

const app = Core.registerApp([new AppController()], corsOptionsDelegate);
app.listen({ port: 8000 });
