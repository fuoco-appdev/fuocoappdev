import { Core } from '../index.ts';
import { SecretsController } from '../controllers/index.ts';
import SupabaseService from '../services/supabase.service.ts';

SupabaseService.createClient();
const app = Core.registerApp([new SecretsController()]);
app.listen({ port: 8000 });
