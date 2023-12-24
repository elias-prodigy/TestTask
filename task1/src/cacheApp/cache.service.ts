import * as fs from 'fs/promises';
import * as path from 'path';
import * as crypto from 'crypto';
import {
    CacheDirectoryCreationError,
    CacheFileCreationError,
    CacheFileDeletionError,
    ClearingCachedFilesError,
    RequestedCacheFileExpiredDeletionError,
} from "../errors/custom.errors";

interface CacheEntry {
    value: any;
    expirationTime: number | null;
}

export class CacheService {
    private cacheDirectory: string;

    constructor(cacheDirectory: string) {
        this.cacheDirectory = cacheDirectory;
        this.ensureDirectoryExists();
    }

    private async ensureDirectoryExists(): Promise<void> {
        try {
            await fs.mkdir(this.cacheDirectory, { recursive: true });
        } catch (e) {
            throw new CacheDirectoryCreationError(e instanceof Error ? e.message : String(e));
        }
    }

    private getFilePath(key: string): string {
        const hash: string = crypto.createHash("sha256").update(key).digest("hex");
        return path.join(this.cacheDirectory, `${hash}.json`);
    }

    private async readCacheFile(filePath: string): Promise<any> {
        try {
            const data: string = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error: any) {
            console.error(`Error reading cache file ${filePath}:`, error.message);
            return null;
        }
    }

    async set(key: string, value: any, ttl?: number): Promise<void> {
        const expirationTime: number | null = ttl ? Date.now() + ttl * 1000 : null;
        const data: CacheEntry = { value, expirationTime };

        const filePath: string = this.getFilePath(key);

        try {
            await fs.writeFile(filePath, JSON.stringify(data));
        } catch (e) {
            throw new CacheFileCreationError(e instanceof Error ? e.message : String(e));
        }
    }

    async get(key: string): Promise<any> {
        const filePath: string = this.getFilePath(key);
        const data: any = await this.readCacheFile(filePath);
        if (!data) return null;
        if (!data.expirationTime) return data.value;
        if (data.expirationTime >= Date.now()) return data.value;

        try {
            await this.delete(key);
        } catch (e) {
            throw new RequestedCacheFileExpiredDeletionError(e instanceof Error ? e.message : String(e));
        }

        return null;
    }

    async delete(key: string): Promise<void> {
        const filePath: string = this.getFilePath(key);

        try {
            await fs.unlink(filePath);
        } catch (e) {
            throw new CacheFileDeletionError(e instanceof Error ? e.message : String(e));
        }
    }

    async clear(): Promise<void> {
        try {
            const files: string[] = await fs.readdir(this.cacheDirectory);

            await Promise.all(files.map(async (file: string): Promise<void> => {
                const filePath = path.join(this.cacheDirectory, file);
                try {
                    await fs.unlink(filePath);
                } catch (e) {
                   console.error(`Can not unlink file: ${file}`, e instanceof Error ? e.message : String(e));
                }
            }));
        } catch (e) {
            throw new ClearingCachedFilesError(e instanceof Error ? e.message : String(e));
        }
    }
}