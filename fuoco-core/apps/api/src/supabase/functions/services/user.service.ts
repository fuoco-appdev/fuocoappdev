/* eslint-disable @typescript-eslint/no-explicit-any */
import SupabaseService from "./supabase.service.ts";
import { User, UserRequestStatus } from '../protobuf/core_pb.js';

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

    public async createAsync(user: InstanceType<typeof User>): Promise<any | null> {
        const supabaseId = user.getSupabaseId();
        const role = user.getRole();
        const company = user.getCompany();
        const email = user.getEmail();
        const phoneNumber = user.getPhoneNumber();
        const language = user.getLanguage();
        const location = user.getLocation();
        
        const {data, error} = await SupabaseService.client
            .from('users')
            .insert([{
                supabase_id: supabaseId,
                ...(role && {role: role}),
                ...(company && {company: company}),
                ...(email && {email: email}),
                ...(phoneNumber && {phone_number: phoneNumber}),
                ...(language && {language: language}),
                ...(location && {location: {
                    latitude: location?.getLatitude(),
                    longitude: location?.getLongitude()
                }}),
                request_status: UserRequestStatus.IDLE,
                apps: {apps: []}
            }])
            .single();

        if (error) {
            console.error(error);
            return null;
        }

        return data;
    }

    public async updateAsync(user: InstanceType<typeof User>): Promise<any | null> {
        const company = user.getCompany();
        const email = user.getEmail();
        const phoneNumber = user.getPhoneNumber();
        const language = user.getLanguage();
        const location = user.getLocation();
        const requestStatus = user.getRequestStatus();
        const apps = user.getAppsList();
        const {data, error} = await SupabaseService.client
            .from('users')
            .update([{ 
                ...(company && {company: company}),
                ...(email && {email: email}),
                ...(phoneNumber && {phone_number: phoneNumber}),
                ...(language && {language: language}),
                ...(location && {location: {
                    latitude: location?.getLatitude(),
                    longitude: location?.getLongitude()
                }}),
                ...(requestStatus && {request_status: requestStatus}),
                ...(apps && {apps: {apps: apps }})
            }])
            .match({id: user.getId()});

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
}

export default new UserService();