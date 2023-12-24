"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.CacheService = void 0;
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
const crypto = __importStar(require("crypto"));
const custom_errors_1 = require("../errors/custom.errors");
class CacheService {
    constructor(cacheDirectory) {
        this.cacheDirectory = cacheDirectory;
        this.ensureDirectoryExists();
    }
    ensureDirectoryExists() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs.mkdir(this.cacheDirectory, { recursive: true });
            }
            catch (e) {
                throw new custom_errors_1.CacheDirectoryCreationError(e instanceof Error ? e.message : String(e));
            }
        });
    }
    getFilePath(key) {
        const hash = crypto.createHash("sha256").update(key).digest("hex");
        return path.join(this.cacheDirectory, `${hash}.json`);
    }
    readCacheFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fs.readFile(filePath, 'utf-8');
                return JSON.parse(data);
            }
            catch (error) {
                console.error(`Error reading cache file ${filePath}:`, error.message);
                return null;
            }
        });
    }
    set(key, value, ttl) {
        return __awaiter(this, void 0, void 0, function* () {
            const expirationTime = ttl ? Date.now() + ttl * 1000 : null;
            const data = { value, expirationTime };
            const filePath = this.getFilePath(key);
            try {
                yield fs.writeFile(filePath, JSON.stringify(data));
            }
            catch (e) {
                throw new custom_errors_1.CacheFileCreationError(e instanceof Error ? e.message : String(e));
            }
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = this.getFilePath(key);
            const data = yield this.readCacheFile(filePath);
            if (!data)
                return null;
            if (!data.expirationTime)
                return data.value;
            if (data.expirationTime >= Date.now())
                return data.value;
            try {
                yield this.delete(key);
            }
            catch (e) {
                throw new custom_errors_1.RequestedCacheFileExpiredDeletionError(e instanceof Error ? e.message : String(e));
            }
            return null;
        });
    }
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = this.getFilePath(key);
            try {
                yield fs.unlink(filePath);
            }
            catch (e) {
                throw new custom_errors_1.CacheFileDeletionError(e instanceof Error ? e.message : String(e));
            }
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const files = yield fs.readdir(this.cacheDirectory);
                yield Promise.all(files.map((file) => __awaiter(this, void 0, void 0, function* () {
                    const filePath = path.join(this.cacheDirectory, file);
                    try {
                        yield fs.unlink(filePath);
                    }
                    catch (e) {
                        throw new custom_errors_1.CacheFileDeletionWhileClearingError(e instanceof Error ? e.message : String(e));
                    }
                })));
            }
            catch (e) {
                throw new custom_errors_1.ClearingCachedFilesError(e instanceof Error ? e.message : String(e));
            }
        });
    }
}
exports.CacheService = CacheService;
