import SupabaseService from './supabase.service.ts';
import { BucketType } from '../protobuf/core_pb.js';

class BucketService {
  public async initializeDevelopmentAsync(): Promise<void> {
    const avatarsBucket = await SupabaseService.client.storage.getBucket(
      this.getBucketName(BucketType.AVATARS)
    );
    if (avatarsBucket.error) {
      await SupabaseService.client.storage.createBucket(
        this.getBucketName(BucketType.AVATARS),
        { public: true }
      );
    }

    const coverImagesBucket = await SupabaseService.client.storage.getBucket(
      this.getBucketName(BucketType.COVER_IMAGES)
    );
    if (coverImagesBucket.error) {
      await SupabaseService.client.storage.createBucket(
        this.getBucketName(BucketType.COVER_IMAGES),
        { public: true }
      );
    }
  }

  private getBucketName(type: number): string {
    const name = Object.keys(BucketType)[type];
    return name.toLowerCase().replace('_', '-');
  }
}

export default new BucketService();
