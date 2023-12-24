import { Router } from 'express';
import { UserController } from './userApp/user.controller';
import { Validate } from "./middlewares/validation";

export class UserRouter {
    controller: UserController;

    constructor() {
        this.controller = new UserController();
    }

    public create(): Router {
        const router: Router = Router();

        // Endpoint to get users
        router.get('/', this.controller.get.bind(this.controller));

        // Endpoint to create a user
        router.post('/', Validate.saveUser, this.controller.save.bind(this.controller));

        return router;
    }
}
