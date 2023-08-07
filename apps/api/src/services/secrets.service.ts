import { PublicSecrets, PrivateSecrets } from '../protobuf/core_pb.js';
import 'https://deno.land/x/dotenv@v3.2.0/load.ts';

class SecretsService {
  private _s3AccessKeyId: string | undefined;
  private _s3SecretAccessKey: string | undefined;
  private _supabaseAnonKey: string | undefined;
  private _medusaPublicKey: string | undefined;
  private _meilisearchPublicKey: string | undefined;
  private _mapboxAccessToken: string | undefined;
  private _stripePublishableKey: string | undefined;

  constructor() {
    this._s3AccessKeyId = Deno.env.get('S3_ACCESS_KEY_ID');
    this._s3SecretAccessKey = Deno.env.get('S3_SECRET_ACCESS_KEY');
    this._supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
    this._medusaPublicKey = Deno.env.get('MEDUSA_PUBLIC_KEY');
    this._meilisearchPublicKey = Deno.env.get('MEILISEARCH_PUBLIC_KEY');
    this._mapboxAccessToken = Deno.env.get('MAPBOX_ACCESS_TOKEN');
    this._stripePublishableKey = Deno.env.get('STRIPE_PUBLISHABLE_KEY');
    if (!this._s3AccessKeyId) {
      throw new Error("S3_ACCESS_KEY_ID doesn't exist");
    }
    if (!this._s3SecretAccessKey) {
      throw new Error("S3_SECRET_ACCESS_KEY doesn't exist");
    }
    if (!this._supabaseAnonKey) {
      throw new Error("SUPABASE_ANON_KEY doesn't exist");
    }
    if (!this._medusaPublicKey) {
      throw new Error("MEDUSA_PUBLIC_KEY doesn't exist");
    }
    if (!this._meilisearchPublicKey) {
      throw new Error("MEILISEARCH_PUBLIC_KEY doesn't exist");
    }
    if (!this._mapboxAccessToken) {
      throw new Error("MAPBOX_ACCESS_TOKEN doesn't exist");
    }
    if (!this._stripePublishableKey) {
      throw new Error("STRIPE_PUBLISHABLE_KEY doesn't exist");
    }
  }

  public getPublicSecrets(): InstanceType<typeof PublicSecrets> {
    const secrets = new PublicSecrets();
    secrets.setSupabaseAnonKey(this._supabaseAnonKey ?? '');
    secrets.setMedusaPublicKey(this._medusaPublicKey ?? '');
    secrets.setMeilisearchPublicKey(this._meilisearchPublicKey ?? '');
    secrets.setMapboxAccessToken(this._mapboxAccessToken ?? '');
    secrets.setStripePublishableKey(this._stripePublishableKey ?? '');

    return secrets;
  }

  public getPrivateSecrets(): InstanceType<typeof PrivateSecrets> {
    const secrets = new PrivateSecrets();
    secrets.setS3AccessKeyId(this._s3AccessKeyId ?? '');
    secrets.setS3SecretAccessKey(this._s3SecretAccessKey ?? '');

    return secrets;
  }
}

export default new SecretsService();
