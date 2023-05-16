import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../../redux/reducers/user";
import swal from "sweetalert";

export const Header: FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const exitAccount = () => {
    swal("Вы действительно хотите выйти из аккаунта?", {
      buttons: ["Остаться", "Выйти"],
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(setUser(null));
        localStorage.clear();
      }
    });
  };

  return (
    <div className={styles.header}>
      <Link to="/">
        <h2>Posts api</h2>
      </Link>
      {user ? (
        <div className={styles.user_buttons}>
          <button>Создать пост</button>
          <button onClick={exitAccount}>Выйти</button>
        </div>
      ) : (
        <Link to="/login">
          <button>Войти</button>
        </Link>
      )}
    </div>
  );
};
