import { Express } from "express";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { HTTP_ERROR } from "../../constants/HTTP_ERROR";

const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

export const securityLayer = (app: Express) => {
  app.use(hpp());
  app.use(helmet());
  app.use(
    cors({
      origin: CORS_ORIGIN,
    })
  );
  app.use(
    rateLimit({
      limit: 2000,
      statusCode: 429,
      message: HTTP_ERROR[429],
    })
  );
};
