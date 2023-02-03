import { CoreMailService } from '../index.ts';

class MailService extends CoreMailService {
  constructor() {
    const host = Deno.env.get('SMTP_HOST');
    const port = Number(Deno.env.get('SMTP_PORT'));
    const user = Deno.env.get('SMTP_USER');
    const password = Deno.env.get('SMTP_PASS');
    const secure = Deno.env.get('SMTP_SECURE') === 'true';
    if (!host) {
      throw new Error("SMTP_HOST doesn't exist");
    }
    if (!port) {
      throw new Error("SMTP_PORT doesn't exist");
    }

    super({
      debug: {
        allowUnsecure: true,
      },
      connection: {
        hostname: host,
        port: port,
        tls: secure,
        auth: {
          username: user ?? '',
          password: password ?? '',
        },
      },
    });
  }
}

export default new MailService();
