import { ITransaction } from "../../domain/entities/ITransaction";
import { ITransactionRepository } from "../../domain/repositores/ITransactionRepositore";
import { supabase } from "./config";

export class TransactionSupabaseRepository implements ITransactionRepository {

    async listAll(): Promise<ITransaction[]> {
        const { data, error } = await supabase
            .from('transaction')
            .select(`
                *,
                transaction_type(id, display)(
                `)
        if (error) {
            throw error;
        }
        if (data) {
            return []
        }
        const result: ITransaction[] = data.map(row=> {
            if(row.transaction_type){
                throw new Error('Transaction type not found')
            }
            return {
                data: new Date(row.created_at),
                id: row.id,
                value: row.value,
                type: row.transaction_type,

            }
        })
        return result

    }
    async create(value: number, typeId: number, userId: number) {

        const { error } = await supabase
            .from('transaction')
            .insert([
                {
                    transaction_type_id: typeId,
                    value,
                    user_id: userId.toString(),
                    id: Date.now()

                },
            ])
            .select()
        if (error) {
            throw error;
        }

    }
}