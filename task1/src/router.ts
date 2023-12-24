import { Router } from 'express';
import { CacheController } from './cacheApp/cache.controller';
import { Validate } from "./middlewares/validation";

export class CacheRouter {
    controller: CacheController;

    constructor() {
        this.controller = new CacheController();
    }

    public create(): Router {
        const router: Router = Router();

        // Endpoint to set a cache entry
        router.put('/', Validate.setCache, this.controller.set.bind(this.controller));

        // Endpoint to get a cache entry
        router.get('/:key', Validate.cacheKeyParam, this.controller.get.bind(this.controller));

        // Endpoint to delete a cache entry
        router.delete('/:key', Validate.cacheKeyParam, this.controller.delete.bind(this.controller));

        // Endpoint to clear all cache entries
        router.delete('/clear/all', this.controller.clear.bind(this.controller));

        return router;
    }
}
