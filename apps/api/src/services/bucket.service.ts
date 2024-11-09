import { Service } from 'https://deno.land/x/di@v0.1.1/mod.ts';
import { StorageFolderType } from '../protobuf/common_pb.js';
import serviceCollection, { serviceTypes } from '../service_collection.ts';
import SupabaseService from './supabase.service.ts';

@Service()
export default class BucketService {
  private readonly _supabaseService: SupabaseService;
  constructor() {
    this._supabaseService = serviceCollection.get(serviceTypes.SupabaseService);
  }
  public async initializeDevelopmentAsync(): Promise<void> {
    const avatarsBucket = await this._supabaseService.client.storage.getBucket(
      this.getBucketName(StorageFolderType.AVATARS)
    );
    if (avatarsBucket.error) {
      const { error } = await this._supabaseService.client.storage.createBucket(
        this.getBucketName(StorageFolderType.AVATARS),
        { public: true }
      );

      if (error) {
        console.error(error);
      }
    }
  }

  private getBucketName(type: number): string {
    const name = Object.keys(StorageFolderType)[type];
    return name.toLowerCase().replace('_', '-');
  }
}
