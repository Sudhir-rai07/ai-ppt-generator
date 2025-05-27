import { getAllProducts } from '@/actions/project'
import NotFound from '@/components/global/not-found/NotFound'
import Projects from '@/components/global/projects'
import React from 'react'

const DashboardPage = async () => {
    const allProjects = await getAllProducts()
    return (
        <div className='w-full gap-6 flex flex-col relative p-4'>
            <div className='flex flex-col-reverse w-full items-center md:flex-row md:items-start'>
                <div className='flex flex-col items-start'>
                    <h1 className='text-2xl font-semibold dark:text-primary backdrop-blur-lg'>
                        Projects
                    </h1>
                    <p className='text-secondary'>All your work at one place</p>
                </div>
            </div>

            {/* PROJECTS */}
            {allProjects.data && allProjects.data.length > 0 ? <Projects project={allProjects.data} /> : <NotFound />}
        </div>
    )
}

export default DashboardPage
