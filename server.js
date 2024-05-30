import express from "express";
import cors from "cors";
import notesRouter from "./src/router/notes/notesRouter.js";
import userRouter from "./src/router/user/userRouter.js";
import { connectDB } from "./src/config/dbConnect.js";

const port = process.env.PORT || 8000;

const app = express();
//connectdb
connectDB();
//middlewares
app.use(cors());
app.use(express.json());

//routers
app.use("/notes", notesRouter);
app.use("/users", userRouter);

//server status
app.get("/", (req, res, next) => {
  res.json({ message: "server is healthy" });
});

app.use("*", (req, res, next) => {
  const err = new Error("404 Not Found");
  err.status = 404;
  next(err);
});

//global error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    status: "error",
    message: error.message,
  });
});

app.listen(port, (error) => {
  error
    ? console.log(error)
    : console.log(`listening at http://localhost:${port}`);
});
