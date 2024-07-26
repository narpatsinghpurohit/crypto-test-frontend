import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types/global";
import { useLocalStorage } from "./useLocalStorage";
interface AuthContextValue {
  user: User | null;
  token:string|null;
  login: (data: User, token:string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [token, setToken] = useLocalStorage("token", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data:User, token:string) => {
    setUser(data);
    setToken(token);
    navigate("/dashboard", { replace: true });
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    setToken(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};