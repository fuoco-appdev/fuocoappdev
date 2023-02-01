import { Core, corsOptionsDelegate } from '../index.ts';
import { SecretsController } from '../controllers/index.ts';

const app = Core.registerApp([new SecretsController()], corsOptionsDelegate);
app.listen({ port: 8000 });
