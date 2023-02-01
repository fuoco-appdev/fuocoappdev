import { Core } from '../index.ts';
import { UserController } from '../controllers/index.ts';
import SupabaseService from '../services/supabase.service.ts';

SupabaseService.createClient();
const app = Core.registerApp([new UserController()]);
app.listen({ port: 8000 });
