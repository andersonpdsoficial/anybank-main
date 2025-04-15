import { ITransaction } from "../entities/ITransaction"
export interface ITransactionRepository {
    create(value: number, type: number, userId: number): Promise<void>
    listAll(): Promise<ITransaction[]>
}

