import { z } from "zod";

const createSubjectValidations = z.object({
  name: z.string().min(1, "Subject name is required"),
  subCode: z.number()
    .refine((value) => value.toString().length === 5, {
      message: "Subject code must be exactly 5 digits",
    }),
  mark: z.number().min(0, "Marks must be a non-negative number"),
  credit: z.number().min(1, "Credit must be at least 1"),
});

export const SubjectValidations = {
  createSubjectValidations,
};
