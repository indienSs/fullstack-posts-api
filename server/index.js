import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
  errorsValidation,
} from "./validations/index.js";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  register,
  login,
  getMe,
} from "./controllers/index.js";
import { checkAuthorization } from "./middlewares/checkAuth.js";

dotenv.config();

const DB_LINK = process.env.DB_LINK;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(DB_LINK)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("DB error", err);
  });

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },

  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use("/uploads", express.static("uploads"));

app.get("/me", checkAuthorization, getMe);
app.post("/login", loginValidation, errorsValidation, login);
app.post("/register", registerValidation, errorsValidation, register);

app.get("/posts", getPosts);
app.post(
  "/posts",
  checkAuthorization,
  postCreateValidation,
  errorsValidation,
  createPost
);
app.patch("/posts/:id", checkAuthorization, errorsValidation, updatePost);
app.delete("/posts/:id", checkAuthorization, deletePost);

app.post("/upload", checkAuthorization, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
