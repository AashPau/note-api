import express from "express";
import { addNewUser, findUser } from "../../module/user/userModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const obj = req.body;
    const user = await addNewUser(obj);
    if (user?._id) {
      res.status(200).json({
        status: "success",
        message: "user was successfully added",
      });
    } else {
      res.status(401).json({
        status: "error",
        message: "error couldnot be added",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUser(email);
    if (user?._id) {
      if (user.password === password) {
        res.status(200).json({
          status: "success",
          message: "loggedIn successfully",
        });
      }
    }
  } catch (error) {}
});
export default router;
