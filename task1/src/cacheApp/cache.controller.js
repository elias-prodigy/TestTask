"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheController = void 0;
const cache_service_1 = require("./cache.service");
class CacheController {
    constructor() {
        this.cacheService = new cache_service_1.CacheService(process.env.CACHE_FOLDER);
    }
    set(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { key, value, ttl } = req.body;
            yield this.cacheService.set(key, value, ttl);
            res.json({ success: true });
        });
    }
    ;
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = req.params.key;
            // console.log(this.cacheService);
            const result = yield this.cacheService.get(key);
            res.json(result);
        });
    }
    ;
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = req.params.key;
            yield this.cacheService.delete(key);
            res.json({ success: true });
        });
    }
    ;
    clear(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.cacheService.clear();
            res.json({ success: true });
        });
    }
    ;
}
exports.CacheController = CacheController;
