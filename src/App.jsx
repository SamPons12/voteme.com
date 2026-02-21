import { Route, Routes } from "react-router-dom"
import AdminLayout from "./layouts/AdminLayout"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import Login from "./pages/auth/Login"

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />}/>
        </Route>

       
      </Routes>
    </>
  )
}
