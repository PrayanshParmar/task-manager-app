import express from "express";
import cors from "cors";
import http from 'http';
import 'dotenv/config';
import routes from './routes';
import './db/db-mongo';
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 7000;
const app = express();

app.use(cors({
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/', routes());

const server = http.createServer(app);

// server.listen(PORT, () => {
//   console.log(`Server running on port: ${PORT}`)
// });

