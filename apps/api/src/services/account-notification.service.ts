import { RealtimeChannel } from "https://esm.sh/v107/@supabase/realtime-js@2.6.0/dist/module/index.js";
import {
  AccountNotificationCountResponse,
  AccountNotificationResponse,
  AccountNotificationsRequest,
  AccountNotificationsResponse,
} from "../protobuf/account-notification_pb.js";
import SupabaseService from "./supabase.service.ts";

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
  public async getNotificationsAsync(
    request: InstanceType<typeof AccountNotificationsRequest>,
  ): Promise<InstanceType<typeof AccountNotificationsResponse> | null> {
    const accountId = request.getAccountId();
    const limit = request.getLimit();
    const offset = request.getOffset();
    const response = await this.findNotificationsAsync(
      accountId,
      limit,
      offset,
    );
    return response;
  }

  public async getUnseenCountAsync(
    accountId: string,
  ): Promise<InstanceType<typeof AccountNotificationCountResponse> | null> {
    const response = await this.findUnseenCountAsync(accountId);
    return response;
  }

  public async updateSeenAllAsync(
    accountId: string,
  ): Promise<InstanceType<typeof AccountNotificationCountResponse> | null> {
    const response = new AccountNotificationCountResponse();
    response.setCount(0);

    if (accountId.length <= 0) {
      console.error("Account id cannot be empty");
      return null;
    }

    try {
      const notificationData = await SupabaseService.client
        .from("account_notification")
        .update({ seen: true })
        .eq("account_id", accountId)
        .eq("seen", "false")
        .select();

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

  public async createOrderNotificationAsync(
    order: Record<string, any>,
  ): Promise<void> {
    const fulfillmentStatus = order["fulfillment_status"] as string;
    const customerId = order["customer_id"] as string;
    const orderId = order["id"] as string;
    const accountData = await SupabaseService.client
      .from("account")
      .select()
      .eq("customer_id", customerId)
      .eq("status", "Complete");

    if (accountData.error) {
      console.error(accountData.error);
      return;
    }

    if (accountData.data.length <= 0) {
      console.error("No account found!");
      return;
    }

    const accountId = accountData.data[0]["id"] as string;
    const accountNotificationChannel = SupabaseService.client.channel(
      `account-notification-${accountId}`,
    );
    if (fulfillmentStatus === "not_fulfilled") {
      const data = await this.createNotificationAsync({
        event_name: "order.placed",
        resource_type: "order",
        ...(orderId && { resource_id: orderId }),
        ...(accountId && { account_id: accountId }),
        data: order,
        seen: false,
      });

      const broadcast = await this.sendCreatedBroadcastAsync(accountNotificationChannel, data);
      broadcast.unsubscribe();
    } else if (fulfillmentStatus === "partially_fulfilled") {
    } else if (fulfillmentStatus === "fulfilled") {
    } else if (fulfillmentStatus === "partially_shipped") {
    } else if (fulfillmentStatus === "shipped") {
      const data = await this.createNotificationAsync({
        event_name: "order.shipped",
        resource_type: "order",
        ...(orderId && { resource_id: orderId }),
        ...(accountId && { account_id: accountId }),
        data: order,
        seen: false,
      });

      const broadcast = await this.sendCreatedBroadcastAsync(accountNotificationChannel, data);
      broadcast.unsubscribe();
    } else if (fulfillmentStatus === "partially_returned") {
    } else if (fulfillmentStatus === "returned") {
      const data = await this.createNotificationAsync({
        event_name: "order.returned",
        resource_type: "order",
        ...(orderId && { resource_id: orderId }),
        ...(accountId && { account_id: accountId }),
        data: order,
        seen: false,
      });

      const broadcast = await this.sendCreatedBroadcastAsync(accountNotificationChannel, data);
      broadcast.unsubscribe();
    } else if (fulfillmentStatus === "canceled") {
      const data = await this.createNotificationAsync({
        event_name: "order.canceled",
        resource_type: "order",
        ...(orderId && { resource_id: orderId }),
        ...(accountId && { account_id: accountId }),
        data: order,
        seen: false,
      });

      const broadcast = await this.sendCreatedBroadcastAsync(accountNotificationChannel, data);
      broadcast.unsubscribe();
    } else if (fulfillmentStatus === "requires_action") {
    }
  }

  public async createAccountFollowerNotificationAsync(
    accountFollower: Record<string, any>,
  ): Promise<void> {
    const accountId = accountFollower['account_id'] as string;
    const followerId = accountFollower['follower_id'] as string;
    const accepted = accountFollower['accepted'] ?? false as boolean;
    if (!accepted) {
      return;
    }

    const accountData = await SupabaseService.client
      .from("account")
      .select("id, customer_id, profile_url, username")
      .eq("id", accountId)
      .eq("status", "Complete");

    if (accountData.error) {
      console.error(accountData.error);
      return;
    }

    if (accountData.data.length <= 0) {
      console.error("No account found!");
      return;
    }

    const followerAccountData = await SupabaseService.client
      .from("account")
      .select("id, customer_id, profile_url, username")
      .eq("id", followerId)
      .eq("status", "Complete");

    if (followerAccountData.error) {
      console.error(followerAccountData.error);
      return;
    }

    if (followerAccountData.data.length <= 0) {
      console.error("No follower account found!");
      return;
    }

    await this.createNotificationAsync({
      event_name: "account.accepted",
      resource_type: "account",
      ...(followerId && { resource_id: followerId }),
      ...(accountId && { account_id: accountId }),
      data: followerAccountData.data[0],
      seen: false,
    });

    await this.createNotificationAsync({
      event_name: "account.following",
      resource_type: "account",
      ...(accountId && { resource_id: accountId }),
      ...(followerId && { account_id: followerId }),
      data: accountData.data[0],
      seen: false,
    });
  }

  private sendCreatedBroadcastAsync(
    channel: RealtimeChannel,
    data: Record<string, any>,
  ): Promise<RealtimeChannel> {
    return new Promise<RealtimeChannel>((resolve, reject) => {
      const subscription = channel?.subscribe(async (status) => {
        if (status !== "SUBSCRIBED") {
          reject(new Error(`Status ${status} is not SUBSCRIBED`));
          return;
        }
        await channel?.send({
          type: "broadcast",
          event: "CREATED",
          payload: data,
        });

        resolve(subscription);
      });
    });
  }

  private async createNotificationAsync(
    props: AccountNotificationProps,
  ): Promise<Record<string, any>> {
    const { data, error } = await SupabaseService.client
      .from("account_notification")
      .insert([props])
      .select();

    if (error) {
      console.error(error);
      return {};
    }

    return data.length > 0 ? data[0] : {};
  }

  private async findNotificationsAsync(
    accountId: string,
    limit: number,
    offset: number,
  ): Promise<InstanceType<typeof AccountNotificationsResponse> | null> {
    const response = new AccountNotificationsResponse();
    if (accountId.length <= 0) {
      console.error("Account id cannot be empty");
      return null;
    }

    try {
      const accountNotificationsData = await SupabaseService.client
        .from("account_notification")
        .select()
        .order("created_at", { ascending: false })
        .range(offset, offset + limit)
        .limit(limit)
        .eq("account_id", accountId);

      if (accountNotificationsData.error) {
        console.error(accountNotificationsData.error);
      }

      const data = accountNotificationsData.data ?? [];
      for (const accountNotification of data) {
        const accountNotificationResponse = new AccountNotificationResponse();
        accountNotificationResponse.setId(accountNotification.id);
        accountNotificationResponse.setCreatedAt(
          accountNotification.created_at,
        );
        accountNotificationResponse.setEventName(
          accountNotification.event_name,
        );
        accountNotificationResponse.setResourceType(
          accountNotification.resource_type,
        );
        accountNotificationResponse.setResourceId(
          accountNotification.resource_id,
        );
        accountNotificationResponse.setAccountId(
          accountNotification.account_id,
        );
        accountNotificationResponse.setData(
          JSON.stringify(accountNotification.data),
        );
        accountNotificationResponse.setUpdatedAt(
          accountNotification.updated_at,
        );
        accountNotificationResponse.setSeen(accountNotification.seen);
        response.addNotifications(accountNotificationResponse);
      }
    } catch (error: any) {
      console.error(error);
    }

    return response;
  }

  private async findUnseenCountAsync(
    accountId: string,
  ): Promise<InstanceType<typeof AccountNotificationCountResponse> | null> {
    const response = new AccountNotificationCountResponse();
    response.setCount(0);

    if (accountId.length <= 0) {
      console.error("Account id cannot be empty");
      return null;
    }

    try {
      const notificationData = await SupabaseService.client
        .from("account_notification")
        .select("", { count: "exact" })
        .eq("account_id", accountId)
        .eq("seen", "false");

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
