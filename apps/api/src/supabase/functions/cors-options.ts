import { CorsOptionsDelegate } from 'https://deno.land/x/cors@v1.2.2/mod.ts';

export const corsOptionsDelegate: CorsOptionsDelegate<Request> = () => {
  return {
    origin: '*',
    allowedHeaders: [
      'authorization',
      'x-client-info',
      'apikey',
      'content-type',
      'session-token',
    ],
  };
};
