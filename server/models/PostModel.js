import mongoose from "mongoose";

//Модель для создания постов в БД
const PostSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  creationDate: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  imageUrl: String,
});

export const PostModel = mongoose.model("Post", PostSchema);
