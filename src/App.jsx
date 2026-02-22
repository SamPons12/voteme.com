import { Route, Routes } from "react-router-dom"
import AdminLayout from "./layouts/AdminLayout"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import ProtectRoute from "./auth/ProtectRoute"
import UserDashboard from "./pages/UserDashboard"
import AdminDashboard from "./pages/admin/AdminDashboard"
import Vote from "./pages/Vote"

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />}/>
        </Route>

        <Route element={<MainLayout />} >
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<MainLayout />} >
          <Route path="/register" element={<Register />} />
        </Route>
        
        <Route element={<MainLayout />} >
          <Route path="/user" element={
            <ProtectRoute >
              <UserDashboard />
            </ProtectRoute>
          } />
        </Route>

        <Route element={<MainLayout />} >
          <Route path="/votar" element={
            <ProtectRoute >
              <Vote />
            </ProtectRoute>
          } />
        </Route>
        
        <Route path="/admin" element={
          <ProtectRoute role="admin">
            <AdminDashboard />
          </ProtectRoute>
        } />

      </Routes>
    </>
  )
}