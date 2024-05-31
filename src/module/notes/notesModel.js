import notesSchema from "./notesSchema.js";

export const createNewNote = (obj) => {
  return notesSchema(obj).save();
};

export const getAllNotes = () => {
  return notesSchema.find();
};
export const getnotesbyUser = (userId) => {
  return notesSchema.find({ userId });
};

export const getOneNote = (_id) => {
  return notesSchema.findById(_id);
};

export const deleteOneNote = (_id) => {
  return notesSchema.findByIdAndDelete(_id);
};

export const deleteMultiple = () => {
  return notesSchema.deleteMany();
};

export const updatenote = (_id) => {
  return notesSchema.findByIdAndUpdate(_id, update);
};
