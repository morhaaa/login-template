import axios from "axios";
import { store } from "@/container/store";
import { setCredentials, updateToken } from "@/container/authSlice";

const refreshToken = async (): Promise<string | null> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API}/refresh`,
      {
        withCredentials: true,
      }
    );
    if (response) {
      store.dispatch(updateToken(response.data.accessToken));
      return response.data.accessToken;
    }
  } catch (error) {
    console.error("Error during refresh:", error);
    store.dispatch(setCredentials(null));
    throw new Error("Refresh failed");
  }
  return null;
};

export default refreshToken;
