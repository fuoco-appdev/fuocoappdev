import SupabaseService from './supabase.service';
import ConfigService from './config.service';
import * as core from '../protobuf/core_pb';
import AWS, { Config } from 'aws-sdk';

class BucketService {
  private _s3: AWS.S3 | undefined;

  constructor() {}

  public initializeS3(accessKeyId: string, secretAccessKey: string): void {
    AWS.config.update({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    });
    this._s3 = new AWS.S3({ endpoint: ConfigService.s3.url });
  }

  public async getPublicUrlAsync(
    type: core.StorageFolderType,
    file: string
  ): Promise<string | undefined> {
    const storageName = this.getStorageFolderName(type);

    return new Promise<string | undefined>((resolve, reject) => {
      this._s3?.getSignedUrl(
        'putObject',
        { Bucket: ConfigService.s3.bucket_name, Key: `${storageName}/${file}` },
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
    type: core.StorageFolderType,
    file: string,
    blob: Blob
  ): Promise<string | null> {
    const storageName = this.getStorageFolderName(type);

    return new Promise<string | null>((resolve, reject) => {
      if (!this._s3) {
        reject(new Error('S3 instance not defined'));
        return;
      }

      this._s3
        .upload(
          {
            Bucket: ConfigService.s3.bucket_name,
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
    type: core.StorageFolderType,
    file: string
  ): Promise<boolean | undefined> {
    const storageName = this.getStorageFolderName(type);

    return new Promise<boolean | undefined>((resolve, reject) => {
      if (!this._s3) {
        reject(new Error('S3 instance not defined'));
        return;
      }

      this._s3
        .deleteObject({
          Bucket: ConfigService.s3.bucket_name,
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

  public getStorageFolderName(type: core.StorageFolderType): string {
    const name = core.StorageFolderType[type];
    return name.toLowerCase().replace('_', '-');
  }
}

export default new BucketService();
