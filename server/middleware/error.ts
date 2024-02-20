import ErrorHandler from "../utils/ErrorHandler";
import { NextFunction,Request,Response } from "express";

export const ErrorMiddleware = (err:any,req:Request,res:Response,next:NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message    = err.message    || "Internal server error"

    //wrong mongo ID
    if(err.name === 'CastError') {
        const message = `Resource not found. Invalid ${err.path}`;
        err = new ErrorHandler(message,400);
    }
    //duplicate error
    if(err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message,400);
    }
    //wrong jwt error
    if(err.name === 'JsonWebTokenError') {
        const message = `Json web token invalid ,try again`;
        err = new ErrorHandler(message,400);
    }
    //Jwt expiry
    if(err.name === 'TokenExpiredError') {
        const message = `Json web token expired,try again`;
        err = new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        message: err.message
    })



}