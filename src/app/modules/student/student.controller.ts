import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StudentsServices } from "./student.services";

// Create a new student
const createStudent = catchAsync(async (req, res) => {
    const result = await StudentsServices.createStudentIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,  // 201 is the status code for resource creation
        success: true,
        message: "Student created successfully",
        data: result
    });
});

// Get all students
const getAllStudents = catchAsync(async (req, res) => {
    const result = await StudentsServices.getAllStudents();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Students retrieved successfully",
        data: result
    });
});

// Get a single student by ID or Roll
const getStudent = catchAsync(async (req, res) => {
    const { id } = req.params;  // Assuming the student ID or roll is passed in the URL params
    const result = await StudentsServices.getStudentByIdOrRoll(id);
    if (!result) {
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
        data: result
    });
});

// Update a student by ID or Roll
const updateStudent = catchAsync(async (req, res) => {
    const { id } = req.params;  // Student ID or Roll
    const result = await StudentsServices.updateStudent(id, req.body);
    if (!result) {
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
        data: result
    });
});

// Delete a student by ID or Roll
const deleteStudent = catchAsync(async (req, res) => {
    const { id } = req.params;  // Student ID or Roll
    const result = await StudentsServices.deleteStudent(id);
    if (!result) {
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
        data: result
    });
});

export const StudentController = {
    createStudent,
    getAllStudents,
    getStudent,
    updateStudent,
    deleteStudent
};
