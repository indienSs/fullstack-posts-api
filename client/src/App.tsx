import { FC } from "react";
import { Header } from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import { Posts } from "./pages/Posts/Posts";
import { LoginPage } from "./pages/LoginPage/LoginPage";

import styles from "./App.module.scss"

const App: FC = () => {
  return (
    <div style={{ margin: "0px 120px" }}>
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
