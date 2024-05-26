import express from "express";
import { addNewUser } from "../../module/user/userModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const obj = req.body;
    const user = await addNewUser(obj);
    user?._id
      ? res.status(200).json({
          status: "success",
          message: "user was successfully added",
        })
      : res.status(401).json({
          status: "error",
          message: "error couldnot be added",
        });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
