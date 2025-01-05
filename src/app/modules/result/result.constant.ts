import { Types } from "mongoose";

export const calculateGradePointAndGrade = (
  obtainedMarks: number,
  totalMarks: number
): { gradePoint: number; grade: string } => {
  const percentage = (obtainedMarks / totalMarks) * 100;

  if (percentage >= 80) return { gradePoint: 4.0, grade: "A+" };
  if (percentage >= 75) return { gradePoint: 3.75, grade: "A" };
  if (percentage >= 70) return { gradePoint: 3.5, grade: "A-" };
  if (percentage >= 65) return { gradePoint: 3.25, grade: "B+" };
  if (percentage >= 60) return { gradePoint: 3.0, grade: "B" };
  if (percentage >= 50) return { gradePoint: 2.5, grade: "C" };
  if (percentage >= 40) return { gradePoint: 2.0, grade: "D" };
  return { gradePoint: 0.0, grade: "F" };
};

export type TResultSubject = {
  subjectId: Types.ObjectId | { name: string; credit: number; mark: number; subCode: string };
  obtainedMarks: number;
};

export type TResult = {
  studentId: Types.ObjectId | { name: string; boardRoll: string; departmentId: { name: string } };
  semesterId: Types.ObjectId | { name: string };
  results: TResultSubject[];
  GPA: string;
};
