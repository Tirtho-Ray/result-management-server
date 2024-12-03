import { model, Schema } from "mongoose";
import { TSubject } from "./subject.interface";

const subjectSchema = new Schema<TSubject>({
  name: {
    type: String,
    required: true,
  },
  subCode: {
    type: Number,
    required: true,
    unique: true, // Ensures each subject code is unique
  },
  marks: {
    type: Number,
    required: true,
  },
  credit: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Define and export the Mongoose model
export const Subject = model<TSubject>("Subject", subjectSchema);
