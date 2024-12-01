import { TStudent } from "./student.interface";
import { Students } from "./student.model";

// Create a new student
const createStudentIntoDB = async (payload: TStudent) => {
  const result = await Students.create(payload);
  return result;
};

// Get all students
const getAllStudents = async () => {
  const result = await Students.find();
  return result;
};

// Get a single student by roll or ID
const getStudentByIdOrRoll = async (id: string | number) => {
  // If id is a number (roll), search by roll, otherwise by _id
  const result = await Students.findOne({
    $or: [{ roll: id }, { _id: id }]
  });
  return result;
};

// Update student by roll or ID
const updateStudent = async (id: string | number, payload: Partial<TStudent>) => {
  // Update by roll or _id
  const result = await Students.findOneAndUpdate(
    { $or: [{ roll: id }, { _id: id }] },
    payload,
    { new: true }  // Return the updated document
  );
  return result;
};

// Delete student by roll or ID
const deleteStudent = async (id: string | number) => {
  const result = await Students.findOneAndDelete({
    $or: [{ roll: id }, { _id: id }]
  });
  return result;
};

export const StudentsServices = {
  createStudentIntoDB,
  getAllStudents,
  getStudentByIdOrRoll,
  updateStudent,
  deleteStudent
};
