import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axios";

interface AuthState {
  user: User | null;
  loading: "idle" | "pending";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: "idle",
  error: null,
};

export const fetchUserInfo = createAsyncThunk(
  "user/fecthUserinfo",
  async ({ email, psw }: { email: string; psw: string }) => {
    try {
      const result = await axios.post(
        "/login",
        JSON.stringify({ mail: email, password: psw }),
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
    } catch (error) {
      console.error("Error fetching user info:", error);
      throw new Error("Failed to fetch user info");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials(state: AuthState, action: PayloadAction<User>) {
      state.user = action.payload;
    },

    logOut(state: AuthState) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = "idle";
        state.user = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice;
