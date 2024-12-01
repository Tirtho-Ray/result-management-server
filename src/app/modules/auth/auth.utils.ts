import bcryptjs from "bcryptjs";

export const isPasswordMatched = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    return bcryptjs.compare(plainPassword, hashedPassword);
};
