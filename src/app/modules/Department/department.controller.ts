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

export const DepartmentController = {
    createDepartments,
};
