import jwt from "jsonwebtoken";

export const getAccessToken = ({ email }) => {
  const accessToken = jwt.sign({ email }, process.env.JWT_ACCESS, {
    expiresIn: "15h",
  });
  return accessToken;
};
export const getRefreshToken = ({ email }) => {
  const refreshToken = jwt.sign({ email }, process.env.JWT_REFRESH, {
    expiresIn: "30d",
  });
  return refreshToken;
};
