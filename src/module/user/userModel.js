import userSchema from "./userSchema.js";

export const addNewUser = (obj) => {
  return userSchema(obj).save();
};

export const findUser = (email) => {
  return userSchema.findOne({ email });
};
