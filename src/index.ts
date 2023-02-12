import { mainRouter } from "./router/main.router";
import { Logger } from "./logger/logger";
import express, { Express } from "express";
import env from "./config/env";

const app: Express = express();
const PORT: number = env.APP.PORT;

app.use(express.json());
app.use('/email', mainRouter);

app.listen(PORT, () => {
    Logger.emphasis(`The app is running on port ${PORT}, have a good day!`);
});