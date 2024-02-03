import SupabaseService from './supabase.service.ts';
import { AccountNotificationCountResponse } from '../protobuf/core_pb.js';

export interface AccountNotificationProps {
  id?: string;
  created_at?: string;
  event_name?: string | null;
  resource_type?: string | null;
  resource_id?: string | null;
  account_id?: string | null;
  data?: string | null;
  updated_at?: string | null;
  seen?: boolean;
}

export class AccountNotificationService {
  public async getUnseenCountAsync(
    accountId: string
  ): Promise<AccountNotificationCountResponse | null> {
    const response = await this.findUnseenCountAsync(accountId);
    return response;
  }

  public async createOrderNotificationAsync(
    order: Record<string, any>
  ): Promise<void> {
    const fulfillmentStatus = order['fulfillment_status'] as string;
    const customerId = order['customer_id'] as string;
    const orderId = order['id'] as string;
    const accountData = await SupabaseService.client
      .from('account')
      .select()
      .eq('customer_id', customerId)
      .eq('status', 'Complete');

    if (accountData.error) {
      console.error(accountData.error);
      return;
    }

    if (accountData.data.length <= 0) {
      console.error('No account found!');
      return;
    }

    const accountId = accountData.data[0]['id'] as string;
    if (fulfillmentStatus === 'not_fulfilled') {
      await this.createNotificationAsync({
        event_name: 'order.placed',
        resource_type: 'order',
        ...(orderId && { resource_id: orderId }),
        ...(accountId && { account_id: accountId }),
        data: order,
        seen: false,
      });
    } else if (fulfillmentStatus === 'partially_fulfilled') {
    } else if (fulfillmentStatus === 'fulfilled') {
    } else if (fulfillmentStatus === 'partially_shipped') {
    } else if (fulfillmentStatus === 'shipped') {
    } else if (fulfillmentStatus === 'partially_returned') {
    } else if (fulfillmentStatus === 'returned') {
    } else if (fulfillmentStatus === 'canceled') {
    } else if (fulfillmentStatus === 'requires_action') {
    }
  }

  private async createNotificationAsync(
    props: AccountNotificationProps
  ): Promise<void> {
    const { data, error } = await SupabaseService.client
      .from('account_notification')
      .insert([props])
      .select();

    if (error) {
      console.error(error);
    }
  }

  private async findUnseenCountAsync(
    accountId: string
  ): Promise<AccountNotificationCountResponse | null> {
    const response = new AccountNotificationCountResponse();
    response.setCount(0);

    if (accountId.length <= 0) {
      console.error('Account id cannot be empty');
      return null;
    }

    try {
      const notificationData = await SupabaseService.client
        .from('account_notification')
        .select('', { count: 'exact' })
        .eq('account_id', accountId)
        .eq('seen', 'false');

      if (notificationData.error) {
        console.error(notificationData.error);
      } else {
        response.setCount(notificationData.count);
      }
    } catch (error: any) {
      console.error(error);
    }

    return response;
  }
}

export default new AccountNotificationService();
