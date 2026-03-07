import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../api/auth.service";
import { jwtDecode } from "jwt-decode";
import { isTokenExpired } from "../helpers/userHelper";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      if (isTokenExpired(storedToken)) {
        localStorage.removeItem("token");
        navigate('/login', {replace: true})
      } else {
        const decode = jwtDecode(storedToken);
        setUser(decode);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const data = await loginUser(email, password);
      if (data.token) {
        localStorage.setItem("token", data.token);
        const decode = jwtDecode(data.token);
        setUser(decode);
      }
      return data.token;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password) => {
    try {
      setLoading(true);
      const res = await registerUser(email, password);
      return res;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // TODO: Loading animation when loading true

  return (
    <div>
      <AuthContext.Provider value={{ user, login, register, logout, loading }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
