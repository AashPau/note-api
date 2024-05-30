import UserSchema from "./userSchema.js";

export const addNewUser = (obj) => {
  return UserSchema(obj).save();
};

export const findUser = (email) => {
  return UserSchema.findOne({ email });
};

export const updateUser = async (filter, obj) => {
  return await UserSchema.findOneAndUpdate(filter, obj);
};
