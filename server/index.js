import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

import { registerValidation } from "./validations/register.js";
import { UserModel } from "./models/UserModel.js";
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

app.get("/me", checkAuthorization, (req, res) => {
  try {
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "Неверный логин или пароль" });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPassword) {
      return res.status(400).json({
        message: "Неверный логин или пароль",
      });
    }

    const token = jwt.sign(
      {
        _id: user._doc._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ message: "Вы успешно авторизовались", ...userData, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Не удалось авторизоваться" });
  }
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
    const passHash = await bcrypt.hash(password, cryptSalt);

    const doc = new UserModel({
      email: req.body.email,
      name: req.body.name,
      passwordHash: passHash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._doc._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ message: "Вы успешно зарегистрировались", ...userData, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Не удалось зарегистрироваться" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
