/* eslint-disable @typescript-eslint/no-explicit-any */
import SupabaseService from "./supabase.service.ts";
import { User, Location, UserRequestStatus, Users } from '../protobuf/core_pb.js';

export class UserService {
    public async findAsync(supabaseId: string): Promise<any | null> {
        const {data, error} = await SupabaseService.client
            .from('users')
            .select()
            .eq('supabase_id', supabaseId)
            .single();

        if (error) {
            console.error(error);
            return null;
        }

        return data;
    }

    public async createAsync(supabaseId: string, user: InstanceType<typeof User>): Promise<any | null> {
        const role = user.getRole();
        const company = user.getCompany();
        const email = user.getEmail();
        const phoneNumber = user.getPhoneNumber();
        const language = user.getLanguage();
        const location = user.getLocation();

        const userData = this.assignAndGetUserData({
            supabaseId,
            role,
            company,
            email,
            phoneNumber,
            language,
            location,
            requestStatus: UserRequestStatus.IDLE,
            apps: []
        });
        
        const {data, error} = await SupabaseService.client
            .from('users')
            .insert([userData])
            .single();

        if (error) {
            console.error(error);
            return null;
        }

        return data;
    }

    public async updateAsync(supabaseId: string, user: InstanceType<typeof User>): Promise<any | null> {
        const company = user.getCompany();
        const email = user.getEmail();
        const phoneNumber = user.getPhoneNumber();
        const language = user.getLanguage();
        const location = user.getLocation();
        const requestStatus = user.getRequestStatus();
        const apps = user.getAppsList();

        const userData = this.assignAndGetUserData({
            company,
            email,
            phoneNumber,
            language,
            location,
            requestStatus,
            apps
        });
        const {data, error} = await SupabaseService.client
            .from('users')
            .update([userData])
            .match({supabase_id: supabaseId});

        if (error) {
            console.error(error);
            return null;
        }

        return data;
    }

    public async findAllAsync(): Promise<any[] | null> {
        const {data, error} = await SupabaseService.client
        .from('users')
        .select();

        if (error) {
            console.error(error);
            return null;
        }

        return data;
    }

    public async deleteAsync(supabaseId: string): Promise<any | null> {
        const {data, error} = await SupabaseService.client
        .from('users')
        .delete()
        .match({supabase_id: supabaseId})
        .single();

        if (error) {
            console.error(error);
            return null;
        }

        return data;
    }

    public assignAndGetUsersProtocol(props: {
        id?: string, 
        created_at?: string, 
        supabase_id?: string, 
        role?: number, 
        company?: string, 
        email?: string, 
        phone_number?: string, 
        language?: string, 
        location?: {longitude: number, latitude: number}, 
        request_status?: number, 
        apps?: {apps: string[]}
    }[]): InstanceType<typeof Users> {
        const users = new Users();
        for (const userData of props) {
            const user = this.assignAndGetUserProtocol(userData);
            users.addUsers(user);
        }

        return users;
    }

    public assignAndGetUserProtocol(props: {
        id?: string, 
        created_at?: string, 
        supabase_id?: string, 
        role?: number, 
        company?: string, 
        email?: string, 
        phone_number?: string, 
        language?: string, 
        location?: {longitude: number, latitude: number}, 
        request_status?: number, 
        apps?: {apps: string[]}
    }): InstanceType<typeof User> {
        const user = new User();
        const location = new Location();
        if (props.location) {
            (props.location.latitude && location.setLatitude(props.location.latitude));
            (props.location.longitude && location.setLongitude(props.location.longitude));
        }
        
        (props.id && user.setId(props.id));
        (props.created_at && user.setCreatedAt(props.created_at));
        (props.supabase_id && user.setSupabaseId(props.supabase_id));
        (props.role && user.setRole(props.role));
        (props.company && user.setCompany(props.company));
        (props.email && user.setEmail(props.email));
        (props.phone_number && user.setPhoneNumber(props.phone_number));
        (props.language && user.setLanguage(props.language));
        (props.location && user.setLocation(location));
        (props.request_status && user.setRequestStatus(props.request_status));
        (props.apps && user.setAppsList(props.apps.apps));

        return user;
    }

    public assignAndGetUserData(props: {
        id?: string, 
        createdAt?: string, 
        supabaseId?: string, 
        role?: number, 
        company?: string, 
        email?: string, 
        phoneNumber?: string, 
        language?: string, 
        location?: InstanceType<typeof Location> | null, 
        requestStatus?: number, 
        apps?: string[]
    }) {
        return {
            ...(props.supabaseId && {supabase_id: props.supabaseId}),
            ...(props.role && {role: props.role}),
            ...(props.company && {company: props.company}),
            ...(props.email && {email: props.email}),
            ...(props.phoneNumber && {phone_number: props.phoneNumber}),
            ...(props.language && {language: props.language}),
            ...(props.location && {location: {
                latitude: props.location?.getLatitude(),
                longitude: props.location?.getLongitude()
            }}),
            ...(props.requestStatus && {request_status: props.requestStatus}),
            ...(props.apps && {apps: {apps: []}})
        }
    }
}

export default new UserService();