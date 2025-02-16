import { onAuthenticateUser } from '@/actions/user'
import AppSidebar from '@/components/global/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { redirect } from 'next/navigation'
import React from 'react'
type Props = {children: React.ReactNode}
const Layout = async ({children}:Props) => {
    // const recentProjects = await getRecentProjects()

     // Check user authenication and perform actions
    // If user is not authenticated then redirect the user to sign in page
    const chekcUser = await onAuthenticateUser()
    if(!chekcUser.user){
        redirect("/sign-in")
    } 
  return (
    <SidebarProvider>
        <AppSidebar />
    </SidebarProvider>
  )
}

export default Layout
