import { UserRepository } from "./user.repository";
import {User, UserDocument} from "./database/User";
import { UserCreateDto } from "./dto/user.create.dto";
import {UserListResponseDto} from "./dto/user.list.response.dto";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async get(query: object, options: {page: number, limit: number}): Promise<UserListResponseDto> {
        return this.userRepository.get(query, options);
    }

    async save(saveData: UserCreateDto): Promise<UserDocument> {
        const userExist = await this.userRepository.getByEmail(saveData.email);
        if (userExist) throw new Error("User with such email already exist");
        return this.userRepository.save(saveData);
    }
}