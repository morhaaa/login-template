"use client";
import { useAuth } from "@/lib/useAuth";
import useAxiosPrivate from "@/lib/useAxiosPrivate";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const Private: React.FC = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  if (!auth) {
    redirect("/");
  }
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const controller = new AbortController();
    const fetchUserInfo = async () => {
      try {
        const response = await axiosPrivate.get("/user", {
          signal: controller.signal,
        });
        setUserInfo(response.data);
      } catch (e) {
        console.log(e);
        redirect("/");
      }
    };
    fetchUserInfo();

    return () => controller.abort();
  }, []);

  return <div>Private Page</div>;
};

export default Private;
