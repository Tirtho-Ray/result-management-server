/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import appError from "../../error/appError";
import { Subject } from "../subject/subject.model";
import { TResult } from "./result.intreface";
import { Result } from "./result.model";
import { calculateGradePointAndGrade } from "./result.constant";
import { Student } from "../student/student.model";



const createResult = async (payload: TResult) => {
  // Validate if a result for the student and semester already exists
  const existingResult = await Result.findOne({
    studentId: payload.studentId,
    semesterId: payload.semesterId,
  });

  if (existingResult) {
    throw new appError(httpStatus.BAD_REQUEST,"A result already exists for this student in the specified semester.");
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








const fetchSubjectsBySemester = async (semesterId: string) => {
  try {
    const subjects = await Subject.find({ semesterId });
    return subjects;
  } catch (error) {
    throw new Error("Failed to fetch subjects.");
  }
};

const getAllResults = async () => {
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

  // Format results for better readability
  
 return results;
};


const getResultByBoardRollAndSemester = async (boardRoll: string, semesterId: string) => {
  // Find the student by boardRoll
  const student = await Student.findOne({ boardRoll }).select("name boardRoll departmentId");

  if (!student) {
    throw new appError(httpStatus.NOT_FOUND, "Student not found.");
  }

  // Find the result for the student in the given semester
  const result = await Result.findOne({
    studentId: student._id,
    semesterId,
  })
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

  if (!result) {
    throw new appError(httpStatus.NOT_FOUND, "Result not found for this student in the specified semester.");
  }

  let totalCredits = 0;
  let totalWeightedGradePoints = 0;
  let isFail = false;

  const detailedResults = result.results.map((subjectResult) => {
    const subject = subjectResult.subjectId as unknown as {
      name?: string;
      credit?: number;
      mark?: number;
      subCode?: string;
    };

    const obtainedMarks = subjectResult.obtainedMarks;

    if (!subject || !subject.credit || !subject.mark) {
      throw new appError(httpStatus.INTERNAL_SERVER_ERROR, "Invalid subject data.");
    }

    // Calculate grade point and grade
    const { gradePoint, grade } = calculateGradePointAndGrade(obtainedMarks, subject.mark);

    // Check for failure
    if (grade === "F") {
      isFail = true;
    }

    // Update totals for GPA calculation
    totalCredits += subject.credit;
    totalWeightedGradePoints += gradePoint * subject.credit;

    // Return detailed subject result
    return {
      _id:subject._id,
      subjectName: subject.name,
      subCode: subject.subCode,
      credit: subject.credit,
      obtainedMarks,
      totalMarks: subject.mark,
      gradePoint,
      grade,
    };
  });

  // If any subject is failed, GPA is 0.00 and status is Fail
  const GPA = isFail ? "0.00" : (totalWeightedGradePoints / totalCredits).toFixed(2);
  const status = isFail ? "Fail" : "Pass";

  return {
    _id: result._id,
    studentName: student.name,
    boardRoll: student.boardRoll,
    semester: result.semesterId.name,
    department: student.departmentId.name,
    GPA,
    status, 
    results: detailedResults,
  };
};



const updateMultipleObtainedMarks = async (resultId: string, updatedMarks: Array<{ subjectId: string; obtainedMarks: number }>) => {
  // Fetch the result to be updated
  const result = await Result.findById(resultId);

  if (!result) {
    throw new appError(httpStatus.NOT_FOUND, "Result not found.");
  }

  // Iterate over the updates and validate them
  for (const update of updatedMarks) {
    const { subjectId, obtainedMarks } = update;

    // Find the specific subject in the result
    const subjectResult = result.results.find((res) => res.subjectId.toString() === subjectId);

    if (!subjectResult) {
      throw new appError(httpStatus.NOT_FOUND, `Subject with ID ${subjectId} not found in the result.`);
    }

    // Fetch the subject to validate marks
    const subject = await Subject.findById(subjectId);

    if (!subject) {
      throw new appError(httpStatus.NOT_FOUND, `Subject with ID ${subjectId} not found.`);
    }

    // Ensure the obtained marks do not exceed the subject's maximum marks
    if (obtainedMarks > subject.mark) {
      throw new appError(
        httpStatus.BAD_REQUEST,
        `Obtained marks (${obtainedMarks}) exceed the maximum marks (${subject.mark}) for the subject "${subject.name}".`
      );
    }

    // Update the obtained marks
    subjectResult.obtainedMarks = obtainedMarks;
  }

  // Save the updated result
  await result.save();

  // Return the updated result with full details
  return await Result.findById(resultId)
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
      select: "name subCode credit mark",
    });
};




export const ResultServices = {
    createResult,
    fetchSubjectsBySemester,
    getResultByBoardRollAndSemester,
    getAllResults,
    updateMultipleObtainedMarks
}
