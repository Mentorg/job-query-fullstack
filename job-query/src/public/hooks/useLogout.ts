import { useNavigate } from "react-router-dom";
import { useAuth } from "../../shared/context/AuthContext";

export function useLogout() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");

    setUser(null);

    navigate("/login");
  };

  return logout;
}
