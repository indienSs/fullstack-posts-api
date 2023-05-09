import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

import { registerValidation } from "./validations/register.js";
import { UserModel } from "./models/UserModel.js";

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

app.post("/login", (req, res) => {
  const token = jwt.sign(
    {
      email: req.body.email,
      name: req.body.name,
    },
    process.env.SECRET_KEY
  );

  res.json({ token });
});

app.post("/register", registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const message = errors
        .array()
        .map((err) => err.msg)
        .join("; ");
      return res.status(400).json({ message });
    }

    const password = req.body.password;
    const cryptSalt = await bcrypt.genSalt(5);
    const passwordHash = await bcrypt.hash(password, cryptSalt);

    const doc = new UserModel({
      email: req.body.email,
      name: req.body.name,
      passwordHash,
    });

    const user = await doc.save();

    res.json({ message: "Вы успешно зарегистрировались", ...user._doc });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Не удалось зарегистрироваться" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
