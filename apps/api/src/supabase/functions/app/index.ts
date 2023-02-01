import { Core, corsHeaders } from '../index.ts';
import { AppController } from '../controllers/index.ts';

const app = Core.registerApp([new AppController()], corsHeaders);
app.listen({ port: 8000 });
