"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheRouter = void 0;
const express_1 = require("express");
const cache_controller_1 = require("./cacheApp/cache.controller");
const validation_1 = require("./middlewares/validation");
class CacheRouter {
    constructor() {
        this.controller = new cache_controller_1.CacheController();
    }
    create() {
        const router = (0, express_1.Router)();
        // Endpoint to set a cache entry
        router.post('/set', validation_1.Validate.setCache, this.controller.set);
        // Endpoint to get a cache entry
        router.get('/get/:key', validation_1.Validate.cacheKeyParam, this.controller.get);
        // Endpoint to delete a cache entry
        router.delete('/delete/:key', validation_1.Validate.cacheKeyParam, this.controller.delete);
        // Endpoint to clear all cache entries
        router.delete('/clear', this.controller.clear);
        return router;
    }
}
exports.CacheRouter = CacheRouter;
