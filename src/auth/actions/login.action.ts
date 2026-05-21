import { tesloApi } from "@/api/tesloApi"
import type { AuthResponse } from "../interfaces/auth.response";

export const loginAction = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const { data } = await tesloApi.post<AuthResponse>('/auth/login', {
            email, password
        });
        // console.log(data);

        return data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const registerAction = async (email: string, password: string, fullName: string): Promise<AuthResponse> => {
    try {
        const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
            email, password, fullName
        });

        return data;
    } catch (error) {
        throw error;
    }
}