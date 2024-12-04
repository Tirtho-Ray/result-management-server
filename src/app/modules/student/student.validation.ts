import { z } from "zod";

// Capitalize function for name format
const capitalizeName = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const createStudentValidations = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(40, "Name should not exceed 100 characters")
    .transform((val) => capitalizeName(val)),  // Apply the capitalize function to transform the name
  session: z.string().min(1, "Session is required"),
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
  departmentId: z.string().min(1, "Department ID is required"),
  semesterId: z.string().min(1, "Semester ID is required"),
});

const updateStudentValidations = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(40, "Name should not exceed 100 characters")
    .transform((val) => capitalizeName(val)), // Apply the capitalize function to transform the name
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
