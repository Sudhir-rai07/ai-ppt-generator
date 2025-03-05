"use client"
import { Button } from '@/components/ui/button'
import { User } from '@prisma/client'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
    user: User
}
const NewProjectButton = ({user}: Props) => {

  // WIP: handle click needs completion
    const router = useRouter()
  return (
    <Button
      size={'lg'}  
      className='rounded-lg font-semibold'
      disabled={!user.subscription}
      onClick={()=>{router.push("/create-page")}}
    >
        <Plus />
        <span className=' hidden lg:inline'>New Project</span>
    </Button>
  )
}

export default NewProjectButton
