import JWT from "jsonwebtoken";
import { insertToken } from "../module/session/sessionSchema.js";
import { updateUser } from "../module/user/userModel.js";

export const getAccessToken = (payload) => {
  const accessToken = JWT.sign(payload, process.env.JWT_ACCESS, {
    expiresIn: "15h",
  });
  //insert token to db-session
  const response = insertToken({ token: accessToken });
  if (response?._id) {
    console.log("success");
  } else {
    console.log("error");
  }

  return accessToken;
};

//verify access token
export const verifyAccessToken = (token) => {
  try {
    return JWT.verify(token, process.env.JWT_ACCESS);
  } catch (error) {
    console.log(error);
    return (error.message = "jwt expired" ? "jwt expired" : "invalid token");
  }
};
//createrefresh token
export const getRefreshToken = async ({ email }) => {
  const refreshToken = JWT.sign({ email }, process.env.JWT_REFRESH, {
    expiresIn: "30d",
  });
  //add refreshtoken to user info in the database
  console.log({ email }, { refreshToken });
  const response = await updateUser({ email }, { refreshJWT: refreshToken });

  if (response?.refreshJWT !== "") {
    console.log("success");
  } else {
    console.log("error");
  }

  return refreshToken;
};

//verify refresh token
export const verifyRefreshToken = (token) => {
  try {
    return JWT.verify(token, process.env.JWT_REFRESH);
  } catch (error) {
    return "Invalid token";
  }
};
