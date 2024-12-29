import { z } from "zod";


const createStudentValidations = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(40, "Name should not exceed 40 characters"),
  session: z.string().min(1, "Session is required"),
  boardRoll:z.string().min(5,"BoardRoll Min 5 characters").max(6, "Board Max 6 characters").optional(),
  registration: z.string().min(10,"Need 10 characters").max(10,"max 10 characters").optional(),
  email: z.string().email().optional(),
  phone: z.string().regex(/^\+?[0-9]\d{1,14}$/).optional(),
  address: z.string().optional(),
  dateOfBirth: z.string().optional(),
  departmentId: z.string().min(1, "Department ID is required"),
  semesterId: z.string().min(1, "Semester ID is required"),
});

const updateStudentValidations = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(40, "Name should not exceed 100 characters"),
  collageRoll: z.string().min(1, "CollageRoll number is required").optional(),
  session: z.string().min(1, "Session is required").optional(),
  registration: z.string().optional(),
  email: z.string().email("Invalid email format").optional(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format").optional(),
  dateOfBirth: z
    .string()
    .optional()
    .refine((date) => {
      // Check if the date is defined and validate the format as dd-mm-yyyy
      if (date) {
        return /^([0-2][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/.test(date);
      }
      return true; // If date is undefined, it's considered valid
    }, "Invalid date format. Use dd-mm-yyyy."),
  departmentId: z.string().min(1, "Department ID is required").optional(),
  semesterId: z.string().min(1, "Semester ID is required").optional(),
});

export const StudentValidations = {
  createStudentValidations,
  updateStudentValidations
};
