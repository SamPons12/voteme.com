import { createContext, useContext, useEffect, useState } from "react"
import { loginUser, registerUser } from "../api/auth.service";

const AuthContext = createContext

export default function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setUser(JSON.parse(storedToken));
    }
  }, [])

  const login = async (email, password) => {
    try {
      setLoading(true)
      const data = await loginUser(email, password);

      if (data.token) {
        localStorage.setItem('token', data.token);
        setUser(data.token);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err.getMessage)
    }
  }

  const register = async (email, password) => {
    try {
      setLoading(true);
      const res = await registerUser(email, password);
      setLoading(false);
      return res
    } catch (error) {
      console.log(error)
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  }

  // TODO: Loading animation when loading true

  return (
    <div>
      <AuthContext.Provider value={{user, login, register, logout}}>
        {!cargando && children}
      </AuthContext.Provider>
    </div>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}
