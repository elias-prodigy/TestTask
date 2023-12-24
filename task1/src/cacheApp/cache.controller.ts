import { Request, Response } from 'express';
import { CacheService } from './cache.service';

export class CacheController {
    private cacheService: CacheService;

    constructor() {
        this.cacheService = new CacheService(process.env.CACHE_FOLDER as string);
    }
    
    async set (req: Request, res: Response): Promise<void> {
        const { key, value, ttl }: { key: string, value: any, ttl?: number } = req.body;
        await this.cacheService.set(key, value, ttl);
        res.json({ success: true });
    };

    async get (req: Request, res: Response): Promise<void> {
        const key: string = req.params.key;
        const result: any = await this.cacheService.get(key);
        res.json(result);
    };

    async delete (req: Request, res: Response): Promise<void> {
        const key: string = req.params.key;
        await this.cacheService.delete(key);
        res.json({ success: true });
    };

    async clear (_: Request, res: Response): Promise<void> {
        await this.cacheService.clear();
        res.json({ success: true });
    };
}
