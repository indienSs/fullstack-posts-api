import { body } from "express-validator";

export const postCreateValidation = [
  body("text", "Текст должен содержать не менее 10 и не более 150 символов")
    .isLength({ min: 10, max: 150 })
    .isString(),
  body("imageUrl", "Неверная ссылка на изображение").optional().isString(),
  body("creationDate").isString(),
];
