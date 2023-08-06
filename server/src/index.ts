import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

import apiRoutes from "./routes";
import { envs } from "./config/envs";
import { LoggerStream, logger } from "./shared/logger";

logger.info(`Starting in ${envs.NODE_ENV} mode`);

const app = express();

app.use(bodyParser.json());

app.use(morgan("dev", { stream: new LoggerStream() }));

app.use("/api", apiRoutes);

app.listen(envs.PORT, () => {
    logger.info(`Server listening on port ${envs.PORT}`);
});
