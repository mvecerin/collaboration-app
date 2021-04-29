import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import {
  IResponse,
  ITokenResponse,
  IUser,
  IUserState,
} from "../../utils/interfaces";

const initialState: IUserState = {
  isAuth: null,
  isLoading: false,
  user: null,
  success: null,
};

export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { getState }) => {
    const data = await api.get<IResponse>("/api/users/me");
    return { user: data.data };
  }
);
export const signIn = createAsyncThunk("user/signIn", async (user: IUser) => {
  const data = await api.post<ITokenResponse>("/api/auth/signin", user);
  if (data.token) localStorage.setItem("token", data.token);
  return { user: data.data };
});
export const signUp = createAsyncThunk("user/signUp", async (user: IUser) => {
  await api.post<IResponse>("/api/auth/signup", user);
  return { success: true };
});

export const signOut = () => {
  localStorage.removeItem("token");
  return (dispatch: Function) => {
    dispatch(authFailed());
  };
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authFailed: (state) => {
      state.isAuth = false;
      state.user = null;
    },
    clearAuthSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign in
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.isAuth = true;
        state.user = payload.user;
        state.success = `Authenticated as ${payload.user.name}`;
      })
      // Sign up
      .addCase(signUp.fulfilled, (state) => {
        state.success = "Signed up successfully! Please sign in.";
      })
      // Load user
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUser.fulfilled, (state, { payload }) => {
        state.isAuth = true;
        state.user = payload.user;
        state.isLoading = false;
      })
      .addCase(loadUser.rejected, (state) => {
        state.isAuth = false;
        state.user = null;
        state.isLoading = false;
      });
  },
});

export const { clearAuthSuccess, authFailed } = userSlice.actions;

export default userSlice.reducer;
