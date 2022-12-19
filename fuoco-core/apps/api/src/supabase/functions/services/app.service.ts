/* eslint-disable @typescript-eslint/no-explicit-any */
import SupabaseService from './supabase.service.ts';
import { App, Apps, Link, Image, AppStatus } from '../protobuf/core_pb.js';

export interface AppProps {
  id?: string;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
  name?: string;
  links?: { name: string; url: string }[];
  status?: number;
  avatar_image?: string;
  cover_images?: string[];
}

export class AppService {
  public async findAsync(appId: string): Promise<AppProps | null> {
    const { data, error } = await SupabaseService.client
      .from('apps')
      .select()
      .eq('id', appId);

    if (error) {
      console.error(error);
      return null;
    }

    return data.length > 0 ? data[0] : null;
  }

  public async createAsync(
    app: InstanceType<typeof App>
  ): Promise<AppProps | null> {
    const updatedAt = app.getUpdatedAt();
    const name = app.getName();
    const userId = app.getUserId();
    const links = app.getLinksList();
    const avatarImage = app.getAvatarImage();
    const coverImages = app.getCoverImagesList();

    const appData = this.assignAndGetAppData({
      updatedAt,
      name,
      userId,
      links,
      status: AppStatus.USER_STORIES,
      avatarImage,
      coverImages,
    });

    const { data, error } = await SupabaseService.client
      .from('apps')
      .insert([appData])
      .single();

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  }

  public async updateAsync(
    appId: string,
    app: InstanceType<typeof App>
  ): Promise<AppProps | null> {
    const updatedAt = app.getUpdatedAt();
    const userId = app.getUserId();
    const name = app.getName();
    const links = app.getLinksList();
    const status = app.getStatus();
    const avatarImage = app.getAvatarImage();
    const coverImages = app.getCoverImagesList();

    const appData = this.assignAndGetAppData({
      updatedAt,
      userId,
      name,
      links,
      status,
      avatarImage,
      coverImages,
    });
    const { data, error } = await SupabaseService.client
      .from('apps')
      .update(appData)
      .match({ id: appId })
      .single();

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  }

  public async findAllAsync(): Promise<AppProps[] | null> {
    const { data, error } = await SupabaseService.client.from('apps').select();

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  }

  public async deleteAsync(appId: string): Promise<AppProps | null> {
    const { data, error } = await SupabaseService.client
      .from('apps')
      .delete()
      .match({ id: appId })
      .single();

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  }

  public assignAndGetAppsProtocol(
    props: AppProps[]
  ): InstanceType<typeof Apps> {
    const apps = new Apps();
    for (const appData of props) {
      const app = this.assignAndGetAppProtocol(appData);
      apps.addApps(app);
    }

    return apps;
  }

  public assignAndGetAppProtocol(props: AppProps): InstanceType<typeof App> {
    const app = new App();
    const links: InstanceType<typeof Link>[] = [];
    if (props.links) {
      for (const linkData of props.links) {
        const link = new Link();
        link.setName(linkData.name);
        link.setUrl(linkData.url);
        links.push(link);
      }
    }

    props.id && app.setId(props.id);
    props.created_at && app.setCreatedAt(props.created_at);
    props.updated_at && app.setUpdatedAt(props.updated_at);
    props.user_id && app.setUserId(props.user_id);
    props.name && app.setName(props.name);
    props.status && app.setStatus(props.status);
    props.links && app.setLinksList(links);
    props.avatar_image && app.setAvatarImage(props.avatar_image);
    props.cover_images && app.setCoverImagesList(props.cover_images);

    return app;
  }

  public assignAndGetAppData(props: {
    updatedAt?: string;
    userId?: string;
    name?: string;
    links?: InstanceType<typeof Link>[];
    status?: number;
    avatarImage?: string;
    coverImages?: string[];
  }) {
    const linksData: { name: string; url: string }[] = [];
    if (props.links) {
      for (const link of props.links) {
        linksData.push({ name: link.getName(), url: link.getUrl() });
      }
    }

    return {
      ...(props.updatedAt && { updated_at: props.updatedAt }),
      ...(props.userId && { user_id: props.userId }),
      ...(props.name && { name: props.name }),
      ...(props.links && props.links.length > 0 && { links: linksData }),
      ...(props.status && { status: props.status }),
      ...(props.avatarImage && { avatar_image: props.avatarImage }),
      ...(props.coverImages &&
        props.coverImages.length > 0 && { cover_images: props.coverImages }),
    };
  }
}

export default new AppService();
