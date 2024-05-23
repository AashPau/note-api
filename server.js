import express from "express";
import cors from "cors";
import notesRouter from "./src/router/notes/notesRouter.js";
import { connectDB } from "./src/config/dbConnect.js";

const port = process.env.PORT || 8000;

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/notes", notesRouter);

app.listen(port, (error) => {
  error
    ? console.log(error)
    : console.log("listening at http://localhost:8000");
});
