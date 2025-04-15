
import { ITransactionRepository } from "../../domain/repositores/ITransactionRepositore";
import { supabase } from "./config";


export class TransactionSupabaseRepository implements ITransactionRepository {

    async create(value: number, type: number, userId: number) {

        const { error } = await supabase
            .from('transaction')
            .insert([
                { 
                    transaction_type_id: type,
                    value,
                    user_id: userId.toString(),
                    id: Date.now()
                }
            ])
            .select()

            if (error) {
                throw  Error(error.message)
            }
    }
}
