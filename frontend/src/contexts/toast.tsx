import { createContext, useContext, useState } from "react";
import { ToastContextType, TType } from "../@types/toast";

const toastContext = createContext<ToastContextType>({
  msg: "",
  type: "info",
  show: false,
  showToast: () => {},
  hideToast: () => {},
});

const ToastContextProvider = ({ children }: { children: JSX.Element }) => {
  const [msg, setMsg] = useState<string>("");
  const [type, setType] = useState<TType>("info");
  const [show, setShow] = useState<boolean>(false);

  function showToast({ msg, type }: { msg: string; type?: TType }) {
    setShow(true);
    setMsg(msg);
    setType(type || "info");
  }

  function hideToast() {
    setShow(false);
  }

  return (
    <toastContext.Provider value={{ msg, type, show, showToast, hideToast }}>
      {children}
    </toastContext.Provider>
  );
};

const useToastContext = () => useContext(toastContext);

export { useToastContext, ToastContextProvider };
