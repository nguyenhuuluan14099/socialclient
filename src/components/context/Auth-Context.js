import AuthReducer from "./AuthReducer";

const { createContext, useContext, useReducer, useEffect } = require("react");

const initialState = {
  darkMode: JSON.parse(localStorage.getItem("darkMode")) || true,
  user: JSON.parse(localStorage.getItem("user")) || null,
};
const AuthContext = createContext(initialState);

function AuthProvider({ props, children }) {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
  }, [state.darkMode]);
  return (
    <AuthContext.Provider
      value={{
        darkMode: state.darkMode,
        user: state.user,
        dispatch,
      }}
      {...props}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined") {
    throw new Error("useAuth must be within AuthProvider");
  }
  return context;
}
export { useAuth, AuthProvider };
