import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";

const Private: React.FC = () => {
  const isAuth = isAuthenticated;

  //   if (!isAuth) {
  //     redirect("/");
  //   }

  return <div>Private Page</div>;
};

export default Private;
