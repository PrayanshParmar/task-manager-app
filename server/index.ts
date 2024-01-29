import ServerlessHttp from "serverless-http";
import { app } from "./src";

export const handler = ServerlessHttp(app);