
import { IUserRepository } from "../repositores/IUserRepository";

export class CreateUser {
    constructor(private  userRepository: IUserRepository) {
    }
    async execute() {
        await this.userRepository.listAll();
    }
}
