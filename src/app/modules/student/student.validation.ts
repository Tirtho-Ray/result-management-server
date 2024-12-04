import { z } from "zod";

const createStudentValidations = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name should not exceed 100 characters"),
  boardRoll: z.string().min(1, "BoardRoll number is required"),
  session: z.string().min(1, "Session is required"),
  registration: z.string().optional(),
  email: z.string().email("Invalid email format").optional(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format").optional(),
  dateOfBirth: z.date().optional(),
  departmentId: z.string().min(1, "Department ID is required"),
  semesterId: z.string().min(1, "Semester ID is required"),
});
const updateStudentValidations = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name should not exceed 100 characters").optional(),
  boardRoll: z.string().min(1, "BoardRoll number is required").optional(),
  collageRoll: z.string().min(1, "CollageRoll number is required").optional(),
  session: z.string().min(1, "Session is required").optional(),
  registration: z.string().optional(),
  email: z.string().email("Invalid email format").optional(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format").optional(),
  dateOfBirth: z.date().optional(),
  departmentId: z.string().min(1, "Department ID is required").optional(),
  semesterId: z.string().min(1, "Semester ID is required").optional(),
});

export const StudentValidations = {
  createStudentValidations,
  updateStudentValidations
};
