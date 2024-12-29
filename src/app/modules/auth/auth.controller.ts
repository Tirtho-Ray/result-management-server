import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.services";


//  User registration
const register = catchAsync(async (req: Request, res: Response) => {
  const { user, accessToken, refreshToken } = await AuthService.register(req.body);

  sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User registered successfully",
      data: {
          user, 
          accessToken, 
          refreshToken,
      },
  });
});


// User login
const login = catchAsync(async (req: Request, res: Response) => {
  const { accessToken, refreshToken, user } = await AuthService.login(req.body); // Include user in response


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully!",
    data: {
      user, // Return user data if needed
      accessToken,
      refreshToken
    },
  });
});



export const AuthController = {
  register,
  login
};
