import { Request, Response } from "express";
import { StudentServices } from "./student.services";
import { TStudent } from "./student.interface";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StudentQueryParams } from "./student.constant";

// Create a new student
const createStudent = catchAsync(async (req: Request, res: Response) => {
  const studentData: TStudent = req.body;
  const student = await StudentServices.createStudentIntoDB(studentData);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Student created successfully",
    data: student,
  });
});

// Get all students with filters, pagination, and sorting
const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const queryParams: StudentQueryParams = req.query;
  const studentsData = await StudentServices.getFilteredStudents(queryParams);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Students retrieved successfully",
    data: studentsData,
  });
});

// Get a single student by collageRoll
const getStudentByRoll = catchAsync(async (req: Request, res: Response) => {
  const { collageRoll } = req.params;
  const student = await StudentServices.findStudentByRoll(collageRoll);
  if (!student) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Student not found",
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student retrieved successfully",
    data: student,
  });
});

// const getStudentById = catchAsync(async (req, res) => {
//   const { studentId } = req.params; 
//   console.log("Received ID:", studentId);
//   const student = await StudentServices.getStudentById(studentId); 
//   console.log("Received ID:", studentId);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Student retrieved successfully",
//     data: student,
   
//   });
  
// });

const getStudentById = catchAsync((async (req,res)=>{
  const { id } = req.params; 
  const student = await StudentServices.getStudentById(id); 
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student retrieved successfully",
    data: student,
   
  });
}))


// Update a student by collageRoll
const updateStudentById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params; // Extract `id` from route parameters
  const updatedStudent = await StudentServices.updateStudentById(id, req.body); // Pass `id` and the payload

  if (!updatedStudent) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Student not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student updated successfully",
    data: updatedStudent,
  });
});

// Delete a student by collageRoll
const deleteStudentByRoll = catchAsync(async (req: Request, res: Response) => {
  const { roll } = req.params;
  const deletedStudent = await StudentServices.deleteStudentByRoll(roll);
  if (!deletedStudent) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Student not found",
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student deleted successfully",
    data: deletedStudent,
  });
});

// Exporting the controller methods
export const StudentController = {
  createStudent,
  getAllStudents,
  getStudentByRoll,
  updateStudentById,
  deleteStudentByRoll,
  getStudentById
};
