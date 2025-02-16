import { getAllProducts } from '@/actions/project'
import React from 'react'

const DashboardPage = async () => {
    const allProjects = await getAllProducts()
    return (
        <div className='w-full gap-6 flex flex-col relative'>
            <div className='flex flex-col-reverse w-full items-center md:flex-row md:items-start'>
                <div className='flex flex-col items-start'>
                    <h1 className='text-2xl font-semibold dark:text-primary backdrop-blur-lg'>
                        Projects
                    </h1>
                    <p className='text-secondary'>All your work at one place</p>
                </div>
            </div>

            {/* PROJECTS */}
        </div>
    )
}

export default DashboardPage
