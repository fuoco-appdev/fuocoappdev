import { Service } from '../service';
import * as core from '../protobuf/core_pb';
import { BehaviorSubject, Observable } from 'rxjs';
import AuthService from './auth.service';
import axios from 'axios';

class SecretsService extends Service {
  private readonly _secretsBehaviorSubject: BehaviorSubject<core.Secrets | null>;

  constructor() {
    super();

    this._secretsBehaviorSubject = new BehaviorSubject<core.Secrets | null>(
      null
    );
  }

  public get secretsObservable(): Observable<core.Secrets | null> {
    return this._secretsBehaviorSubject.asObservable();
  }

  public clearSecrets(): void {
    this._secretsBehaviorSubject.next(null);
  }

  public async requestAllAsync(): Promise<core.Secrets> {
    const session = await AuthService.requestSessionAsync();
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/secrets/all`,
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      data: '',
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const deserializedResponse = core.Secrets.fromBinary(arrayBuffer);
    this._secretsBehaviorSubject.next(deserializedResponse);

    return deserializedResponse;
  }
}

export default new SecretsService();
