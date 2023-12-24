import {User, UserDocument} from "./database/User";
import { UserCreateDto } from "./dto/user.create.dto";
import {UserListResponseDto} from "./dto/user.list.response.dto";

export class UserRepository {
    async get(query: object, options: {page: number, limit: number}): Promise<UserListResponseDto> {
        try {
            const list = await User.find(query)
                .limit(options.limit)
                .skip((options.page - 1) * options.limit)
                .exec();
            const count = await User.countDocuments();

            return {
                list,
                totalPages: Math.ceil(count / options.limit),
                currentPage: options.page
            };
        } catch(e) {
            throw new Error("Failed to fetch users");
        }
    }

    async getByEmail(email: string): Promise<UserDocument> {
        return User.findOne({email});
    }

    async save(saveData: UserCreateDto): Promise<UserDocument> {
        const newUser = new User(saveData);
        return newUser.save();
    }
}