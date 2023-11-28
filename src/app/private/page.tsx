"use client";
import { useAuth } from "@/lib/useAuth";
import { redirect } from "next/navigation";

const Private: React.FC = () => {
  const { auth } = useAuth();

  if (!auth) {
    redirect("/");
  }

  return <div>Private Page</div>;
};

export default Private;
