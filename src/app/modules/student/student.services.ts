import httpStatus from "http-status";
import appError from "../../error/appError";
import { TStudent } from "./student.interface";
import { Student } from "./student.model";

// Create a student into the database
const createStudentIntoDB = async (payload: TStudent) => {
  // Validate if the collageRoll already exists
  const existingCollageRoll = await Student.findOne({ collageRoll: payload.collageRoll });
  if (existingCollageRoll) {
    throw new appError(httpStatus.BAD_REQUEST, 'This collage roll already exists');
  }

  // Validate if the boardRoll already exists
  if (payload.boardRoll) {
    const existingBoardRoll = await Student.findOne({ boardRoll: payload.boardRoll });
    if (existingBoardRoll) {
      throw new appError(httpStatus.BAD_REQUEST, 'This Board roll already exists');
    }
  }

  // Validate if the registration number already exists
  if (payload.registration) {
    const existingRegistration = await Student.findOne({ registration: payload.registration });
    if (existingRegistration) {
      throw new appError(httpStatus.BAD_REQUEST, 'This registration number already exists');
    }
  }

  // Create student if all validations pass
  const student = await Student.create(payload);
  return student;
};

// Get all students from the database
const getAllStudentIntoDB = async () => {
  const students = await Student.find()
    .populate("departmentId", "_id name")
    .populate("semesterId", "_id name");
  return students;
};

// Find a student by collageRoll or boardRoll
const findStudent = async (collageRoll: string, boardRoll: string) => {
  const student = await Student.findOne({
    $or: [{ collageRoll }, { boardRoll }],
  })
    .populate("departmentId", "_id name")
    .populate("semesterId", "_id name")
    .populate("result");

  return student;
};

// Update student by collageRoll
const updateStudentByRoll = async (roll: string, payload: TStudent) => {
  const student = await Student.findOneAndUpdate({ collageRoll: roll }, payload, { new: true });
  return student;
};

// Delete student by collageRoll
const deleteStudentByRoll = async (roll: string) => {
  const student = await Student.findOneAndUpdate({ collageRoll: roll }, { deleted: true }, { new: true }); // Soft delete
  return student;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentIntoDB,
  findStudent,
  updateStudentByRoll,
  deleteStudentByRoll,
};
