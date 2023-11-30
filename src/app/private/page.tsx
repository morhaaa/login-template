"use client";
import { isAuthenticated } from "@/lib/auth";
import useAxiosPrivate from "@/lib/axiosPrivate";
import { redirect } from "next/navigation";

const Private: React.FC = () => {
  if (!isAuthenticated) {
    redirect("/");
  }

  return <div>Private Page</div>;
};

export default Private;
