import { FC, useEffect } from "react";
import styles from "./App.module.scss";
import { Header } from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import { Posts } from "./pages/Posts/Posts";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/reducers/user";

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const date = Number(localStorage.getItem("date"));
    if (userData) {
      if (Date.now() - date < 86400000) {
        dispatch(setUser(JSON.parse(userData)));
      } else {
        localStorage.clear();
      }
    }
  }, []);

  return (
    <div className={styles.app}>
      <Header />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Posts />} />
      </Routes>
    </div>
  );
};

export default App;
