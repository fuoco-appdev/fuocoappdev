import AuthService from './auth.service';
import * as core from '../protobuf/core_pb';

class BucketService {
  public getPublicUrl(type: core.BucketType, path: string): string | null {
    const bucketName = this.getBucketName(type);
    const { data } = AuthService.supabaseClient.storage
      .from(bucketName)
      .getPublicUrl(path);

    return data?.publicUrl ?? null;
  }

  public async uploadAsync(
    type: core.BucketType,
    file: string,
    blob: Blob
  ): Promise<string | null> {
    const bucketName = this.getBucketName(type);
    const bucket = await AuthService.supabaseClient.storage
      .from(bucketName)
      .upload(file, blob);

    if (bucket.error) {
      throw bucket.error;
    }

    return bucket?.data?.path ?? null;
  }

  public async removeAsync(
    type: core.BucketType,
    files: string[]
  ): Promise<void> {
    const bucketName = this.getBucketName(type);
    const bucket = await AuthService.supabaseClient.storage
      .from(bucketName)
      .remove(files);

    if (bucket.error) {
      throw bucket.error;
    }
  }

  public getBucketName(type: core.BucketType): string {
    const name = core.BucketType[type];
    return name.toLowerCase().replace('_', '-');
  }
}

export default new BucketService();
