import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ResultServices } from "./result.services";



const createResult =catchAsync(async(req,res)=>{
    const result = await ResultServices.createResult(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: " create result successfully",
        data: result
    });
});

const getResult = catchAsync ( (async(req,res) =>{
    const result = await ResultServices.getAllResults();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "result retrieved successfully",
        data: result
    });
}))

export const  ResultController= {
    createResult,
    getResult
};
