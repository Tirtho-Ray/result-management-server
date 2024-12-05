// result.model.ts
import { model, Schema } from "mongoose";
import { TResult } from "./result.intreface";


const resultSchema = new Schema<TResult>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Students", // Reference to Student model
      required: true,
    },
    semesterId: {
      type: Schema.Types.ObjectId,
      ref: "Semester", // Reference to Semester model
      required: true,
    },
    results: [
      {
        subjectId: {
          type: Schema.Types.ObjectId,
          ref: "Subject", // Reference to Subject model
          required: true,
        },
        obtainedMarks: {
          type: Number,
          required: true,
        },
      },
    ],
    GPA: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Export the Mongoose model
export const Result = model<TResult>("Result", resultSchema);
