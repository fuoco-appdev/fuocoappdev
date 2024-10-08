import AWS from 'aws-sdk';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageFolderType } from '../protobuf/common_pb';
import ConfigService from './config.service';

class BucketService {
  private _s3: AWS.S3 | undefined;
  private _s3BehaviorSubject: BehaviorSubject<AWS.S3 | undefined>;

  constructor() {
    this._s3BehaviorSubject = new BehaviorSubject<AWS.S3 | undefined>(
      undefined
    );
  }

  public get s3Observable(): Observable<AWS.S3 | undefined> {
    return this._s3BehaviorSubject.asObservable();
  }

  public initializeS3(): void {
    AWS.config.update({
      accessKeyId: import.meta.env['S3_ACCESS_KEY_ID'],
      secretAccessKey: import.meta.env['S3_SECRET_ACCESS_KEY'],
    });
    this._s3 = new AWS.S3({ endpoint: ConfigService.s3.url });
    this._s3BehaviorSubject.next(this._s3);
  }

  public async getPublicUrlAsync(
    type: StorageFolderType,
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
    type: StorageFolderType,
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
    type: StorageFolderType,
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

  public getStorageFolderName(type: StorageFolderType): string {
    const name = StorageFolderType[type];
    return name.toLowerCase().replace('_', '-');
  }
}

export default new BucketService();
