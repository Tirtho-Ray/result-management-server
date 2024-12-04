import httpStatus from "http-status";
import appError from "../../error/appError";
import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDB = async (payload:TStudent) =>{
    const existingUser = await Student.findOne({ collageRoll: payload.boardRoll });
        if (existingUser) {
            throw new appError(httpStatus.BAD_REQUEST, 'This board roll already exists');
        }
    const student = await Student.create(payload);
    return student;
};

const getAllStudentIntoDB = async () =>{
    const students = await Student.find()
    .populate("departmentId","_id name")
    .populate("semesterId","_id name")
    .populate("result");
    return students;
};

const findStudent = async (collageRoll: string, boardRoll: string) => {
    const student = await Student.findOne({
      collageRoll,
      boardRoll,
    })
      .populate("departmentId", "_id name")
      .populate("semesterId", "_id name")
      .populate("result");
  
    return student;
  };
  

const updateStudentByRoll = async (roll:string, payload: TStudent) => {
    const student = await Student.findOneAndUpdate({ collageRoll: roll }, payload, { new: true });
    return student;
};

const deleteStudentByRoll = async (roll:string) => {
    const student = await Student.findOneAndDelete({ collageRoll: roll });
    return student;
};

export const StudentServices= {
    createStudentIntoDB,
    getAllStudentIntoDB,
    findStudent,
    updateStudentByRoll,
    deleteStudentByRoll
}