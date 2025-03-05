import { Project } from '@prisma/client'
import React from 'react'
import { motion } from 'framer-motion'
import { containerVarients } from '@/lib/constants'
import ProjectCard from '../project-card'

type Props = {
  project: Project[]
}
const Projects = ({ project }: Props) => {
  return (
    <motion.div
      className='gird grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
      variants={containerVarients}
      initial='hidden'
      animate="visible"
    >
      {project.map((project, idx) => (
        <ProjectCard
          key={idx}
          projectId={project.id}
          title={project.title}
          createdAt={project.createdAt}
          isDeleted={project.isDeleted}
          slides={project.slides}
        />
      ))}
    </motion.div>
  )
}

export default Projects
