'use client'

import { containerVarients } from "@/lib/constants"
import { Project } from "@prisma/client"
import ProjectCard from "../project-card"
import {motion} from 'framer-motion'


type Props = {
  project: Project[]
}
export const Projects = ({ project }: Props) => {
  return (
    <motion.div
      className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
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
