import express, { Express } from 'express';
import * as bodyParser from 'body-parser';
import { CacheRouter } from './router';
import { AppExceptionFilter } from "./middlewares/app-exception.filter";
import "dotenv/config";

const app: Express = express();
const PORT: number = parseInt(process.env.PORT as string);

const cacheRouter = new CacheRouter();

app.use(bodyParser.json());

const router = cacheRouter.create();
app.use('/cache', router);

app.use(AppExceptionFilter.handleErrors);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});