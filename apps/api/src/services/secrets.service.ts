import { Secrets } from '../protobuf/core_pb.js';
import 'https://deno.land/x/dotenv@v3.2.0/load.ts';

class SecretsService {
  private _s3AccessKeyId: string | undefined;
  private _s3SecretAccessKey: string | undefined;

  constructor() {
    this._s3AccessKeyId = Deno.env.get('S3_ACCESS_KEY_ID');
    this._s3SecretAccessKey = Deno.env.get('S3_SECRET_ACCESS_KEY');
    if (!this._s3AccessKeyId) {
      throw new Error("S3_ACCESS_KEY_ID doesn't exist");
    }
    if (!this._s3SecretAccessKey) {
      throw new Error("S3_SECRET_ACCESS_KEY doesn't exist");
    }
  }

  public getSecrets(): InstanceType<typeof Secrets> {
    const secrets = new Secrets();
    secrets.setS3AccessKeyId(this._s3AccessKeyId ?? '');
    secrets.setS3SecretAccessKey(this._s3SecretAccessKey ?? '');

    return secrets;
  }
}

export default new SecretsService();
