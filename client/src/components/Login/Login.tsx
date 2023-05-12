import { FC, useState } from "react";
import axios from "../../api/axios";

import styles from "./Login.module.scss";
import { setUser } from "../../redux/reducers/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Login: FC = () => {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginServer();
  };

  const loginServer = async () => {
    try {
      const { data } = await axios.post("/login", loginForm);
      const { message, __v, ...userData } = data;
      alert(message);
      dispatch(setUser(userData));
      navigate("/");
    } catch (error: any) {
      if (error.response.data) {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      } else {
        alert("Не удалось авторизоваться");
      }
    }
  };

  return (
    <form onSubmit={onSubmitForm} className={styles.login}>
      <input
        type="email"
        placeholder="Введите почту"
        name="email"
        value={loginForm.email}
        onChange={onChangeForm}
      />
      <input
        type="password"
        placeholder="Введите пароль"
        name="password"
        value={loginForm.password}
        onChange={onChangeForm}
      />
      <button>Войти</button>
    </form>
  );
};
