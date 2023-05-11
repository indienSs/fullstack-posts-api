import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

export const Header: FC = () => {
  return (
    <div className={styles.header}>
      <Link to="/">
        <h2>Posts api</h2>
      </Link>
      <Link to="/login">
        <button>Войти</button>
      </Link>
    </div>
  );
};
