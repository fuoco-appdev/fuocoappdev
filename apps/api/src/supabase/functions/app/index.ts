import { Core } from '../index.ts';
import { AppController } from '../controllers/index.ts';
import SupabaseService from '../services/supabase.service.ts';

SupabaseService.createClient();
const app = Core.registerApp([new AppController()]);
app.listen({ port: 8000 });
