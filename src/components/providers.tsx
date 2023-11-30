"use client";
import { store } from "@/container/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

interface Props {
  children: ReactNode;
}
const Providers: React.FC<Props> = ({ children }) => {
  return (
    <Provider store={store}>
      <Toaster />
      {children}
    </Provider>
  );
};

export default Providers;
