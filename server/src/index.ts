import express from "express";
import 'dotenv/config';
import routes from './routes';
import './db/db-mongo';
import cookieParser from "cookie-parser";

export const app = express();


app.use(express.json());
app.use(cookieParser());
app.use('/', routes());

app.get('/health',(req,res)=>{
  res.status(200).json({"message":"success"})
})

