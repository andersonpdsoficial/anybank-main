
import { ITransactionRepository } from "../repositores/ITransactionRepositore";


export class ListAllTransactions {
    constructor(private repository: ITransactionRepository) {}

    execute () {
        return this.repository.listAll()
    }
}
