import { FC } from "react";
import { PostType } from "../../types/PostType";
import deleteCart from "../../img/delete.png";
import pencil from "../../img/pencil.png";

import styles from "./Post.module.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducers/user";

export const Post: FC<PostType> = (post) => {
  const user = useSelector(selectUser);

  return (
    <div className={styles.post}>
      <h3>{post.user.name}</h3>
      <p>{post.text}</p>
      <p>{post.creationDate}</p>
      {user?._id === post.user._id && (
        <div className={styles.post_changes}>
          <img src={pencil} alt="pencil" width={15} height={15} />
          <img src={deleteCart} alt="cart" width={25} height={20} />
        </div>
      )}
    </div>
  );
};
