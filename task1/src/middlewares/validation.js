"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validate = void 0;
const custom_errors_1 = require("../errors/custom.errors");
class Validate {
    static setCache(req, _, next) {
        const { key, value, ttl } = req.body;
        if (key.length < 1)
            throw new custom_errors_1.KeyLengthValidationError();
        if (value === null)
            throw new custom_errors_1.ValueIsNullValidationError();
        if (!JSON.parse(value))
            throw new custom_errors_1.ValueIsNotValidJsonValidationError();
        if (ttl && ttl < 0)
            throw new custom_errors_1.TtlValidationError();
        next();
    }
    ;
    static cacheKeyParam(req, _, next) {
        const key = req.params.key;
        if (key.length < 1)
            throw new custom_errors_1.KeyLengthValidationError();
        next();
    }
    ;
}
exports.Validate = Validate;
