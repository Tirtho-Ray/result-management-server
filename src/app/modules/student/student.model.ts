import mongoose, { model, Schema } from "mongoose";
import { TStudent } from "./student.interface";

// Regular expression to match 'IM-000001', 'IM-12345', etc.
const collageRollRegex = /^IMP-(\d{6})$/;

const studentSchema = new Schema<TStudent>(
  {
    name: {
      type: String,
      required: true,
      uppercase: true,
    },
    collageRoll: {
      type: String,
    },
    session: {
      type: String,
      required: true,
    },
    boardRoll: {
      type: String,
      unique: true,
    },
    registration: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      unique: true,
    },
    dateOfBirth: {
      type: Date,
    },
    address: {
      type: String,
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    semesterId: {
      type: Schema.Types.ObjectId,
      ref: "Semester",
      required: true,
    },
    result: [
      {
        type: Schema.Types.ObjectId,
        ref: "Result",
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to generate auto-incremented collageRoll
studentSchema.pre("save", async function (next) {
  if (!this.collageRoll) {
    // Use a transaction for concurrency safety (optional, depends on MongoDB version)
    const session = await this.model("Students").startSession();
    session.startTransaction();

    try {
      // Cast `this.constructor` to mongoose.Model<TStudent> for TypeScript to recognize its methods
      const StudentModel = this.constructor as mongoose.Model<TStudent>;

      // Find the last student by collageRoll and extract the number
      const lastStudent = await StudentModel.findOne()
        .sort({ collageRoll: -1 }) // Sort in descending order to find the last roll
        .limit(1)
        .session(session); // Use the same session for transaction safety

      let newRollNumber = 1;

      if (lastStudent) {
        // Extract numeric part and increment it
        const match = lastStudent.collageRoll.match(collageRollRegex);
        if (match) {
          const lastRoll = parseInt(match[1]);
          newRollNumber = lastRoll + 1;
        }
      }

      // Set the new collageRoll value
      this.collageRoll = `IMP-${newRollNumber.toString().padStart(6, "0")}`;

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      next();
    } catch (error) {
      // Rollback the transaction if any error occurs
      await session.abortTransaction();
      session.endSession();
      next(error);
    }
  } else {
    next();
  }
});

export const Student = model<TStudent>("Students", studentSchema);
