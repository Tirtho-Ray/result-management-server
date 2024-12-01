/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import config from '../../config';

export const createToken = (payload: object, secret: string, expiresIn: string) => {
    return jwt.sign(payload, secret, { expiresIn });
};

export const generateTokens = (user: any) => {
    const jwtPayload = { email: user.email, role: user.role, _id: user._id, name: user.name};

    // Check if JWT secrets and expiration times are defined
    if (!config.JWT_ACCESS_SECRET || !config.JWT_REFRESH_SECRET) {
        throw new Error('JWT secrets are not defined in the config');
    }

    if (!config.JWT_ACCESS_EXPIRES_IN || !config.JWT_REFRESH_EXPIRES_IN) {
        throw new Error('JWT expiration times are not defined in the config');
    }

    const accessToken = createToken(jwtPayload, config.JWT_ACCESS_SECRET, config.JWT_ACCESS_EXPIRES_IN);
    const refreshToken = createToken(jwtPayload, config.JWT_REFRESH_SECRET, config.JWT_REFRESH_EXPIRES_IN);
    // console.log( config.JWT_REFRESH_SECRET)

    return { accessToken, refreshToken };
};
