import { z } from "zod";

// Define the student validation schema
const createStudentValidations = z.object({
  name: z.string().min(1, "Name is required"),
  roll: z.number().int().positive("Roll number must be a positive integer"),
  semester: z.number().int().min(1, "Semester must be at least 1").max(8, "Semester must be at most 8"),
  department: z.enum(["CST", "MT", "ET", "TT", "CT"]), 
});

export const StudentValidation = {
  createStudentValidations,
};
