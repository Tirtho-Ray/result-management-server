import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StudentServices } from "./student.services";

// Create a student
const createStudent = catchAsync(async (req, res) => {
  const student = await StudentServices.createStudentIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Student created successfully",
    data: student,
  });
});

// Get all students
const getAllStudents = catchAsync(async (req, res) => {
  const students = await StudentServices.getAllStudentIntoDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Students retrieved successfully",
    data: students,
  });
});

// Get student by roll
const getStudentByRoll = catchAsync(async (req, res) => {
  const { collageRoll,boardRoll } = req.params;
  const student = await StudentServices.findStudent(collageRoll,boardRoll);
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

// Update student by roll
const updateStudentByRoll = catchAsync(async (req, res) => {
  const { roll } = req.params;
  const updatedStudent = await StudentServices.updateStudentByRoll(roll, req.body);
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

// Delete student by roll
const deleteStudentByRoll = catchAsync(async (req, res) => {
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

// Export controllers
export const StudentController = {
  createStudent,
  getAllStudents,
  getStudentByRoll,
  updateStudentByRoll,
  deleteStudentByRoll,
};
