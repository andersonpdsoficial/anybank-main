
import { ITransactionRepository } from "../repositores/ITransactionRepositore";

export class CreateTransaction {
    constructor(private  repository: ITransactionRepository) {
    }
    async execute(value: number, type: number, userId: number) {
      this.repository.create(value, type, userId);
    }
}
