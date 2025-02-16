export const dynamic = 'force-dunamic' // Force refresh the layout page for authentication every time

import { onAuthenticateUser } from '@/actions/user'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {children: React.ReactNode}

const Layout = async({children}:Props) => {

    // Check user authenication and perform actions
    // If user is not authenticated then redirect the user to sign in page
    const auth = await onAuthenticateUser()
    if(!auth.user){
        redirect("/sign-in")
    }

    
  return (
    <div className='full min-h-screen'>
      {children}
    </div>
  )
}

export default Layout

