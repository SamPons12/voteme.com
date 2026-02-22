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

  return (
    children
  )
}
