import { isAuthenticated } from "@/lib/auth";
import refreshToken from "@/lib/refreshToken";
import { useEffect, useState } from "react";

const PersistLogin: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const verifyRefreshToken = async () => {
      try {
        await refreshToken();
      } catch (error: any) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    !isAuthenticated ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return <>{isLoading ? <p>Loading ... </p> : null}</>;
};
export default PersistLogin;
