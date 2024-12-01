import mongoose from "mongoose";
import { TErrorSource, TGenericError } from "./interface/err";

const handelCastError = (err:mongoose.Error.CastError):TGenericError =>{
    const errorSources : TErrorSource =[{
        path:err.path,
        message:err.message,
    }]
    const statusCode = 400;
  return {
    statusCode,
    message: 'invalid error',
    errorSources,
  };
}

export default handelCastError;