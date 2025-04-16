import { IUser } from "../../domain/entities/IUser";
import { IUserRepository } from "../../domain/repositores/IUserRepository";
import { supabase } from "./config";

export class UserSupabaseRepository implements IUserRepository {
    async createUser(user: Omit<IUser, "id">) {
        const { error } = await supabase.auth.signUp({
            email: user.email,
            password: user.password,
            options: {
                emailRedirectTo: 'http://localhost:5173/',
            },
        })

        if (error) {
            throw new Error(error.message);
        }
    }

    async listAll(): Promise<IUser[]> {
        const { data, error } = await supabase.auth.admin.listUsers();

        if (error) {
            throw new Error(error.message);
        }

        return data?.users.map(user => ({
            id: user.id,
            name: user.user_metadata?.name || '',
            email: user.email || '',
            password: ''
        })) || [];
    }
}