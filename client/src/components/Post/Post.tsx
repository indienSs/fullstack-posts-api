import { FC } from "react";
import { PostType } from "../../types/PostType";
import deleteCart from "../../img/delete.png";
import pencil from "../../img/pencil.png";

import styles from "./Post.module.scss";

export const Post: FC<PostType> = (post) => {
  return (
    <div className={styles.post}>
      <h3>{post.user.name}</h3>
      <p>{post.text}</p>
      <p>{post.creationDate}</p>
      <div className={styles.post_changes}>
        <img src={pencil} alt="pencil" width={15} height={15} />
        <img src={deleteCart} alt="cart" width={25} height={20} />
      </div>
    </div>
  );
};
