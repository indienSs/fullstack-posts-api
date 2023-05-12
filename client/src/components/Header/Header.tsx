import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../../redux/reducers/user";

export const Header: FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const exitAccount = () => {
    dispatch(setUser(null));
  };

  return (
    <div className={styles.header}>
      <Link to="/">
        <h2>Posts api</h2>
      </Link>
      {user ? (
        <button onClick={exitAccount}>Выйти</button>
      ) : (
        <Link to="/login">
          <button>Войти</button>
        </Link>
      )}
    </div>
  );
};
