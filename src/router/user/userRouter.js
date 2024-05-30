import express from "express";
import { addNewUser, findUser } from "../../module/user/userModel.js";
import { auth, jwtAuth } from "../../auth/auth.js";
import { getAccessToken, getRefreshToken } from "../../auth/jwt.js";

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
    if (error.message.includes("E11000 duplicate key")) {
      error.message =
        "Another user alreay have this email, change your email and try again";
      error.status = 200;
    }
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email.includes("@") || !password) {
      throw new Error("Invalid login details");
    }
    //find userbyemail
    const user = await findUser(email);

    if (user?._id) {
      //verify the password
      if (user.password === password) {
        return res.json({
          status: "success",
          message: "loggedIn successfully",
          tokens: {
            accessJWT: getAccessToken({ email }),
            refreshJWT: getRefreshToken({ email }),
          },
        });
      }
    } else {
      res.json({
        status: "error",
        message: "Invalid Login details",
      });
    }
  } catch (error) {
    next(error);
  }
});

//return the useer profile
router.get("/", auth, (req, res, next) => {
  try {
    req.userInfo.refreshJWT = undefined;
    req.userInfo.__v = undefined;
    res.json({
      status: "success",
      message: "User Profile",
      user: req.userInfo,
    });
  } catch (error) {
    next(error);
  }
});

// return new accessJWT
router.get("/renew-accesjwt", jwtAuth, async (req, res, next) => {
  try {
    const { email } = req.userInfo;
    const accessJWT = getAccessToken({ email });
    res.json({ accessJWT });
  } catch (error) {
    next(error);
  }
});

export default router;
