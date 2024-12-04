import { Types } from "mongoose";

// result.interface.ts
export type TResultSubject = {
    subjectId: string;
    obtainedMarks: string;  
  };
  
  export type TResult = {
    studentId: Types.ObjectId;        
    semesterId: Types.ObjectId;      
    results: TResultSubject[]; 
    totalMarks: string;        
    GPA: string;               
  };
  
