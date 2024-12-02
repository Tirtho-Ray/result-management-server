import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { DepartmentServices } from "./department.services";

const createDepartments =catchAsync(async(req,res)=>{
    const department = await DepartmentServices.createDepartmentsIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Department created successfully",
        data: department
    });
});

const getDepartments = catchAsync ( (async(req,res) =>{
    const departments = await DepartmentServices.getAllDepartments();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Departments retrieved successfully",
        data: departments
    });
}))

export const DepartmentController = {
    createDepartments,
    getDepartments
};
