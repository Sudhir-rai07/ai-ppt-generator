'use server'

import { client } from "@/lib/prisma"
import { onAuthenticateUser } from "./user"

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
                idDeleted: false
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