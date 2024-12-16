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
const getSingleSemesters = async(id:string)=>{
    const result = await Semester.findById(id);
    return result;
}

export const SemesterServices = {
    createSemestersIntoDB,
    getAllSemesters,
    getSingleSemesters
};