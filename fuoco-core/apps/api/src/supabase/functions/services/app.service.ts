/* eslint-disable @typescript-eslint/no-explicit-any */
import SupabaseService from "./supabase.service.ts";
import { App, Apps, Product, Link, Image } from '../protobuf/core_pb.js';
import { UserProps } from "./user.service.ts";

export interface AppProps {
    id?: string;
    created_at?: string;
    updated_at?: string;
    name?: string;
    products?: string[];
    links?: {name: string, url: string}[];
    status?: number;
    images?: {type: number, url: string}[];
}

export class AppService {
    public async findAsync(appId: string): Promise<AppProps | null> {
        const {data, error} = await SupabaseService.client
            .from('apps')
            .select()
            .eq('id', appId)
            .single();

        if (error) {
            console.error(error);
            return null;
        }

        return data;
    }

    public async createAsync(supabaseId: string, app: InstanceType<typeof App>): Promise<AppProps | null> {
        const userProps = await SupabaseService.client
            .from('users')
            .select()
            .match({supabase_id: supabaseId})
            .single();

        if (userProps.error) {
            console.error(userProps.error);
            return null;
        }
        
        const updatedAt = app.getUpdatedAt();
        const name = app.getName();
        const products = app.getProductsList();
        const links = app.getLinksList();
        const status = app.getStatus();
        const images = app.getImagesList();

        const appData = this.assignAndGetAppData({
            updatedAt,
            name,
            products,
            links,
            status,
            images
        });
        
        const appProps = await SupabaseService.client
            .from('apps')
            .insert([appData])
            .single();

        if (appProps.error) {
            console.error(appProps.error);
            return null;
        }

        const userApps = (userProps.data as UserProps).apps;
        const appId = (appProps.data as AppProps).id;
        if (userApps && appId) {
            userApps.apps.push(appId);

            const updatedUserProps = await SupabaseService.client
            .from('users')
            .update(userApps)
            .match({supabase_id: supabaseId})
            .single();

            if (updatedUserProps.error) {
                console.error(updatedUserProps.error);
                return null;
            }
        }

        return appProps.data;
    }

    public async updateAsync(appId: string, app: InstanceType<typeof App>): Promise<AppProps | null> {
        const updatedAt = app.getUpdatedAt();
        const name = app.getName();
        const products = app.getProductsList();
        const links = app.getLinksList();
        const status = app.getStatus();
        const images = app.getImagesList();

        const appData = this.assignAndGetAppData({
            updatedAt,
            name,
            products,
            links,
            status,
            images
        });
        const {data, error} = await SupabaseService.client
            .from('apps')
            .update(appData)
            .match({id: appId})
            .single();

        if (error) {
            console.error(error);
            return null;
        }

        return data;
    }

    public async findAllAsync(): Promise<AppProps[] | null> {
        const {data, error} = await SupabaseService.client
        .from('apps')
        .select();

        if (error) {
            console.error(error);
            return null;
        }

        return data;
    }

    public async deleteAsync(supabaseId: string): Promise<AppProps | null> {
        const {data, error} = await SupabaseService.client
        .from('apps')
        .delete()
        .match({supabase_id: supabaseId})
        .single();

        if (error) {
            console.error(error);
            return null;
        }

        return data;
    }

    public assignAndGetAppsProtocol(props: AppProps[]): InstanceType<typeof Apps> {
        const apps = new Apps();
        for (const appData of props) {
            const app = this.assignAndGetAppProtocol(appData);
            apps.addApps(app);
        }

        return apps;
    }

    public assignAndGetAppProtocol(props: AppProps): InstanceType<typeof App> {
        const app = new App();
        const products: InstanceType<typeof Product>[] = [];
        const links: InstanceType<typeof Link>[] = [];
        const images: InstanceType<typeof Image>[] = [];
        if (props.products) {
            for (const id of props.products) {
                const product = new Product();
                product.setId(id);
                products.push(product);
            }
        }
        if (props.links) {
            for (const linkData of props.links) {
                const link = new Link();
                link.setName(linkData.name);
                link.setUrl(linkData.url);
                links.push(link);
            }
        }
        if (props.images) {
            for (const imageData of props.images) {
                const image = new Image();
                image.setType(imageData.type);
                image.setUrl(imageData.url);
                images.push(image);
            }
        }

        (props.id && app.setId(props.id));
        (props.created_at && app.setCreatedAt(props.created_at));
        (props.updated_at && app.setUpdatedAt(props.updated_at));
        (props.name && app.setName(props.name));
        (props.status && app.setStatus(props.status));
        (props.products && app.setProductsList(products));
        (props.links && app.setLinksList(links));
        (props.images && app.setImagesList(images));

        return app;
    }

    public assignAndGetAppData(props: {
        updatedAt?: string;
        name?: string;
        products?: InstanceType<typeof Product>[];
        links?: InstanceType<typeof Link>[];
        status?: number;
        images?: InstanceType<typeof Image>[];
    }) {
        const productsData: string[] = [];
        const linksData: {name: string, url: string}[] = [];
        const imagesData: {type: number, url: string}[] = [];
        if (props.products) {
            for (const product of props.products) {
                productsData.push(product.getId());
            }
        }
        if (props.links) {
            for (const link of props.links) {
                linksData.push({name: link.getName(), url: link.getUrl()});
            }
        }
        if (props.images) {
            for (const image of props.images) {
                imagesData.push({type: image.getType(), url: image.getUrl()});
            }
        }

        return {
            ...(props.updatedAt && {updated_at: props.updatedAt}),
            ...(props.name && {name: props.name}),
            ...(props.products && {products: productsData}),
            ...(props.links && {links: linksData}),
            ...(props.status && {status: props.status}),
            ...(props.images && {images: imagesData})
        };
    }
}

export default new AppService();