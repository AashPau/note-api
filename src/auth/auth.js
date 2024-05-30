import { findToken } from "../module/session/sessionSchema.js";
import { findUser } from "../module/user/userModel.js";
import { verifyAccessToken, verifyRefreshToken } from "./jwt.js";

export const auth = async (req, res, next) => {
  try {
    //receive jwt via auth header
    const { authorization } = req.headers;

    //verify jwt is valid
    const decoded = verifyAccessToken(authorization);
    if (decoded?.email) {
      ////check if the token exists in the db - session table
      const tokenObj = await findToken(authorization);

      if (tokenObj?._id) {
        //extract email from the decoded jwt
        //use the email to get the user from db
        const user = await findUser(decoded.email);
        if (user?._id) {
          user.password = undefined;
          req.userInfo = user;
          return next();
        }
      }
    }
    const error = {
      message: decoded,
      status: 403,
    };
    next(error);

    //if the user for that email exists they are now authorized
  } catch (error) {
    next(error);
  }
};

export const jwtAuth = async (req, res, next) => {
  console.log(req.headers);
  try {
    //     1. receive jwt via authorization header
    const { authorization } = req.headers;
    console.log({ authorization });
    // 2. verify if jwt is valid(no expired, secretkey) by decoding jwt
    const decoded = verifyRefreshToken(authorization);

    if (decoded?.email) {
      // 3. Check if the token exist in the DB, session table

      const user = await findUser(decoded.email);
      if (user?._id && user.refreshJWT === authorization) {
        // 6. If user exist, they are now authorized

        user.password = undefined;
        req.userInfo = user;

        return next();
      }
    }

    const error = {
      message: decoded,
      status: 403,
    };
    next(error);
  } catch (error) {
    next(error);
  }
};
