import { Request, Response, NextFunction } from 'express';
import { User, UserDocument } from '../userApp/database/User';

export class Validate {
    static saveUser(req: Request, res: Response, next: NextFunction): void {
        const { name, email, age }: { name: string, email: string, age: number } = req.body;

        const newUser: UserDocument = new User({ name, email, age });

        newUser.validate()
            .then(() => {
                next();
            })
            .catch((validationError) => {
                const errorMessages = Object.values(validationError.errors).map((err: any) => err.message);
                return next(errorMessages);
        });
    }
}
