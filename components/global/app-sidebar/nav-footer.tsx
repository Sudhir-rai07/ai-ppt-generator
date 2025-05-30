"use client"
import { buySubscription } from '@/actions/lemonSqueezy'
import { Button } from '@/components/ui/button'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { SignedIn, UserButton, useUser } from '@clerk/nextjs'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

const NavFooter = ({ prismaUser }: { prismaUser: User }) => {
    const { isLoaded, isSignedIn, user } = useUser()
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    if (!isLoaded || !isSignedIn) {
        return null
    }

    const handleUpgrading = async () => {
        setLoading(true)
        try {
            const res = await buySubscription(prismaUser.id)
            if(res.status !== 200){
                throw new Error("Failed to upgrade subscription")
            }

            router.push(res.url)
        } catch (error) {
            console.error(error)
            toast.error("Error", {
                description: "Something went wrong. Please try later."
            })
        } finally {
            setLoading(false)
        }
    }
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <div className='flex flex-col gap-y-6 items-start group-data-[collapsible=icon]:hidden'>
                    {
                        !prismaUser.subscription && <div
                            className='flex flex-col items-start p-2 gap-4'>
                            <div className='flex flex-col items-start gap-1'>
                                <p className='text-base font-bold'>
                                    Get <span className='text-orange-300'>Creative AI</span>
                                </p>
                                <span className='text-sm dark:text-secondary'>Unlock all features including AI and more</span>
                            </div>

                            <div className='w-full bg-vivid-gradient p-[1px] rounded-full'>
                                <Button className='w-full border-vivid bg-muted hover:bg-background hover:border-2 hover:border-gray-400 text-primary rounded-full font-bold'
                                    variant={'default'}
                                    size={'lg'}
                                    onClick={handleUpgrading}
                                >
                                    {loading ? "Upgrading..." : "Upgrade"}
                                </Button>
                            </div>
                        </div>
                    }
                        <SignedIn>
                            <SidebarMenuButton size={'lg'}
                                className='data-[state=open]:bg-sidebar-accent-foreground'>
                                <UserButton />
                                <div className='flex flex-col'>
                                    <span>{user.fullName}</span>
                                    <span className='text-sm'>{user.emailAddresses[0]?.emailAddress}</span>
                                </div>
                            </SidebarMenuButton>
                        </SignedIn>
                </div>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

export default NavFooter
