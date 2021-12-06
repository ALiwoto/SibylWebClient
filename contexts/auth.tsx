import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext<{
  authenticated: boolean;
  token: string | null;
  authenticate: (token: string) => void;
  unauthenticate: () => void;
}>({
  authenticated: false,
  token: null,
  authenticate(_token: string) {},
  unauthenticate() {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  });

  const authenticate = (token: string) => {
    if (token) {
      localStorage.setItem("token", token);
      setToken(token);
    }
  };

  const unauthenticate = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: !!token, token, authenticate, unauthenticate }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
