import axios from "./axios";
import { useAuth } from "./useAuth";

const useRefreshToken = async (): Promise<string | null> => {
  const { auth, setAuth } = useAuth();

  if (auth) {
    try {
      const response = await axios.get("/refresh", { withCredentials: true });
      setAuth((prev) => ({
        ...(prev as User),
        accessToken: response.data.accessToken as string,
      }));
      return response.data.accessToken;
    } catch (error) {
      console.error("Error during refresh:", error);
      setAuth(undefined);
      throw new Error("Refresh failed"); // Puoi personalizzare il messaggio di errore
    }
  }

  return null;
};

export default useRefreshToken;
