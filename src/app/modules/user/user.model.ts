import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import { USER_ROLE, USER_STATUS } from "./user.constant";
import bcryptjs from "bcryptjs";  // bcryptjs is needed for password hashing
import config from "../../config"; // Assuming config contains bcrypt_salt_round

// Define the user schema
const userSchema = new Schema<TUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    enum: Object.values(USER_ROLE),
    default: USER_ROLE.USER,  // Default role is USER
  },
  password: {
    type: String,
    required: true,
    select: false,  // Don't include password in queries by default
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(USER_STATUS),
    default: USER_STATUS.ACTIVE,  // Default status is ACTIVE
  },
});

// Password hashing middleware: This will hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {  // Only hash if password has been modified
    this.password = await bcryptjs.hash(this.password, Number(config.bcrypt_salt_round));
  }
  next();
});

// Remove the password field from the document after saving to ensure it doesn't get returned in responses
userSchema.post("save", function (doc, next) {
  doc.password = "";  // Remove the password field in response
  next();
});

export const User = model<TUser>("User", userSchema);
