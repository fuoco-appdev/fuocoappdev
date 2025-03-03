import AWS from 'aws-sdk';
import { observable } from 'mobx';
import { StorageFolderType } from '../protobuf/common_pb';
import { Service } from '../service';
import { StoreOptions } from '../store-options';
import ConfigService from './config.service';
import LogflareService from './logflare.service';
import SupabaseService from './supabase.service';

export default class BucketService extends Service {
  @observable
  public s3: AWS.S3 | undefined;

  constructor(
    private readonly _accessKeyId: string,
    private readonly _secretAccessKey: string,
    private readonly _supabaseService: SupabaseService,
    private readonly _logflareService: LogflareService,
    private readonly _configService: ConfigService,
    private readonly _supabaseAnonKey: string,
    private readonly _storeOptions: StoreOptions
  ) {
    super(_configService, _supabaseAnonKey, _storeOptions);
    this.s3 = undefined;
  }

  public override dispose(): void {}

  public initializeS3(): void {
    AWS.config.update({
      accessKeyId: this._accessKeyId,
      secretAccessKey: this._secretAccessKey,
    });
    this.s3 = new AWS.S3({ endpoint: this._configService.s3.url });
  }

  public async getPublicUrlAsync(
    type: StorageFolderType,
    file: string
  ): Promise<string | undefined> {
    const storageName = this.getStorageFolderName(type);

    return new Promise<string | undefined>((resolve, reject) => {
      this.s3?.getSignedUrl(
        'putObject',
        {
          Bucket: this._configService.s3.bucket_name,
          Key: `${storageName}/${file}`,
        },
        (error, url) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(url.split('?')[0]);
        }
      );
    });
  }

  public async uploadPublicAsync(
    type: StorageFolderType,
    file: string,
    blob: Blob
  ): Promise<string | null> {
    const storageName = this.getStorageFolderName(type);

    return new Promise<string | null>((resolve, reject) => {
      if (!this.s3) {
        reject(new Error('S3 instance not defined'));
        return;
      }

      this.s3
        .upload(
          {
            Bucket: this._configService.s3.bucket_name,
            ACL: 'public-read',
            Key: `${storageName}/${file}`,
            Body: blob,
          },
          {
            partSize: 10 * 1024 * 1024,
            queueSize: 10,
          }
        )
        .send((error, data) => {
          if (error) {
            reject(error);
            return;
          }
          // Return file url or other necessary details
          resolve(data.Location);
        });
    });
  }

  public async removeAsync(
    type: StorageFolderType,
    file: string
  ): Promise<boolean | undefined> {
    const storageName = this.getStorageFolderName(type);

    return new Promise<boolean | undefined>((resolve, reject) => {
      if (!this.s3) {
        reject(new Error('S3 instance not defined'));
        return;
      }

      this.s3
        .deleteObject({
          Bucket: this._configService.s3.bucket_name,
          Key: `${storageName}/${file}`,
        })
        .send((error, data) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(data.DeleteMarker);
        });
    });
  }

  public getStorageFolderName(type: StorageFolderType): string {
    const name = StorageFolderType[type];
    return name.toLowerCase().replace('_', '-');
  }
}
