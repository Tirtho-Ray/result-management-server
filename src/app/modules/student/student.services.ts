import { TStudent } from "./student.interface";
import { Student } from "./student.model";
import httpStatus from "http-status";
import appError from "../../error/appError";
import { StudentQueryParams } from "./student.constant";
import { SortOrder } from "mongoose";

// Create a student in the database
const createStudentIntoDB = async (payload: TStudent): Promise<TStudent> => {
  const existingStudent = await Student.findOne({
    $or: [
      { collageRoll: payload.collageRoll },
      { boardRoll: payload.boardRoll },
      { registration: payload.registration },
    ],
  });

  if (existingStudent) {
    throw new appError(httpStatus.BAD_REQUEST, "Student with the same unique details already exists");
  }

  const student = await Student.create(payload);
  return student.toObject() as TStudent;
};

// Get all students with filters (no pagination)
const getFilteredStudents = async (queryParams: StudentQueryParams) => {
  const { collageRoll, boardRoll, departmentId, semesterId, sortBy = "createdAt", sortOrder = "desc" } = queryParams;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filters: any = {};

  if (collageRoll) filters.collageRoll = { $regex: collageRoll, $options: "i" };
  if (boardRoll) filters.boardRoll = { $regex: boardRoll, $options: "i" };  // Case-insensitive search
  if (departmentId) filters.departmentId = departmentId;
  if (semesterId) filters.semesterId = semesterId;

  // console.log("Filters being applied:", filters);  // Log the filters to debug

  const sortCriteria: { [key: string]: SortOrder } = {
    [sortBy]: sortOrder === "desc" ? -1 : 1,
  };

  const students = await Student.find(filters)
    .populate("departmentId", "_id name")
    .populate("semesterId", "_id name")
    .sort(sortCriteria);

  return {
    students,
  };
};

// Find a student by `collageRoll` or `boardRoll`
const findStudentByRoll = async (collageRoll: string): Promise<TStudent | null> => {
  return await Student.findOne({ collageRoll })
    .populate("departmentId", "_id name")
    .populate("semesterId", "_id name")
    .populate("result")
    .lean(); // Return plain JS object
};

const getStudentById = async (id:string) => {
  const result = await Student.findById(id);
  return result;
};

// Update a student by `collageRoll`
const updateStudentById = async (id: string, payload: TStudent): Promise<TStudent | null> => {
  return await Student.findByIdAndUpdate(id, payload, { new: true }).lean();
};

// Delete a student by `collageRoll`
const deleteStudentByRoll = async (roll: string): Promise<TStudent | null> => {
  return await Student.findOneAndUpdate({ collageRoll: roll }, { deleted: true }, { new: true }).lean();
};

export const StudentServices = {
  createStudentIntoDB,
  getFilteredStudents,
  findStudentByRoll,
  updateStudentById,
  deleteStudentByRoll,
  getStudentById
};
