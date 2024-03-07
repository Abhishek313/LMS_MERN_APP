require('dotenv').config();
import express, { NextFunction, Request, Response } from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";

export const app = express();

//body-parser
app.use(express.json({limit : "50mb"}))

//cookier-parser

app.use(cookieParser());

//cors 
app.use(cors(
    {
        origin : process.env.ORIGIN
    }
));

//testing api
app.get('/test',(req:Request,res:Response,next:NextFunction) => {
  res.status(200).json({
    success: true,
    message: 'api is working'
  })
})


app.get('/', (req,res) => {
    res.send("Hello world") ; 
 })

app.all("*",(req:Request,res:Response,next:NextFunction) => {
   const err = new Error(`Router ${req.originalUrl} not found `) as any;
   err.statusCode = 404;
   next(err);
})

app.use(ErrorMiddleware);





