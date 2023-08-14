import { useAuth } from "components/context/Auth-Context";
import React, { useEffect } from "react";

const GlobalDarkMode = ({ children }) => {
  const { darkMode } = useAuth();
  useEffect(() => {
    const element = document.querySelector("html");
    console.log("element", element);
    if (darkMode) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }, [darkMode]);
  console.log("darkMode", darkMode);
  return <div>{children}</div>;
};

export default GlobalDarkMode;
