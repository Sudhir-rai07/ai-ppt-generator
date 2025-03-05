import { getRecentProjects } from '@/actions/project'
import { onAuthenticateUser } from '@/actions/user'
import AppSidebar from '@/components/global/app-sidebar'
import UpperInfoBar from '@/components/global/upper-info-bar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { redirect } from 'next/navigation'
import React from 'react'
type Props = {children: React.ReactNode}
const Layout = async ({children}:Props) => {
    const recentProjects = await getRecentProjects()

     // Check user authenication and perform actions
    // If user is not authenticated then redirect the user to sign in page
    const chekcUser = await onAuthenticateUser()
    if(!chekcUser.user){
        redirect("/sign-in")
    } 
  return (
    <SidebarProvider>
        <AppSidebar user={chekcUser.user} recentProjects={recentProjects.data || []} />

        <SidebarInset>
          <UpperInfoBar user={chekcUser.user} />
          {children}
        </SidebarInset>
    </SidebarProvider>
  )
}

export default Layout
