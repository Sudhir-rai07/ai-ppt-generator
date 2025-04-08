'use client'
import { getProjectBuId } from '@/actions/project'
import { themes } from '@/lib/constants'
import { useSlideStore } from '@/store/useSlideStore'
import { Loader2 } from 'lucide-react'
import { useTheme } from 'next-themes'
import { redirect, useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Navbar from './_components/Navbar/Navbar'
import LayoutPreview from './_components/editor-sidebar/leftsidebar/LayoutPreview'
import Editor from './_components/editor/Editor'
import EditorSidebar from './_components/rightSidebar'

const page = () => {

  //WIP : Create the presentation view

  const params = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const { setTheme } = useTheme()
  const { setSlides, setProject, currentTheme, setCurrentThme } = useSlideStore()

  useEffect(() => {
    ; (async () => {
      try {
        const res = await getProjectBuId(params.presentationId as string)
        if (res.status !== 200 || !res.data) {
          toast.error("Error", {
            description: "Failed to fetch project"
          })
          redirect('/dashboard')
        }


        const findTheme = themes.find((theme) => theme.name === res.data.themeName)
        setCurrentThme(findTheme || themes[0])
        setTheme(findTheme?.type === 'dark' ? 'dark' : 'light')
        setProject(res.data)
      } catch (error) {
        console.log("Error in fetch project", error)
        toast.error("Error", {
          description: "An unexpected error occured"
        })
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='min-h-screen flex flex-col'>
        <Navbar presentationId={params.presentationId as string} />

        <div className='flax-1 flex overflow-hidden pt-16'
        style={{
          color: currentTheme.accentColor,
          fontFamily: currentTheme.fontFamily,
          backgroundColor: currentTheme.backgroundColor
        }}
        >
          <LayoutPreview />

          <div className='flex-1 ml-64 pr-16 '>
            <Editor
              isEditable={true}
              />
          </div>

          <EditorSidebar />
        </div>
      </div>
    </DndProvider>
  )
}

export default page
