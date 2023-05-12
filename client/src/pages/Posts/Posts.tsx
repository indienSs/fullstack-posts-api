import { FC } from "react";
import styles from "./Posts.module.scss";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import {
  fetchPosts,
  selectPosts,
  selectPostsStatus,
} from "../../redux/reducers/posts";
import { useEffect } from "react";
import { Post } from "../../components/Post/Post";

export const Posts: FC = () => {
  const appDispatch = useAppDispatch();

  const posts = useSelector(selectPosts);
  const status = useSelector(selectPostsStatus);

  useEffect(() => {
    appDispatch(fetchPosts());
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className={styles.posts}>
        {status === "success" ? (
          posts.map((post) => <Post key={post._id} {...post} />)
        ) : (
          <p>...Loading</p>
        )}
      </div>
    </div>
  );
};
