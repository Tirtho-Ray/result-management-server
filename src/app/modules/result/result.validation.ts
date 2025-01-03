import { z } from "zod";

const createResultSchema = z.object({
  studentId: z.string().nonempty("Student ID is required."),
  semesterId: z.string().nonempty("Semester ID is required."),
  results: z
    .array(
      z.object({
        subjectId: z.string().nonempty("Subject ID is required."),
        obtainedMarks: z
          .number()
          .min(0, "Marks cannot be less than 0.")
          .max(100, "Marks cannot be greater than 100."),
      })
    )
    .nonempty("Results array cannot be empty."),
});

export const ResultValidation ={
    createResultSchema
}