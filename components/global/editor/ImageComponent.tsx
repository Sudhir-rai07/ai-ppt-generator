import UploadImage from '@/app/(protected)/presentation/[presentationId]/_components/editor/UploadImage'
import Image from 'next/image'
import React from 'react'

type Props = {
    src: string
    alt: string
    className?:string
    isPreview: boolean
    contentId: string
    onContentChange: (
        contentId: string,
        newContent: string | string[] | string[][]
    ) => void
    isEditable?: boolean
}

const CustomComponent = ({
    alt,
    contentId,
    onContentChange,
    src,
    className,
    isEditable,
    isPreview,
}:Props) => {

  // WIP : Add openai image
  return (
    <div className={`relative group w-full h-full rounded-lg`}>
      <Image 
       src={"https://images.unsplash.com/photo-1561948955-570b270e7c36?q=80&w=2101&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
       width={isPreview ? 48:800}
       height={isPreview ? 48:800}
       alt={alt}
       className={`object-cover w-full h-full rounded-lg ${className}`}
      />
      {!isPreview && isEditable && 
      <div className='absolute top-0 left-0 hidden group-hover:block'>
        <UploadImage 
          contentId={contentId}
          onContentChange={onContentChange}
        />
        </div>}
    </div>
  )
}

export default CustomComponent
