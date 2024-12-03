import { Types } from "mongoose";

export type TResultSummary = {
    semesterId: string;     // Reference to the Semester
    results: string; // Array of subjects and their marks
    totalMarks: number;     // Total marks for the semester
    GPA: number;            // GPA for the semester
  };

export type TStudent ={
    name:string;
    roll:string;
    registration:string;
    session:string;
    departmentId:Types.ObjectId;
    semesterId:Types.ObjectId;
    email?: string;
    phone?: string;
    address?: string;
    dateOfBirth?: Date;
};