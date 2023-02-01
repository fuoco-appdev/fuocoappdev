import { CorsOptionsDelegate } from 'https://deno.land/x/cors@v1.2.2/mod.ts';

export const corsOptionsDelegate: CorsOptionsDelegate<Request> = () => {
  return {
    origin: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'session-token'],
  };
};
