import { FC, useState } from "react";
import { Login } from "../../components/Login/Login";
import { Register } from "../../components/Register/Register";

import styles from "./LoginPage.module.scss";

export const LoginPage: FC = () => {
  const [isRegistered, setIsRegistered] = useState(true);
  return (
    <div className={styles.login_page}>
      <div style={{ display: "flex", gap: "10px" }}>
        <p onClick={() => setIsRegistered(true)}>Войти</p>
        <p onClick={() => setIsRegistered(false)}>Зарегистрироваться</p>
      </div>
      {isRegistered ? <Login /> : <Register />}
    </div>
  );
};
