import { FC, useState } from "react";
import styles from "./Login.module.scss";
import axios from "../../api/axios";
import { setUser } from "../../redux/reducers/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

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
      const { message, __v, token, ...userData } = data;
      dispatch(setUser(userData));
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
      swal({ text: message, icon: "success" });
      navigate("/");
    } catch (error: any) {
      if (error.response.data) {
        console.log(error.response.data.message);
        swal({ text: error.response.data.message, icon: "error" });
      } else {
        swal({ text: "Не удалось авторизоваться", icon: "error" });
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
