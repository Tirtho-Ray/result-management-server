import { Subject } from "../subject/subject.model";
import { TResult } from "./result.intreface";
import { Result } from "./result.model";

// const createResult = async (payload:TResult) =>{
//     const result = await Result.create(payload);
//     return result;
// }

const createResult = async (payload: TResult) => {
  // Validate if a result for the student and semester already exists
  const existingResult = await Result.findOne({
    studentId: payload.studentId,
    semesterId: payload.semesterId,
  });

  if (existingResult) {
    throw new Error("A result already exists for this student in the specified semester.");
  }

  // Fetch all subjects for the provided subject IDs
  const subjectIds = payload.results.map((result) => result.subjectId);
  const subjects = await Subject.find({ _id: { $in: subjectIds } });

  if (subjects.length !== subjectIds.length) {
    throw new Error("One or more subjects do not exist.");
  }

  // Validate that all subjects belong to the provided semester
  for (const subject of subjects) {
    if (!subject.semesterId) {
      throw new Error(`Subject "${subject.name}" does not have a valid semester ID.`);
    }

    if (!subject.semesterId.equals(payload.semesterId)) {
      throw new Error(`Subject "${subject.name}" does not belong to the semester "${payload.semesterId}".`);
    }
  }

  // Validate that obtained marks do not exceed the subject's maximum marks
  for (const result of payload.results) {
    const subject = subjects.find((sub) => sub._id.equals(result.subjectId));
    if (subject && result.obtainedMarks > subject.mark) {
      throw new Error(
        `Obtained marks (${result.obtainedMarks}) for subject "${subject.name}" exceed the maximum marks (${subject.mark}).`
      );
    }
  }

  // Create the result
  const result = await Result.create(payload);
  return result;
};





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
        name?: string;
        credit?: number;
        mark?: number;
        subCode?: string;
      };

      const obtainedMarks = subjectResult.obtainedMarks;

      if (subject && subject.credit && subject.mark) {
        // Calculate grade point
        const gradePoint = calculateGradePoint(obtainedMarks, subject.mark);
        const credit = subject.credit;

        // Update totals
        totalCredits += credit;
        totalWeightedGradePoints += gradePoint * credit;
      }
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
