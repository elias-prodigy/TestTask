import { Request, Response } from 'express';
import { UserService } from './user.service';
import { UserCreateDto } from "./dto/user.create.dto";
import { UserDocument } from "./database/User";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async get (req: Request, res: Response): Promise<void> {
        const { page, limit } = req.query;
        const options: {page: number, limit: number} = {
            page: parseInt(page as string) || 1,
            limit: parseInt(limit as string) || 10,
        };
        const users = await this.userService.get({}, options);
        res.status(200).json(users);
    };

    async save (req: Request, res: Response): Promise<void> {
        const { name, email, age } = req.body;
        let savedUser: UserDocument;
        try {
            savedUser = await this.userService.save({name, email, age} as UserCreateDto);
        } catch(e) {
            res.status(400).send({error: e.message});
        }
        res.status(201).json(savedUser);
    };
}
