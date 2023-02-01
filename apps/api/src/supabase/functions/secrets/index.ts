import { Core, corsHeaders } from '../index.ts';
import { SecretsController } from '../controllers/index.ts';

const app = Core.registerApp([new SecretsController()], corsHeaders);
app.listen({ port: 8000 });
