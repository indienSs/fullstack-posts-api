import { FC, useState } from "react";
import axios from "../../api/axios";

import styles from "./Register.module.scss";

export const Register: FC = () => {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    name: "",
    password: "",
    repeatpassword: "",
  });

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: value,
    });
  };

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerServer();
  };

  const registerServer = async () => {
    try {
      const { data } = await axios.post("/register", registerForm);
      alert(data.message);
      console.log(data);
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
    <form onSubmit={onSubmitForm} className={styles.register}>
      <input
        type="email"
        placeholder="Введите почту"
        name="email"
        value={registerForm.email}
        onChange={onChangeForm}
      />
      <input
        type="text"
        placeholder="Введите имя"
        name="name"
        value={registerForm.name}
        onChange={onChangeForm}
      />
      <input
        type="password"
        placeholder="Введите пароль"
        name="password"
        value={registerForm.password}
        onChange={onChangeForm}
      />
      <input
        type="password"
        placeholder="Повторите пароль"
        name="repeatpassword"
        value={registerForm.repeatpassword}
        onChange={onChangeForm}
      />
      <button>Зарегистрироваться</button>
    </form>
  );
};
