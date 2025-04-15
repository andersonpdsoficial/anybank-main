
export interface ITransactionRepository {
    create(value: number, type: number, userId: number): Promise<void>
}

