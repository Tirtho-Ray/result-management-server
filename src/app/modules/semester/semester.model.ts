// department.model.ts
import { model, Schema } from "mongoose";
import { TSemester } from "./semester.interface";
import { Semesters } from "./semester.constant";



const semesterSchema = new Schema<TSemester>({
  name: {
    type: String,
    enum: Semesters, 
    required: true,
  },
});

// Define and export the Mongoose model
export const Semester = model<TSemester>("Semester", semesterSchema);
