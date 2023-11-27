import SupabaseService from './supabase.service.ts';
import {
  ProductLikesMetadataRequest,
  ProductLikesMetadataResponse,
  ProductLikesMetadatasResponse,
  ProductLikeRequest,
  ProductLikeResponse,
  ProductLikesResponse,
} from '../protobuf/core_pb.js';

export interface ProductLikesProps {
  product_id?: string;
  account_id?: string;
}

export class ProductLikesService {
  public async getMetadataAsync(
    request: InstanceType<typeof ProductLikesMetadataRequest>
  ): Promise<ProductLikesMetadatasResponse | null> {
    const accountId = request.getAccountId();
    const productIds = request.getProductIdsList();
    const metadatasResponse = await this.findMetadataAsync(
      accountId,
      productIds
    );
    return metadatasResponse;
  }

  public async upsertAsync(
    request: InstanceType<typeof ProductLikeRequest>
  ): Promise<ProductLikesMetadatasResponse | null> {
    const productId = request.getProductId();
    const accountId = request.getAccountId();

    if (!productId || productId.length <= 0) {
      console.error('Product id cannot be undefined');
      return null;
    }

    if (!accountId || accountId.length <= 0) {
      console.error('Account id cannot be undefined');
      return null;
    }

    const props: ProductLikesProps = {
      product_id: productId,
      account_id: accountId,
    };
    const { data, error } = await SupabaseService.client
      .from('product_likes')
      .upsert(props)
      .select();

    if (error) {
      console.error(error);
      return null;
    }

    const productLikeData = data.length > 0 ? data[0] : null;
    if (!productLikeData) {
      return null;
    }

    const metadatasResponse = await this.findMetadataAsync(accountId, [
      productId,
    ]);
    return metadatasResponse;
  }

  public async deleteAsync(
    request: InstanceType<typeof ProductLikeRequest>
  ): Promise<ProductLikesMetadatasResponse | null> {
    const productId = request.getProductId();
    const accountId = request.getAccountId();

    if (!productId || productId.length <= 0) {
      console.error('Product id cannot be undefined');
      return;
    }

    if (!accountId || accountId.length <= 0) {
      console.error('Account id cannot be undefined');
      return;
    }
    const props: ProductLikesProps = {
      product_id: productId,
      account_id: accountId,
    };

    const { error } = await SupabaseService.client
      .from('product_likes')
      .delete()
      .match(props);

    if (error) {
      console.error(error);
      return null;
    }

    const metadatasResponse = await this.findMetadataAsync(accountId, [
      productId,
    ]);
    return metadatasResponse;
  }

  private async findMetadataAsync(
    accountId: string,
    productIds: string[]
  ): Promise<ProductLikesMetadatasResponse | null> {
    const metadatasResponse = new ProductLikesMetadatasResponse();

    if (productIds.length <= 0) {
      console.error('Product ids cannot be empty');
      return null;
    }

    for (const id of productIds) {
      const metadataResponse = new ProductLikesMetadataResponse();
      try {
        const totalLikesData = await SupabaseService.client
          .from('product_likes')
          .select('', { count: 'exact' })
          .match({ product_id: id });

        if (totalLikesData.error) {
          console.error(totalLikesData.error);
        } else {
          metadataResponse.setTotalLikeCount(totalLikesData.count);
        }
      } catch (error: any) {
        console.error(error);
      }

      if (!accountId || accountId.length <= 0) {
        metadataResponse.setDidAccountLike(false);
      } else {
        try {
          const didAccountLikeData = await SupabaseService.client
            .from('product_likes')
            .select()
            .match({
              product_id: id,
              account_id: accountId,
            });
          if (didAccountLikeData.error) {
            console.error(didAccountLikeData.error);
          } else {
            metadataResponse.setDidAccountLike(
              didAccountLikeData.data.length > 0
            );
          }
        } catch (error: any) {
          console.error(error);
        }
      }

      metadataResponse.setProductId(id);
      metadatasResponse.addMetadata(metadataResponse);
    }

    return metadatasResponse;
  }
}

export default new ProductLikesService();
