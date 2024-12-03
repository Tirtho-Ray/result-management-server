import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SubjectServices } from "./subject.services";

const createSubject = catchAsync(async(req,res) =>{
    const subject = await SubjectServices.createSubjectsIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Subject created successfully",
        data: subject
    });
 });

 const getAllSubject = catchAsync(async(req,res) =>{
    const subjects = await SubjectServices.getAllSubject();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Subjects retrieved successfully",
        data: subjects
    });
 });

 export const SubjectController = {
    createSubject,
    getAllSubject
 };
