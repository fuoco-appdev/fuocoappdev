import { IAxiodResponse } from 'https://deno.land/x/axiod@0.26.2/interfaces.ts';
import axiod from 'https://deno.land/x/axiod@0.26.2/mod.ts';
import { Service } from 'https://deno.land/x/di@v0.1.1/mod.ts';
import 'https://deno.land/x/dotenv@v3.2.0/load.ts';

export interface MailConfig {
  fromEmail: string;
  fromName: string;
  toEmail: string;
  toName: string;
  subject: string;
  content: string;
  contentType?: string;
}

@Service()
export default class MailService {
  private _apiKey: string | undefined;
  constructor() {
    this._apiKey = Deno.env.get('SENDGRID_API_KEY');
    if (!this._apiKey) {
      throw new Error("SENDGRID_API_KEY doesn't exist");
    }
  }

  public async sendAsync({
    fromEmail,
    fromName,
    toEmail,
    toName,
    subject,
    content,
    contentType = 'text/plain',
  }: MailConfig): Promise<IAxiodResponse> {
    return await axiod({
      method: 'post',
      url: 'https://api.sendgrid.com/v3/mail/send',
      headers: {
        Authorization: `Bearer ${this._apiKey}`,
        'Content-Type': 'application/json',
      },
      data: {
        personalizations: [
          {
            to: [
              {
                email: toEmail,
                name: fromName,
              },
            ],
            subject: subject,
          },
        ],
        content: [
          {
            type: contentType,
            value: content,
          },
        ],
        from: {
          email: fromEmail,
          name: fromName,
        },
        reply_to: {
          email: toEmail,
          name: toName,
        },
      },
    });
  }
}
