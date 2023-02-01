import { Core } from '../index.ts';
import { AppController } from '../controllers/index.ts';

const app = Core.registerApp([new AppController()]);
app.listen({ port: 8000 });
