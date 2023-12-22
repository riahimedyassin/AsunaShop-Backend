import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/connect";
import { router as ProductRoute } from "./routes/Product.route";
import { router as CompanyRoute } from "./routes/Company.route";
import { ErrorHandler } from "./error/handler/ErrorHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const CONENCTION_STRING = process.env.CONNECTION_STRING;
const BASE_URL = "/api/asuna/v1";

/*
    ROUTES
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${BASE_URL}/products`, ProductRoute);
app.use(`${BASE_URL}/companies`, CompanyRoute);
app.use(ErrorHandler);

const start = async () => {
  try {
    if (typeof CONENCTION_STRING == "string") {
      const connected = await connectToDB(CONENCTION_STRING);
      app.listen(PORT, () => {
        console.info(`[SERVER] : Server Running on PORT ${PORT}`);
      });
    }
  } catch (error: any) {
    console.error(`[SERVER] : Could not run the server`);
    console.error(`[ERROR] : ${error.message}`);
  }
};

start();
