import 'https://deno.land/x/dotenv@v3.2.0/load.ts';
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { IAxiodResponse } from 'https://deno.land/x/axiod@0.26.2/interfaces.ts';

export interface MailConfig {
  from: string;
  fromName: string;
  to: string;
  toName: string;
  subject: string;
  content: string;
  contentType?: string;
}

class MailService {
  private _apiKey: string | undefined;
  constructor() {
    this._apiKey = Deno.env.get('SENDGRID_API_KEY');
    if (!this._apiKey) {
      throw new Error("SENDGRID_API_KEY doesn't exist");
    }
  }

  public async sendAsync({
    from,
    fromName,
    to,
    toName,
    subject,
    content,
    contentType = 'text/plain'
  }: MailConfig): Promise<IAxiodResponse> {
    return await axiod({
      method: "post",
      url: "https://api.sendgrid.com/v3/mail/send",
      headers: {
        'Authorization': `Bearer ${this._apiKey}`,
        'Content-Type': 'application/json'
      },
      data: {
        personalizations: [
          {
            to: [
              { 
                email: to,
                name: fromName
              }
            ], 
            subject: subject
          }
        ],
        content: [
          {
            type: contentType,
            value: content
          }
        ],
        from: {
          email: from,
          name: fromName
        },
        reply_to: {
          email: to,
          name: toName
        }
      },
    });
  }
}

export default new MailService();
