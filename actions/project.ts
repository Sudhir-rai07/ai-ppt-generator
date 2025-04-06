'use server'

import { client } from "@/lib/prisma"
import { onAuthenticateUser } from "./user"
import { OutlineCard } from "@/lib/types"
import { JsonValue } from "@prisma/client/runtime/library"

export const getAllProducts = async () => {
    try {
        // Check user
        const checkUser = await onAuthenticateUser()
        if (checkUser.status !== 200 || !checkUser.user) {
            return { status: 400, error: "GET PRODUCTS: User not authenticated" }
        }

        // Fetch all projects - prismaClient
        const projects = await client.project.findMany({
            where: {
                userId: checkUser.user.id,
                isDeleted: false
            },
            orderBy: {
                updatedAt: 'desc'
            }
        })

        // Get product lenght and send response accoring to the length
        // len-0 : Return error-> No Project found
        // len>0 : Return status:200, and all projects
        if (projects.length === 0) {
            return { status: 404, error: "No project found" }
        }

        return {
            status: 200,
            data: projects
        }
    } catch (error) {
        console.log("Error in getAllProducts", error)
        return { status: 500, error: "Internal server error" }
    }
}


export const getRecentProjects = async () => {
    try {
        // Check user
        const checkUser = await onAuthenticateUser()
        if (checkUser.status !== 200 || !checkUser.user) {
            return { status: 400, error: "GET RECENT PROJECTS: User not authenticated" }
        }

        // find projects
        const recentProjects = await client.project.findMany({
            where: {
                userId: checkUser.user.id,
                isDeleted: false
            },
            orderBy: {
                updatedAt: 'desc',
            },
            take: 5
        })

        if (recentProjects.length === 0) {
            return { status: 404, error: "No recent project available" }
        }

        return { status: 200, data: recentProjects }
    } catch (error) {
        console.log("Error in getRecentProducts", error)
        return { status: 500, error: "Internal server error" }
    }
}

export const recoverProject = async (projectId: string) => {
    try {
        // Check user
        const checkUser = await onAuthenticateUser()
        if (checkUser.status !== 200 || !checkUser.user) {
            return { status: 400, error: "RECOVER PROJECTS: User not authenticated" }
        }

        const updateProject = await client.project.update({
            where: {
                id: projectId
            }, data: {
                isDeleted: false
            }
        })

        if (!updateProject) {
            return {
                status: 500,
                error: "Failed to recover project"
            }
        }

        return { status: 200, data: updateProject }
    } catch (error) {
        console.log("Error in recoverProject", error)
        return { status: 500, error: "Internal server error" }
    }
}


export const deleteProject = async (projectId: string) => {
    try {
        // Check user
        const checkUser = await onAuthenticateUser()
        if (checkUser.status !== 200 || !checkUser.user) {
            return { status: 400, error: "DELETE PROJECTS: User not authenticated" }
        }


        const deleteProject = await client.project.update({
            where: {
                id: projectId
            }, data: {
                isDeleted: true
            }
        })

        if (!deleteProject) {
            return {
                status: 500,
                error: "Failed to delete project"
            }
        }

        return { status: 200, data: deleteProject }
    } catch (error) {
        console.log("Error in deleteProject", error)
        return { status: 500, error: "Internal server error" }
    }
}

export const createProject = async (title: string, outlines: OutlineCard[]) =>{
     try {
        if(!title || !outlines || outlines.length === 0){
            return {
                status: 400,
                error: "Title and outlines are required"
            }
        }

        const allOutlines = outlines.map((outline) => outline.title)

        const checkUser = await onAuthenticateUser()
        if(checkUser.status !== 200 || !checkUser.user) {
            return {
                status: 403,
                error: "User not authenticated"
            }
        }

        const project = await client.project.create({data:{
            title,
            outlines: allOutlines,
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: checkUser.user.id   
        }})
        if(!project){
            return {
                status: 500,
                error: "Failed to create project"
            }
        }
        return {status: 200, data: project}
    } catch(error) {
        console.log("Error in createProject", error)
        return { status: 500, error: "Internal server error" }

    }
}

export const getProjectBuId = async (projectId: string) =>{
try {
    const checkUser = await onAuthenticateUser()
    if(checkUser.status !== 200 || !checkUser.user){
        return {
            status: 403,
            error: "User not authenticated"
        }
    }

    const project = await client.project.findFirst({
        where: {
            id: projectId
        }
    })

    if(!project){
        return {
            status: 404,
            error: "Project not found"
        }
    }

    return {status: 200, data: project}
} catch (error) {
    console.log("Error in getProjectById", error)
    return { status: 500, error: "Internal server error" }
}
}

export const updateSlides = async (projectId: string, slides: JsonValue) => {
    try {
        if(!projectId || !slides){
            return {
                status: 400,
                error: "Project ID and slides are required."
            }
        }

        const updateProject = await client.project.update({
            where: {
                id: projectId
            },
            data: {
                slides
            }
        })

        if(!updateProject) {
            return {
                status: 500,
                error: "Failed to update slides"
            }
        }
    } catch(error) {
        console.log("Error in updateSlides", error)
        return { status: 500, error: "Internal server error" }

    }
}