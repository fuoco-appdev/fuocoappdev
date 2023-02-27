import { Secrets } from '../protobuf/core_pb.js';
import 'https://deno.land/x/dotenv@v3.2.0/load.ts';

class SecretsService {
  private _mapboxAccessToken: string | undefined;
  constructor() {
    this._mapboxAccessToken = Deno.env.get('MAPBOX_ACCESS_TOKEN');
    if (!this._mapboxAccessToken) {
      throw new Error("MAPBOX_ACCESS_TOKEN doesn't exist");
    }
  }

  public getSecrets(): InstanceType<typeof Secrets> {
    const secrets = new Secrets();
    secrets.setMapboxAccessToken(this._mapboxAccessToken ?? '');

    return secrets;
  }
}

export default new SecretsService();
