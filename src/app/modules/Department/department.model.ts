// department.model.ts
import { model, Schema } from "mongoose";
import { TDepartment } from "./department.interface";  // Assuming this is the file where TDepartment is defined
import { Departments } from "./department.constant";


const departmentSchema = new Schema<TDepartment>({
  name: {
    type: String,
    enum: Departments, 
    required: true,
  },
});

// Define and export the Mongoose model
export const Department = model<TDepartment>("Department", departmentSchema);
