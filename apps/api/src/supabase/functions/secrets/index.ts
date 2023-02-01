import { Core } from '../index.ts';
import { SecretsController } from '../controllers/index.ts';

const app = Core.registerApp([new SecretsController()]);
app.listen({ port: 8000 });
