import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar"
import { FaCalendar, FaTrophy } from "react-icons/fa6"
import { FaVoteYea } from "react-icons/fa"
import { BiSolidCategoryAlt } from "react-icons/bi"
import { MdDashboard } from "react-icons/md";
import { Link, NavLink } from "react-router-dom"

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="bg-white border-r border-gray-200">
      
      {/* Header */}
      <SidebarHeader className="flex items-center justify-center p-4">
        <Link to='/'><img src="/icon.png" alt="Logo" className="w-20" /></Link>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarGroupLabel>Inicio</SidebarGroupLabel>
            <SidebarMenu className='flex items-center'>
              <SidebarMenuButton size="lg" className="[&>svg]:size-6 group-data-[collapsible=icon]:[&>svg]:ml-1" asChild>
                <NavLink to='/admin' className=''>
                  <MdDashboard className="h-10 w-10"/>
                  Dashboard
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroupLabel>Gestionar</SidebarGroupLabel>
            <SidebarMenu className='flex items-center'>
              <SidebarMenuButton size="lg" className="[&>svg]:size-6 group-data-[collapsible=icon]:[&>svg]:ml-1" asChild>
                <NavLink to='admin/ediciones' className=''>
                  <FaCalendar className="h-10 w-10"/>
                  Ediciones
                </NavLink>
              </SidebarMenuButton>
              <SidebarMenuButton size="lg" className="[&>svg]:size-6 group-data-[collapsible=icon]:[&>svg]:ml-1" asChild>
                <NavLink to='admin/categorias'>
                  <BiSolidCategoryAlt className="h-10 w-10"/>
                  Categorias
                </NavLink>
              </SidebarMenuButton>
              <SidebarMenuButton size="lg" className="[&>svg]:size-6 group-data-[collapsible=icon]:[&>svg]:ml-1" asChild>
                <NavLink to='admin/nominados'>
                  <FaTrophy className="h-10 w-10"/>
                  Nominados
                </NavLink>
              </SidebarMenuButton>
              <SidebarMenuButton size="lg" className="[&>svg]:size-6 group-data-[collapsible=icon]:[&>svg]:ml-1" asChild>
                <NavLink to='admin/votos'>
                  <FaVoteYea className="h-10 w-10"/>
                  Votos
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4 text-gray-400 text-sm text-center">
        &copy; 2026 Fenta Awards
      </SidebarFooter>
    </Sidebar>
  )
}