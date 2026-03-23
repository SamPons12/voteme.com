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
import ThankYouMessage from "./pages/ThankYouMessage"
import Editions from "./pages/admin/Editions"
import Categories from "./pages/admin/Categories"
import Nominees from "./pages/admin/Nominees"
import Votes from "./pages/admin/Votes"

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
        
        <Route element={<MainLayout />}>
          <Route path="/votar/gracias-por-participar" element={
            <ProtectRoute>
              <ThankYouMessage />
            </ProtectRoute>
          } />
        </Route>
        
        <Route element={<AdminLayout />} >
          <Route path="/admin" element={
            <ProtectRoute role="admin">
              <AdminDashboard />
            </ProtectRoute>
          } />
        </Route>

        <Route element={<AdminLayout />} >
          <Route path="/admin/ediciones" element={
            <ProtectRoute role="admin">
              <Editions />
            </ProtectRoute>
          } />
        </Route>
        <Route element={<AdminLayout />} >
          <Route path="/admin/categorias" element={
            <ProtectRoute role="admin">
              <Categories />
            </ProtectRoute>
          } />
        </Route>

        <Route element={<AdminLayout />} >
          <Route path="/admin/nominados" element={
            <ProtectRoute role="admin">
              <Nominees />
            </ProtectRoute>
          } />
        </Route>

        <Route element={<AdminLayout />} >
          <Route path="/admin/votos" element={
            <ProtectRoute role="admin">
              <Votes />
            </ProtectRoute>
          } />
        </Route>

      </Routes>
    </>
  )
}