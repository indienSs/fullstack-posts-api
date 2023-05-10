import mongoose from "mongoose";

//Модель для создания пользователей в БД
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

export const UserModel = mongoose.model("User", UserSchema);
