import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/connect";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const CONENCTION_STRING = process.env.CONNECTION_STRING;

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
start() ;
