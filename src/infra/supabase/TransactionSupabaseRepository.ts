
import { ITransaction } from "../../domain/entities/ITransaction";
import { ITransactionRepository } from "../../domain/repositores/ITransactionRepositore";
import { supabase } from "./config";

export class TransactionSupabaseRepository implements ITransactionRepository {


    async listAll(): Promise<ITransaction[]> {
        const {data, error} = await supabase
        .from('transaction')
        .select(`
            *,
            transaction_type (id, display)
        `)

        if(error) {
            throw error
        }
        if (!data) {
            return []
    }
    const result: ITransaction[] = data.map(row => {
        if (!row.transaction_type) {
            throw new Error('Transaction type not found')
        }       
       return {
        id: row.id,
        value: row.value,
        type: row.transaction_type,
        date: new Date(row.created_at)
       }
    })
    return result
    }
    async create(value: number, typeId: number, userId: string): Promise<void> {
        const {error} = await supabase
        .from('transaction')
        .insert({
            id: Math.floor(Math.random() * 1000000), // Temporary ID generation
            value: value,
            transaction_type_id: typeId,
            user_id: userId,
            created_at: new Date().toISOString()
        })
        .select()

        if(error) {
            throw error
        }
       
    }
}