import { model, Schema } from "mongoose";
import { TStudent } from "./student.interface";


const studentSchema = new Schema<TStudent>({
  name: {
    type: String,
    required: true,
  },
  roll:{
    type: String,
    required: true,
    unique: true,
  },
  session:{
    type: String,
    required: true
  },
  registration:{
    type: String,
  },
  email:{
    type: String,
    lowercase: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  phone:{
    type:String,
  },
  dateOfBirth:{
    type:Date,
  },
  address:{
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
}, {
  timestamps: true, 
});
export const Student = model<TStudent>("Students", studentSchema);
