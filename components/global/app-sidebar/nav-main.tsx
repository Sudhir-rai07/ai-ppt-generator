"use client"
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavMain = ({ items }: {
    items: {
        title: string
        url: string
        icon: React.FC<React.SVGProps<SVGSVGElement>>
        isActive?: boolean
        item?: {
            title: string
            url: string
        }[]
    }[]
}) => {
    const pathname = usePathname()
    return (
        <SidebarGroup className='p-0'>
            <SidebarMenu>
                {items.map((item)=>(
                    <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title} className={`${pathname.includes(item.url) && 'bg-muted'}`}>
                        <Link href={item.url} className={`text-lg ${pathname.includes(item.url) && 'font-bold'}`}>
                            {<item.icon />}{item.title}</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}

export default NavMain
