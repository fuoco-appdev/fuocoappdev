import { Core } from '../../index.ts';
import { CustomerController } from '../../controllers/index.ts';

const app = Core.registerApp([new CustomerController()]);
app.listen({ port: 8000 });
