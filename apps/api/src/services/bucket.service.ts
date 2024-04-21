import SupabaseService from "./supabase.service.ts";
import { StorageFolderType } from "../protobuf/common_pb.js";

class BucketService {
  public async initializeDevelopmentAsync(): Promise<void> {
    const avatarsBucket = await SupabaseService.client.storage.getBucket(
      this.getBucketName(StorageFolderType.AVATARS),
    );
    if (avatarsBucket.error) {
      const { error } = await SupabaseService.client.storage.createBucket(
        this.getBucketName(StorageFolderType.AVATARS),
        { public: true },
      );

      if (error) {
        console.error(error);
      }
    }
  }

  private getBucketName(type: number): string {
    const name = Object.keys(StorageFolderType)[type];
    return name.toLowerCase().replace("_", "-");
  }
}

export default new BucketService();
