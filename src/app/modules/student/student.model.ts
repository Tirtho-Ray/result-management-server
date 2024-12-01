import { model, Schema } from "mongoose";
import { TStudent } from "./student.interface";

// Define the student schema
const studentSchema = new Schema<TStudent>({
  name: {
    type: String,
    required: true,
  },
  roll: {
    type: Number,
    required: true,
  },
  semester: {
    type: String,
    required: true,
    min: 1,
    max: 8,  // Restrict semester values to between 1 and 8  
  },
  department: {
    type: String,
    enum: ["CST", "MT", "ET", "TT", "CT"],  // Restrict department values to specific options
    required: true,
  },
});

// Create the Student model from the schema
export const Students = model<TStudent>("Student", studentSchema);
