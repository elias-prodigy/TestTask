import express, { Express } from 'express';
import bodyParser from 'body-parser';
import mongoose, { ConnectOptions } from 'mongoose';
import "dotenv/config";
import { UserRouter } from "./router";
import { limiter } from "./middlewares/rate.limit";

const app: Express = express();
const PORT: number = parseInt(process.env.PORT as string);

app.use(limiter);

app.use(bodyParser.json());

const userRouter = new UserRouter();

const router = userRouter.create();
app.use('/users', router);

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions)
    .then((): void => {
        app.listen(PORT, () => {
            console.log(`Server listening at http://localhost:${PORT}`);
        });
    })
    .catch((e) => console.error("Can't connect to database", e.message));