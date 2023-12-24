"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppExceptionFilter = void 0;
const custom_errors_1 = require("../errors/custom.errors");
class AppExceptionFilter {
    static handleErrors(error, _, res, next) {
        if (error instanceof custom_errors_1.ValidationError) {
            res.status(400).json(error);
            return;
        }
        if (error instanceof custom_errors_1.ServerError) {
            res.status(500).json(error);
            return;
        }
        console.error('Unhandled Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.AppExceptionFilter = AppExceptionFilter;
