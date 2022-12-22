/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-throw-literal */
import { Service } from '../service';
import * as core from '../protobuf/core_pb';
import { BehaviorSubject, Observable } from 'rxjs';
import AuthService from './auth.service';
import BucketService from './bucket.service';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import mime from 'mime';

class AppsService extends Service {
  private readonly _userAppsBehaviorSubject: BehaviorSubject<core.App[]>;
  private readonly _appsBehaviorSubject: BehaviorSubject<core.App[]>;
  private readonly _publicAppsBehaviorSubject: BehaviorSubject<core.App[]>;

  constructor() {
    super();

    this._userAppsBehaviorSubject = new BehaviorSubject<core.App[]>([]);
    this._appsBehaviorSubject = new BehaviorSubject<core.App[]>([]);
    this._publicAppsBehaviorSubject = new BehaviorSubject<core.App[]>([]);
  }

  public get userAppsObservable(): Observable<core.App[]> {
    return this._userAppsBehaviorSubject.asObservable();
  }

  public get appsObservable(): Observable<core.App[]> {
    return this._appsBehaviorSubject.asObservable();
  }

  public get publicAppsObservable(): Observable<core.App[]> {
    return this._publicAppsBehaviorSubject.asObservable();
  }

  public async requestAllAsync(): Promise<core.App[]> {
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/app/all`,
      headers: {
        ...this.headers,
        'Session-Token': `${
          AuthService.supabaseClient.auth.session()?.access_token
        }`,
      },
      data: '',
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const deserializedResponse = core.Apps.fromBinary(arrayBuffer);
    this._appsBehaviorSubject.next(deserializedResponse.apps);

    return deserializedResponse.apps;
  }

  public async requestAllPublicAsync(): Promise<core.App[]> {
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/app/public/all`,
      headers: {
        ...this.headers,
      },
      data: '',
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const deserializedResponse = core.Apps.fromBinary(arrayBuffer);
    this._publicAppsBehaviorSubject.next(deserializedResponse.apps);

    return deserializedResponse.apps;
  }

  public async requestCreateAsync(): Promise<core.App> {
    const supabaseUser = AuthService.supabaseClient.auth.user();
    if (!supabaseUser) {
      throw new Error('No authenticated user');
    }

    const app = new core.App();
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/app/create`,
      headers: {
        ...this.headers,
        'Session-Token': `${
          AuthService.supabaseClient.auth.session()?.access_token
        }`,
      },
      data: app.toBinary(),
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const deserializedResponse = core.App.fromBinary(arrayBuffer);
    this._appsBehaviorSubject.next(
      this._appsBehaviorSubject.getValue().concat([deserializedResponse])
    );

    return deserializedResponse;
  }

  public async requestUpdateAsync(
    appId: string,
    props: {
      user_id?: string;
      name?: string;
      company?: string;
      status?: core.AppStatus;
      links?: { id: string; name: string; url: string }[];
      avatar_image?: string;
      cover_images?: string[];
    }
  ): Promise<core.App> {
    const date = new Date(Date.now());
    const links: core.Link[] = [];

    for (const link of props.links ?? []) {
      links.push(new core.Link(link));
    }

    const app = new core.App({
      updatedAt: date.toUTCString(),
      userId: props.user_id,
      name: props.name,
      company: props.company,
      status: props.status,
      links: links,
      avatarImage: props.avatar_image,
      coverImages: props.cover_images,
    });

    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/app/update/${appId}`,
      headers: {
        ...this.headers,
        'Session-Token': `${
          AuthService.supabaseClient.auth.session()?.access_token
        }`,
      },
      data: app.toBinary(),
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const apps = this._appsBehaviorSubject.getValue();
    const deserializedResponse = core.App.fromBinary(arrayBuffer);
    const index = apps.findIndex((value) => value.id === appId);
    if (index !== -1) {
      apps[index] = deserializedResponse;
      this._appsBehaviorSubject.next(apps);
    }

    return deserializedResponse;
  }

  public async requestDeleteAsync(appId: string): Promise<core.App> {
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/app/delete/${appId}`,
      headers: {
        ...this.headers,
        'Session-Token': `${
          AuthService.supabaseClient.auth.session()?.access_token
        }`,
      },
      data: '',
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const apps = this._appsBehaviorSubject.getValue();
    const deserializedResponse = core.App.fromBinary(arrayBuffer);
    const index = apps.findIndex((value) => value.id === appId);
    if (index !== -1) {
      apps.splice(index, 1);
      this._appsBehaviorSubject.next(apps);
    }

    return deserializedResponse;
  }

  public async uploadAvatarAsync(appId: string, blob: Blob): Promise<void> {
    const apps = this._appsBehaviorSubject.getValue();
    const index = apps.findIndex((value) => value.id === appId);
    if (index !== -1) {
      const oldFile = apps[index].avatarImage;
      await BucketService.removeAsync(core.BucketType.AVATARS, [oldFile]);
    }

    const extension = mime.getExtension(blob.type);
    const newFile = `public/${uuidv4()}.${extension}`;
    await BucketService.uploadAsync(core.BucketType.AVATARS, newFile, blob);
    await this.requestUpdateAsync(appId, {
      avatar_image: newFile,
    });
  }

  public async uploadCoverImagesAsync(
    appId: string,
    blobs: Blob[]
  ): Promise<void> {
    if (blobs.length <= 0) {
      return;
    }

    const apps = this._appsBehaviorSubject.getValue();
    const index = apps.findIndex((value) => value.id === appId);
    if (index !== -1) {
      const oldFiles = apps[index].coverImages;
      if (oldFiles.length > 0) {
        await BucketService.removeAsync(core.BucketType.COVER_IMAGES, oldFiles);
      }
    }

    const newFiles: string[] = [];
    for (const blob of blobs) {
      const extension = mime.getExtension(blob.type);
      const newFile = `public/${uuidv4()}.${extension}`;
      await BucketService.uploadAsync(
        core.BucketType.COVER_IMAGES,
        newFile,
        blob
      );
      newFiles.push(newFile);
    }

    await this.requestUpdateAsync(appId, {
      cover_images: newFiles,
    });
  }
}

export default new AppsService();
