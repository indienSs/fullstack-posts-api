import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { UserModel } from "../models/UserModel.js";

export const login = async (req, res) => {
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
};
