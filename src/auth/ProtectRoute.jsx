import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"
import { MoonLoader } from "react-spinners";


export default function ProtectRoute({ children, role}) {

  const  { user, loading } = useAuth();

  if (loading) {
    return <MoonLoader color="#000080" cssOverride={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} />
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
