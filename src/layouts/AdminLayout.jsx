import { AppSidebar } from "@/components/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { Outlet } from "react-router-dom"

export default function AdminLayout() {

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full  pt-2">
        <SidebarTrigger />
        <section className="px-10">
           <Outlet />
           <Toaster />
        </section>
      </main>
    </SidebarProvider>
  )
}
