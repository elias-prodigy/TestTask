import express, { Request, Response } from 'express';
import {ServerError, ValidationError} from "../errors/custom.errors";

export class AppExceptionFilter {
    static handleErrors(error: any, _: Request, res: Response, next: express.NextFunction): void {
        if (error instanceof ValidationError) {
            res.status(400).json(error);
            return;
        }
        if (error instanceof ServerError) {
            res.status(500).json(error);
            return;
        }
        console.error('Unhandled Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}