import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SemesterServices } from "./semester.services";


const createSemesters =catchAsync(async(req,res)=>{
    const department = await SemesterServices.createSemestersIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Semester created successfully",
        data: department
    });
});

const getSemesters = catchAsync ( (async(req,res) =>{
    const departments = await SemesterServices.getAllSemesters();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Semester retrieved successfully",
        data: departments
    });
}))
const getSingleSemesters = catchAsync ( (async(req,res) =>{
    const {id} = req.params;
    const departments = await SemesterServices.getSingleSemesters(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Semester retrieved successfully",
        data: departments
    });
}))

export const SemesterController = {
    createSemesters,
    getSemesters,
    getSingleSemesters
};
