import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 100,
    message: 'Too many requests from this IP, please try again later',
});