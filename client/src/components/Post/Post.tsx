import { FC } from "react";
import styles from "./Post.module.scss";
import { PostType } from "../../types/PostType";
import deleteCart from "../../img/delete.png";
import pencil from "../../img/pencil.png";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducers/user";
import axios from "../../api/axios";
import swal from "sweetalert";

export const Post: FC<PostType> = (post) => {
  const user = useSelector(selectUser);

  const deletePost = () => {
    try {
      swal("Вы действительно хотите удалить пост?", {
        buttons: ["Оставить", "Удалить"],
      }).then((willDelete) => {
        if (willDelete) {
          axios.delete(`/posts/${post._id}`);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const changePost = () => {
    try {
      axios.patch(`/posts/${post._id}`, {
        text: "Новый текст",
        creationDate: "20-05-2023",
      });
    } catch (error) {}
  };

  return (
    <div className={styles.post}>
      <h3>{post.user.name}</h3>
      <p>{post.text}</p>
      <p className={styles.post_date}>{post.creationDate}</p>
      {user?._id === post.user._id && (
        <div className={styles.post_changes}>
          <img
            src={pencil}
            alt="pencil"
            width={15}
            height={15}
            onClick={() => changePost()}
          />
          <img
            src={deleteCart}
            alt="cart"
            width={25}
            height={20}
            onClick={() => deletePost()}
          />
        </div>
      )}
    </div>
  );
};
