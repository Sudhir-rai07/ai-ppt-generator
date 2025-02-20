'use client'

import { Button } from '@/components/ui/button'
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { useSlideStore } from '@/store/useSlideStore'
import { Project } from '@prisma/client'
import { JsonValue } from '@prisma/client/runtime/library'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
type Props = {
    recentProjects: Project[]
}
const RecentOpen = ({ recentProjects }: Props) => {

    const router = useRouter()
    const {setSlides} = useSlideStore()

    const handleClick = async (projectId:string, slides: JsonValue) =>{
        if(!projectId || !slides){
            toast.error("Projcet not found", {
                description: "Please try after some time"
            })
            return
        }

        setSlides(JSON.parse(JSON.stringify(slides)))
        router.push(`/presentation/${projectId}`)
    }



    return (
        recentProjects.length > 0 ?
        <SidebarGroup>
            <SidebarGroupLabel>Recent Open</SidebarGroupLabel>
            <SidebarMenu>
                {recentProjects.length > 0 ?
                    (
                        recentProjects.map((project, idx) => (
                            <>
                                <SidebarMenuItem key={project.id}>
                                    <SidebarMenuButton asChild tooltip={project.title} className='hover:bg-muted'>
                                        <Button variant={'link'} onClick={()=>handleClick(project.id, project.slides)}><span className='text-xs justify-center items-center'>{project.title}</span></Button>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </>
                        ))
                    )
                    :
                    (<>
                    </>)}
            </SidebarMenu>
        </SidebarGroup> : ""
    )
}

export default RecentOpen
