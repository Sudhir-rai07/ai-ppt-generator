'use client'

import { deleteProject, recoverProject } from "@/actions/project"
import { itemVarients, themes } from "@/lib/constants"
import { timeAgo } from "@/lib/utils"
import { useSlideStore } from "@/store/useSlideStore"
import { JsonValue } from "@prisma/client/runtime/library"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import AlertDialogBox from "../alert-dialog-box"
import { Button } from "@/components/ui/button"
import {motion} from 'framer-motion'



type Props = {
    projectId: string
    title: string
    createdAt: Date
    isDeleted?: boolean
    slides: JsonValue,
    themeName?: string
}

const ProjectCard = ({
    projectId,
    title,
    createdAt,
    isDeleted,
    slides,
    themeName
}: Props) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const { setSlides } = useSlideStore()
    const theme = themes.find((theme) => theme.name === themeName) || themes[0]
    const handleNavigation = () => {
        setSlides(JSON.parse(JSON.stringify(slides)))
        router.push(`/presentation/${projectId}`)
    }

    const handleRecover = async () => {
        setLoading(true)
        if (!projectId) { //Check if project id is available
            setLoading(false)
            toast.error("Error!", {
                description: "Project Not found",
                // style:{color:'white',backgroundColor:'red', borderColor:'red'}
                style: { color: 'red' }
            })
            return
        }

        //Server action to recover data
        try {
            const res = await recoverProject(projectId)
            if (res.status !== 200) {
                toast.error("Oopse!", {
                    description: res.error || "Something went wrong",
                    // style:{color:'white',backgroundColor:'red', borderColor:'red'}
                    style: { color: 'red' }
                })
                return
            }

            setOpen(false)
            router.refresh()
            toast.success("Success!", {
                description: "Project recovered successfully",
                style: { color: 'green' }
            })
        } catch (error) {
            console.log("ERROR handle recover project : ", error)
            toast.error("Oopse!", {
                description: "Something went wront. Please contact support.",
                // style:{color:'white',backgroundColor:'red', borderColor:'red'}
                style: { color: 'red' }
            })
        }

    }

    const handleDelete = async () => {
        setLoading(true)
        if (!projectId) { //Check if project id is available
            setLoading(false)
            toast.error("Error!", {
                description: "Project Not found",
                // style:{color:'white',backgroundColor:'red', borderColor:'red'}
                style: { color: 'red' }
            })
            return
        }

        // server action to delete a project
        try {
            const res = await deleteProject(projectId)
            if (res.status !== 200) {
                toast.error("Oopse!", {
                    description: res.error || "Failed to delete project.",
                    // style:{color:'white',backgroundColor:'red', borderColor:'red'}
                    style: { color: 'red' }
                })
                return
            }

            setOpen(false)
            router.refresh()
            toast.success("Success!", {
                description: "Project deleted successfully",
                style: { color: 'green' }
            })
        } catch (error) {
            console.log("ERROR handle delete project : ", error)
            toast.error("Oopse!", {
                description: "Something went wront. Please contact support.",
                // style:{color:'white',backgroundColor:'red', borderColor:'red'}
                style: { color: 'red' }
            })
        }
    }
    return (
        <motion.div
            variants={itemVarients}
            className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors bg-muted/50 ${!isDeleted && 'hover:bg-muted'}`}
        >
            <div className='relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer' onClick={handleNavigation}>

                {/* //WIP: ADD THEME FROM DISCORD OF HIS IN CONSTANTS */}
                {/* <ThumbnailPreview
                    theme={theme}
                // WIP: Add the slide data
                // slide={JSON.parse(JSON.stringify(slides))?.[0]} 
                /> */}
            </div>

            <div className='w-full'>
                <div className='space-y-1'>
                    <h3 className='font-semibold text-base text-primary line-clamp-1'>
                        {title} Fake Title
                    </h3>

                    <div className='flex w-full justify-between items-center gap-2'>
                        <p className='text-sm text-start text-muted-foreground' suppressHydrationWarning>
                            {timeAgo(createdAt)}
                        </p>

                        {isDeleted ? <AlertDialogBox description='This will recover your project and restore your data.' className='bg-green-500 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700'
                            loading={loading}
                            open={open}
                            onClick={handleRecover}
                            handleOpen={() => setOpen(!open)}
                        >
                            <Button size={'sm'} variant={'ghost'}
                                className='bg-background-80 dark:hover:bg-background-90'
                            >Recover</Button>
                        </AlertDialogBox> :
                            (
                                <AlertDialogBox description='This will delete your project and send it to trash.' className='bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700'
                                    loading={loading}
                                    open={open}
                                    onClick={handleDelete}
                                    handleOpen={() => setOpen(!open)}
                                >
                                    <Button size={'sm'} variant={'destructive'}
                                        className='bg-background-80 dark:hover:bg-background-90'
                                        disabled={loading}
                                    >Delete</Button>
                                </AlertDialogBox>
                            )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ProjectCard
