import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { UserModel } from "../models/UserModel.js";

export const register = async (req, res) => {
  try {
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
};
