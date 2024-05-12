export const toastContent = (time = 3000) => {
  const darkMode = localStorage.getItem("dark-mode-enabled");
  return {
    position: "top-center",
    autoClose: time,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: darkMode ? "dark" : "light",
  };
};
