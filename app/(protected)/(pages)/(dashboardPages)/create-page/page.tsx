import React, { Suspense } from 'react'
import CreatePageSkeleton from './_components/CreatePage/create-page-skeleton'
import RenderPage from './_components/render-page'
import { onAuthenticateUser } from '@/actions/user'
import { redirect } from 'next/navigation'

const page = async () => {

  const checkUser = await onAuthenticateUser()
  if(!checkUser.user){
    redirect("/sign-in")
  }

  if(!checkUser.user.subscription){
    redirect("/dashboard")
  }

  return (
    <main className='w-full h-full pt-6'>
      <Suspense fallback={<CreatePageSkeleton />}>
      <RenderPage />
      </Suspense>
    </main>
  )
}

export default page
