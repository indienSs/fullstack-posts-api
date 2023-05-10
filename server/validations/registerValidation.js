import { body } from "express-validator";

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body(
    "name",
    "Имя должно содержать не меньше 4 и не более 16 символов"
  ).isLength({ min: 4, max: 16 }),
  body("password", "Пароль должен содержать не менее 6 символов").isLength({
    min: 6,
  }),
];
