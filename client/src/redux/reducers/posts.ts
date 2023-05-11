import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "../../api/axios";
import { PostType } from "../../types/PostType";
import { Status } from "../../types/Status";

type PostsStore = {
  posts: PostType[];
  status: Status;
};

const initialState: PostsStore = {
  posts: [],
  status: Status.LOADING,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (page?: number) => {
    const { data } = await axios.get<PostType[]>(
      `/posts${page ? "page=" + page : ""}`
    );
    return data;
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = Status.LOADING;
      state.posts = [];
    });
    builder.addCase(
      fetchPosts.fulfilled,
      (state, action: PayloadAction<PostType[]>) => {
        state.status = Status.SUCCESS;
        state.posts = action.payload;
      }
    );
    builder.addCase(fetchPosts.rejected, (state) => {
      state.status = Status.ERROR;
      state.posts = [];
    });
  },
});

export const {} = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostsStatus = (state: RootState) => state.posts.status;

export const postsReducer = postsSlice.reducer;
