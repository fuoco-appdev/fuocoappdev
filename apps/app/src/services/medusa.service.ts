import Medusa from '@medusajs/medusa-js';
import ConfigService from './config.service';

class MedusaService {
  private readonly _medusa: Medusa;

  constructor() {
    this._medusa = new Medusa({
      baseUrl: ConfigService.medusa.url,
      apiKey: ConfigService.medusa.key,
      maxRetries: 3,
    });
  }

  public get medusa(): Medusa {
    return this._medusa;
  }
}

export default new MedusaService();
