import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const checkAuthorization = (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

      req.userId = decodedToken._id;
      next();
    } catch (error) {
      console.log(error);
      res.status(300).json({ message: "Ошибка доступа" });
    }
  } else {
    return res.status(403).json({
      message: "Нет доступа",
    });
  }
};
