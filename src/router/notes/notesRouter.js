import express from "express";
import {
  createNewNote,
  deleteOneNote,
  getAllNotes,
  getOneNote,
} from "../../module/notes/notesModel.js";

const router = express.Router();

//save a note
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const result = await createNewNote(req.body);

    result?._id
      ? res.status(200).json({
          status: "success",
          message: "Post has been created",
          data: result,
        })
      : res.status(200).json({
          status: "error",
          message: "Post couldnot be created",
        });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

//get all notes
router.get("/", async (req, res) => {
  try {
    const result = await getAllNotes();

    result
      ? res.status(200).json({
          status: "success",
          message: "notes found",
          data: result,
        })
      : res.status(200).json({
          status: "error",
          message: "notes couldnot be found",
        });
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

//get one note
router.get("/note", async (req, res) => {
  const _id = req.headers.authorization; // Extract ID from request parameters
  try {
    console.log({ _id });
    const result = await getOneNote(_id);
    if (result) {
      res.status(200).json({
        status: "success",
        message: "Note found",
        data: result,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Note not found",
      });
    }
  } catch (error) {
    console.error("Error fetching note: Server Error");
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});
//delete one note
router.delete("/", async (req, res) => {
  const _id = req.headers.authorization;
  try {
    const result = await deleteOneNote(_id);
    console.log(result);
    if (result) {
      res.status(200).json({
        status: "success",
        message: "Note deleted",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Note not deleted",
      });
    }
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
