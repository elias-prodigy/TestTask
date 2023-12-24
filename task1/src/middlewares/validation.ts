import express, {Request, Response} from 'express';
import {
    KeyLengthValidationError,
    TtlValidationError,
    ValueIsNullValidationError
} from "../errors/custom.errors";

export class Validate {

    static setCache (req: Request, _: Response, next: express.NextFunction): void {
        const { key, value, ttl }: { key: string, value: any, ttl?: number } = req.body;
        if (key.length < 1) throw new KeyLengthValidationError();
        if (value === null) throw new ValueIsNullValidationError();
        if (ttl && ttl < 0) throw new TtlValidationError();
        next();
    };

    static cacheKeyParam (req: Request, _: Response, next: express.NextFunction): void {
        const key: string = req.params.key;
        if (key.length < 1) throw new KeyLengthValidationError();
        next();
    };
}