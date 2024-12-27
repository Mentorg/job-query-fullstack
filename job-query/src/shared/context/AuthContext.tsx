import { createContext, useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { User } from "../types/user";
import { useNavigate } from "react-router-dom";
import { login as apiLogin, logout as apiLogout } from "../services/apiAuth";

export type AuthContextType = {
  user: User | null;
  setUser: (userData: User | null) => void;
  login: (credentials: { email: string; password: string }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await apiLogin(credentials);
      setUser(response.user);
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("userId", response.user.id);
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data);
      }
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
      setUser(null);
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      navigate("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data);
      }
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("authToken");

      if (token) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/v1/user`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          setUser(response.data);
        } catch (error) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userId");
          setUser(null);
          navigate("/login");
        }
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
