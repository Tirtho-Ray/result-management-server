import { TSemester } from "./semester.interface";
import { Semester } from "./semester.model";


const createSemestersIntoDB =async (payload:TSemester) =>{
    const result = await Semester.create(payload);
    return result;
}
const getAllSemesters = async()=>{
    const result = await Semester.find();
    return result;
}

export const SemesterServices = {
    createSemestersIntoDB,
    getAllSemesters
};