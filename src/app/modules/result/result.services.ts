import { TResult } from "./result.intreface";
import { Result } from "./result.model";

const createResult = async (payload:TResult) =>{
    const result = await Result.create(payload);
    return result;
}

// const getAllResults = async () => {
//     const results = await Result.find()
//       .populate({
//         path: "studentId",
//         select: "name boardRoll departmentId",
//         populate: { path: "departmentId", select: "name" }, // Populate the student's department
//       })
//       .populate({
//         path: "semesterId",
//         select: "name ", // Populate semester details
//       })
//       .populate({
//         path: "results.subjectId",
//         select: "name credit mark subCode", // Populate subject details inside results array
//       });
  
//     return results;
//   };

const getAllResults = async (): Promise<(TResult & { GPA: string })[]> => {
  const results = await Result.find()
    .populate({
      path: "studentId",
      select: "name boardRoll departmentId",
      populate: { path: "departmentId", select: "name" },
    })
    .populate({
      path: "semesterId",
      select: "name",
    })
    .populate({
      path: "results.subjectId",
      select: "name credit mark subCode",
    });

  // Calculate GPA for each result
  const resultsWithGPA = results.map((result) => {
    let totalCredits = 0;
    let totalWeightedGradePoints = 0;

    result.results.forEach((subjectResult) => {
      const subject = subjectResult.subjectId as unknown as {
        name: string;
        credit: number;
        mark: number;
        subCode: string;
      };

      const obtainedMarks = subjectResult.obtainedMarks;

      // Calculate grade point
      const gradePoint = calculateGradePoint(obtainedMarks, subject.mark);
      const credit = subject.credit;

      // Update totals
      totalCredits += credit;
      totalWeightedGradePoints += gradePoint * credit;
    });

    // Calculate GPA
    const GPA = totalCredits > 0 ? (totalWeightedGradePoints / totalCredits).toFixed(2) : "0.00";

    return {
      ...result.toObject(),
      GPA, // Include calculated GPA
    };
  });

  return resultsWithGPA;
};

// Helper Function to Calculate Grade Point
const calculateGradePoint = (obtainedMarks: number, totalMarks: number): number => {
  const percentage = (obtainedMarks / totalMarks) * 100;

  if (percentage >= 80) return 4.0; // A+
  if (percentage >= 75) return 3.75; // A
  if (percentage >= 70) return 3.5; // A-
  if (percentage >= 65) return 3.25; // B+
  if (percentage >= 60) return 3.0; // B
  if (percentage >= 50) return 2.5; // C
  if (percentage >= 40) return 2.0; // D
  return 0.0; // F
};


  

export const ResultServices = {
    createResult,
    getAllResults
};
