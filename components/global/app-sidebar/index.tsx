"use client"
import { Sidebar, SidebarMenuButton } from '@/components/ui/sidebar'
import { Project, User } from '@prisma/client'
import React from 'react'
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import NavMain from './nav-main'
import { data } from '@/lib/constants'
import RecentOpen from './recent-open'
import NavFooter from './nav-footer'

const AppSidebar = ({
  recentProjects,
  user,
  ...props
}: {
  recentProjects: Project[]
}
  & { user: User }
  & React.ComponentProps<typeof Sidebar>
) => {
  return (
    <Sidebar collapsible='icon' {...props} className='max-w-[300px] bg-background-90'>
      <SidebarHeader className='pt-6 px-2 pb-0'>
        <SidebarMenuButton size={'lg'} className='data-[state=open]:text-sidebar-accent-foreground'>
          <div className='flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground'>
            <Avatar className='h-10 w-10 rounded-full'>
              <AvatarImage src='/ssd.png' alt='ssd-logo' />
              <AvatarFallback className='rounded-lg flex text-3xl font-semibold flex-col' >
                <span>P</span>
              </AvatarFallback>
            </Avatar>
          </div>

          <span className='truncate text-primary text-3xl font-semibold'>
            resentAI
          </span>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className='px-2 mt-10 gap-y-6'>
        <NavMain items={data.navMain} />
        <RecentOpen recentProjects={recentProjects} />
      </SidebarContent>
      <SidebarFooter>
        <NavFooter prismaUser={user}/>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
