import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"
import { MoonLoader } from "react-spinners";


export default function ProtectRoute({ children, role}) {

  const  { user, loading } = useAuth();

  if (loading) {
    return <MoonLoader />
  }

  if (!user) {
    return <Navigate to='/login' replace />
  }

  if (role) {
    if (user.role !== role) {
      return <Navigate to='/' replace />
    }
  }

  return (
    children
  )
}
