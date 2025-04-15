import { IUser } from "../entities/IUser";

export interface IUserRepository {
    listAll(): unknown;
    createUser(user: Omit<IUser, "id">): Promise<void>;
}

