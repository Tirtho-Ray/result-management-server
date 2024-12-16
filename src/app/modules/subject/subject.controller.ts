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

 const getSingleSubject = catchAsync(async (req, res) => {
    const subject = await SubjectServices.getSingleSubject(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Subject retrieved successfully",
        data: subject,
    });
});

const updateSubject = catchAsync(async (req, res) => {
    const updatedSubject = await SubjectServices.updateSubject(req.params.id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Subject updated successfully",
        data: updatedSubject,
    });
});

const deleteSubject = catchAsync(async (req, res) => {
    await SubjectServices.deleteSubject(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Subject deleted successfully",
    });
});

 export const SubjectController = {
    createSubject,
    getAllSubject,
    getSingleSubject,
    updateSubject,
    deleteSubject,
 };
