import { Service } from '../service';
import * as core from '../protobuf/core_pb';
import { Session } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import SupabaseService from './supabase.service';
import axios from 'axios';

class SecretsService extends Service {
  private readonly _publicSecretsBehaviorSubject: BehaviorSubject<core.PublicSecrets | null>;
  private readonly _privateSecretsBehaviorSubject: BehaviorSubject<core.PrivateSecrets | null>;
  private _s3AccessKeyId: string | undefined;
  private _s3SecretAccessKey: string | undefined;
  private _supabaseAnonKey: string | undefined;
  private _medusaPublicKey: string | undefined;
  private _meilisearchPublicKey: string | undefined;
  private _mapboxAccessToken: string | undefined;
  private _stripePublishableKey: string | undefined;
  private _deeplAuthKey: string | undefined;

  constructor() {
    super();

    this._publicSecretsBehaviorSubject =
      new BehaviorSubject<core.PublicSecrets | null>(null);
    this._privateSecretsBehaviorSubject =
      new BehaviorSubject<core.PrivateSecrets | null>(null);
  }

  public get publicSecretsObservable(): Observable<core.PublicSecrets | null> {
    return this._publicSecretsBehaviorSubject.asObservable();
  }

  public get privateSecretsObservable(): Observable<core.PrivateSecrets | null> {
    return this._privateSecretsBehaviorSubject.asObservable();
  }

  public clearPublicSecrets(): void {
    this._publicSecretsBehaviorSubject.next(null);
    this._supabaseAnonKey = undefined;
    this._medusaPublicKey = undefined;
    this._meilisearchPublicKey = undefined;
    this._mapboxAccessToken = undefined;
    this._stripePublishableKey = undefined;
    this._deeplAuthKey = undefined;
  }

  public clearPrivateSecrets(): void {
    this._privateSecretsBehaviorSubject.next(null);
    this._s3AccessKeyId = undefined;
    this._s3SecretAccessKey = undefined;
  }

  public get s3AccessKeyId(): string | undefined {
    return this._s3AccessKeyId;
  }

  public get s3SecretAccessKey(): string | undefined {
    return this._s3SecretAccessKey;
  }

  public get supabaseAnonKey(): string | undefined {
    return this._supabaseAnonKey;
  }

  public get medusaPublicKey(): string | undefined {
    return this._medusaPublicKey;
  }

  public get meilisearchPublicKey(): string | undefined {
    return this._meilisearchPublicKey;
  }

  public get mapboxAccessToken(): string | undefined {
    return this._mapboxAccessToken;
  }

  public get stripePublishableKey(): string | undefined {
    return this._stripePublishableKey;
  }

  public get deeplAuthKey(): string | undefined {
    return this._deeplAuthKey;
  }

  public async requestPublicAsync(): Promise<core.PublicSecrets> {
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/secrets/public`,
      headers: {
        ...this.headers,
      },
      data: '',
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const deserializedResponse = core.PublicSecrets.fromBinary(arrayBuffer);
    this._publicSecretsBehaviorSubject.next(deserializedResponse);

    this._supabaseAnonKey = deserializedResponse.supabaseAnonKey;
    this._medusaPublicKey = deserializedResponse.medusaPublicKey;
    this._meilisearchPublicKey = deserializedResponse.meilisearchPublicKey;
    this._mapboxAccessToken = deserializedResponse.mapboxAccessToken;
    this._stripePublishableKey = deserializedResponse.stripePublishableKey;
    this._deeplAuthKey = deserializedResponse.deeplAuthKey;

    return deserializedResponse;
  }

  public async requestPrivateAsync(
    session: Session
  ): Promise<core.PrivateSecrets> {
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/secrets/private`,
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      data: '',
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const deserializedResponse = core.PrivateSecrets.fromBinary(arrayBuffer);
    this._privateSecretsBehaviorSubject.next(deserializedResponse);

    this._s3AccessKeyId = deserializedResponse.s3AccessKeyId;
    this._s3SecretAccessKey = deserializedResponse.s3SecretAccessKey;

    return deserializedResponse;
  }
}

export default new SecretsService();
