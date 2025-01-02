import { Types } from "mongoose";

// result.interface.ts
export type TResultSubject = {
    subjectId: string;
    obtainedMarks: number;  
  };
  
  export type TResult = {
    studentId: Types.ObjectId;        
    semesterId: Types.ObjectId;
    results: TResultSubject[];   
    GPA: string;               
  };
  
  export type TResult2 = {
    studentId: Types.ObjectId;        
    semesterId: Types.ObjectId;
    results: TResultSubject[];   
    GPA: string;               
  };
  export type TResult3 = {
    studentId: Types.ObjectId;        
    semesterId: Types.ObjectId;
    results: TResultSubject[];   
    GPA: string;               
  };
  
