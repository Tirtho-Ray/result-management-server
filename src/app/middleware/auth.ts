import appError from "../error/appError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";
import config from "../config";
import { USER_ROLE, USER_STATUS } from "../modules/user/user.constant";

const auth = (...requiredRoles: (keyof typeof USER_ROLE)[]) => {
  return catchAsync(async (req, res, next) => {
    const accessToken = req.headers.authorization;

    if (!accessToken || !accessToken.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'You have no access to this route',
      });
    }

    const token = accessToken.split(' ')[1];
    // console.log('Token:', token);

    const verifiedToken = jwt.verify(
      token,
      config.JWT_ACCESS_SECRET as string
    ) as JwtPayload;

    const { role, email} = verifiedToken;
    // console.log(verifiedToken);

    const user = await User.findOne({ email });

    if (!user) {
      throw new appError(401, "User not found !");
    }
    // const isDeleted = user?.isDeleted;

    // if (isDeleted) {
    //   throw new appError(httpStatus.FORBIDDEN, 'This user is deleted !');
    // }

    if (user.status === USER_STATUS.BLOCKED) {
      throw new appError(401, "User is blocked !");
    }

    if (!requiredRoles.includes(role)) {
      throw new appError(401, "You are not authorized to access this route !");
    }
    req.user  = verifiedToken;
    req.user  = user;
    // console.log(req.user);
    next();
  });
};

export default auth;
