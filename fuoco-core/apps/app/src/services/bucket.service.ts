import AuthService from './auth.service';

export enum BucketType {
  Avatars = 'avatars',
}

class BucketService {
  public getPublicUrl(type: BucketType, path: string): string | null {
    const { data, error } = AuthService.supabaseClient.storage
      .from(type)
      .getPublicUrl(path);

    if (error) {
      throw error;
    }

    return data?.publicURL ?? null;
  }

  public async uploadAsync(
    bucketType: BucketType,
    file: string,
    blob: Blob
  ): Promise<string | null> {
    const bucket = await AuthService.supabaseClient.storage
      .from(bucketType)
      .upload(file, blob);

    if (bucket.error) {
      throw bucket.error;
    }

    return bucket?.data?.Key ?? null;
  }

  public async removeAsync(
    bucketType: BucketType,
    files: string[]
  ): Promise<void> {
    const bucket = await AuthService.supabaseClient.storage
      .from(bucketType)
      .remove(files);

    if (bucket.error) {
      throw bucket.error;
    }
  }
}

export default new BucketService();
