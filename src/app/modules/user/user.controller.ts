import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.services";


const createAdmin = catchAsync(async (req, res) => {
    const result = await UserServices.createAdminIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin created successfully",
        data: result
    });
});

export const UserController = {
  createAdmin
};
