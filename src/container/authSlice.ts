import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
interface AuthState {
  data: User | null;
  loading: "idle" | "pending";
  error: string | null;
}

const initialState: AuthState = {
  data: null,
  loading: "idle",
  error: null,
};

interface LoginPayload {
  email: string;
  psw: string;
}

export const login = createAsyncThunk<User | null, LoginPayload>(
  "user/login",
  async ({ email, psw }) => {
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API}/login`,
        JSON.stringify({ email: email, psw: psw }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (result.data) {
        const userInfo: User = {
          name: result.data.name,
          email: result.data.email,
          accessToken: result.data.accessToken,
        };
        return userInfo;
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error: any) {
      toast.error(error.message);
      console.error("Error fetching user info:", error);
      throw new Error("Failed to fetch user info");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials(state: AuthState, action: PayloadAction<User | null>) {
      state.data = action.payload;
    },

    updateToken(state: AuthState, action: PayloadAction<string>) {
      const data = state.data;
      data ? (data.accessToken = action.payload) : null;
    },

    logOut(state: AuthState) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = "idle";
        state.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const { setCredentials, updateToken, logOut } = authSlice.actions;

export default authSlice;
