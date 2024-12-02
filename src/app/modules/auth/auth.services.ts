    /* eslint-disable @typescript-eslint/no-explicit-any */
    import config from "../../config";
    import jwt from 'jsonwebtoken';
    import { User } from "../user/user.model";
    import { USER_ROLE } from "../user/user.constant";
    import { TLoginUser } from "./auth.interface";
    import httpStatus from 'http-status';
    import { TUser } from "../user/user.interface";
    import { createToken, generateTokens } from "../Token/Token";
    // import { isPasswordMatched } from "./auth.utils";
    import appError from "../../error/appError";

    // User registration
    const register = async (payload: TUser): Promise<any> => {
        // Check if user already exists
        // console.log(payload)
        const existingUser = await User.findOne({ email: payload.email });
        if (existingUser) {
            throw new appError(httpStatus.BAD_REQUEST, 'User already exists');
        }

        if (!payload.password) {
            throw new appError(httpStatus.BAD_REQUEST, 'Password is required ');
        }
        // Assign default role
        payload.role = USER_ROLE.USER;

    const newUser = await User.create({
        ...payload,
    });

        const tokens = generateTokens(newUser); // Generate tokens for the new user

        return {
            user: newUser,
            ...tokens
        };
    };

    // User login
    const login = async (payload: TLoginUser) => {
        // Find user by email and include the password field
        const user = await User.findOne({ email: payload.email }).select("+password");

        if (!user) {
            throw new appError(httpStatus.NOT_FOUND, 'User not found');
        }

        if (user.status === "BLOCKED") {
            throw new appError(httpStatus.FORBIDDEN, 'User is blocked');
        }

    // Check if the provided password matches the stored hashed password
        // const passwordMatch = await isPasswordMatched(payload.password.trim(), user.password);
        // if (!passwordMatch) {
        //     throw new appError(httpStatus.UNAUTHORIZED, 'Password does not match');
        // }
        
        // Generate tokens for the authenticated user
        const tokens = generateTokens(user);
        return {
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                status: user.status,
            },
            ...tokens
        };
    };

    // Refresh token functionality
    const refreshToken = async (token: string) => {
        try {
            const decoded = jwt.verify(token, config.JWT_ACCESS_SECRET!);
            const { email } = decoded as { email: string };

            // Find the user by email
            const user = await User.findOne({ email });
            if (!user) {
                throw new appError(httpStatus.NOT_FOUND, 'User not found');
            }

            // Generate a new access token
            const newAccessToken = createToken(
                { email: user.email, role: user.role, id: user._id },
                config.JWT_ACCESS_SECRET!,
                config.JWT_ACCESS_EXPIRES_IN!
            );

            return { accessToken: newAccessToken };
        } catch (error) {
            throw new appError(httpStatus.UNAUTHORIZED, 'Invalid refresh token');
        }
    };


    export const AuthService = {
        register,
        login,
        refreshToken,
    };


