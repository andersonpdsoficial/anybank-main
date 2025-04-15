
import { ITransactionTypeRepository } from "../repositores/ITransactionTypeRepositore";


export class ListTransactionType {
    constructor(private repository : ITransactionTypeRepository) {}
    async execute(){
        return this.repository.listAll()
    }
}   
