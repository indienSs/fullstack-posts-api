import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { postsReducer } from "./reducers/posts";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
