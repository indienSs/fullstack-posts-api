import { FC, useState } from "react";
import styles from "./LoginPage.module.scss";
import { Login } from "../../components/Login/Login";
import { Register } from "../../components/Register/Register";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducers/user";
import { Navigate } from "react-router-dom";

export const LoginPage: FC = () => {
  const [isRegistered, setIsRegistered] = useState(true);

  const user = useSelector(selectUser);

  if (user) {
    return <Navigate to="/" />;
  }

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
