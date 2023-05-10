import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { registerValidation } from "./validations/registerValidation.js";
import { loginValidation } from "./validations/loginValidation.js";
import { checkAuthorization } from "./middlewares/checkAuth.js";
import { register } from "./controllers/register.js";
import { login } from "./controllers/login.js";
import { getMe } from "./controllers/me.js";
import { getPosts, createPost, deletePost } from "./controllers/posts.js";
import { postCreateValidation } from "./validations/postValidation.js";

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

app.get("/me", checkAuthorization, getMe);
app.post("/login", loginValidation, login);
app.post("/register", registerValidation, register);

app.get("/posts", getPosts);
app.post("/posts", checkAuthorization, postCreateValidation, createPost);
app.delete("/posts/:id", checkAuthorization, deletePost);
// app.patch("/posts", checkAuthorization, changePost);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
