import SupabaseService from './supabase.service.ts';
import { AccountNotificationCountResponse } from '../protobuf/core_pb.js';
import { RealtimeChannel } from 'https://esm.sh/v107/@supabase/realtime-js@2.6.0/dist/module/index.js';

export interface AccountNotificationProps {
  id?: string;
  created_at?: string;
  event_name?: string | null;
  resource_type?: string | null;
  resource_id?: string | null;
  account_id?: string | null;
  data?: Record<string, any> | null;
  updated_at?: string | null;
  seen?: boolean;
}

export class AccountNotificationService {
  public async getUnseenCountAsync(
    accountId: string
  ): Promise<InstanceType<typeof AccountNotificationCountResponse> | null> {
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
    const accountNotificationChannel = SupabaseService.client.channel(
      `account-notification-${accountId}`
    );
    if (fulfillmentStatus === 'not_fulfilled') {
      const data = await this.createNotificationAsync({
        event_name: 'order.placed',
        resource_type: 'order',
        ...(orderId && { resource_id: orderId }),
        ...(accountId && { account_id: accountId }),
        data: order,
        seen: false,
      });

      this.sendCreatedBroadcast(accountNotificationChannel, data);
    } else if (fulfillmentStatus === 'partially_fulfilled') {
    } else if (fulfillmentStatus === 'fulfilled') {
    } else if (fulfillmentStatus === 'partially_shipped') {
    } else if (fulfillmentStatus === 'shipped') {
      const data = await this.createNotificationAsync({
        event_name: 'order.shipped',
        resource_type: 'order',
        ...(orderId && { resource_id: orderId }),
        ...(accountId && { account_id: accountId }),
        data: order,
        seen: false,
      });

      this.sendCreatedBroadcast(accountNotificationChannel, data);
    } else if (fulfillmentStatus === 'partially_returned') {
    } else if (fulfillmentStatus === 'returned') {
      const data = await this.createNotificationAsync({
        event_name: 'order.returned',
        resource_type: 'order',
        ...(orderId && { resource_id: orderId }),
        ...(accountId && { account_id: accountId }),
        data: order,
        seen: false,
      });

      this.sendCreatedBroadcast(accountNotificationChannel, data);
    } else if (fulfillmentStatus === 'canceled') {
      const data = await this.createNotificationAsync({
        event_name: 'order.canceled',
        resource_type: 'order',
        ...(orderId && { resource_id: orderId }),
        ...(accountId && { account_id: accountId }),
        data: order,
        seen: false,
      });

      this.sendCreatedBroadcast(accountNotificationChannel, data);
    } else if (fulfillmentStatus === 'requires_action') {
    }
  }

  private sendCreatedBroadcast(
    channel: RealtimeChannel,
    data: Record<string, any>
  ): void {
    const subscription = channel?.subscribe(async (status) => {
      if (status !== 'SUBSCRIBED') {
        return;
      }
      await channel?.send({
        type: 'broadcast',
        event: 'CREATED',
        payload: data,
      });

      subscription?.unsubscribe();
    });
  }

  private async createNotificationAsync(
    props: AccountNotificationProps
  ): Promise<Record<string, any>> {
    const { data, error } = await SupabaseService.client
      .from('account_notification')
      .insert([props])
      .select();

    if (error) {
      console.error(error);
      return {};
    }

    return data.length > 0 ? data[0] : {};
  }

  private async findUnseenCountAsync(
    accountId: string
  ): Promise<InstanceType<typeof AccountNotificationCountResponse> | null> {
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
        response.setCount(notificationData.count ?? 0);
      }
    } catch (error: any) {
      console.error(error);
    }

    return response;
  }
}

export default new AccountNotificationService();
