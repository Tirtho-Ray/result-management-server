import { TResult } from "./result.intreface";
import { Result } from "./result.model";

const createResult = async (payload:TResult) =>{
    const result = await Result.create(payload);
    return result;
}

const getAllResults = async () => {
    const results = await Result.find()
      .populate({
        path: "studentId",
        select: "name boardRoll departmentId",
        populate: { path: "departmentId", select: "name" }, // Populate the student's department
      })
      .populate({
        path: "semesterId",
        select: "name ", // Populate semester details
      })
      .populate({
        path: "results.subjectId",
        select: "name credit mark", // Populate subject details inside results array
      });
  
    return results;
  };
  

export const ResultServices = {
    createResult,
    getAllResults
};
