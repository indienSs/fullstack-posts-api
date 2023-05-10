import { PostModel } from "../models/PostModel.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.findOneAndRemove({
      _id: postId,
    });
    res.send({ success: true });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      message: "Не удалось удалить пост",
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const doc = new PostModel({
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      user: req.userId,
      creationDate: req.body.creationDate,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось добавить пост",
    });
  }
};
