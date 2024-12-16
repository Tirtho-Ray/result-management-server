import { z } from "zod";
import { USER_ROLE } from "./user.constant";

// Allow the admin to assign roles if necessary
const createAdminValidations = z.object({
  name: z.string().optional(),
  role: z.nativeEnum(USER_ROLE).optional(),
  email: z.string().email(),
  password: z.string().min(6),  // Password should be at least 6 characters
});

export const UserValidations = {
  createAdminValidations,
};
