import {z} from "zod"
import {fail, redirect} from "@sveltejs/kit";
import db from "$lib/server/drizzle/database.js";
import {projects as projectsSchema, projects} from "$lib/server/drizzle/schema.js";
import {eq} from "drizzle-orm";

const newProjectSchema = z.object({
    name: z.string()
        .min(3, "Name cannot be less than 3 characters")
        .max(25, "Name cannot be longer than 25 characters")
        .regex(/^[a-zA-Z0-9 ]+$/, "Name must be alphanumeric"),
    description: z.string()
        .min(5, "Description must be at least 5 characters")
        .max(100, "Description cannot exceed 100 characters")
        .regex(/^[a-zA-Z0-9 .!$@#)(*]+$/, "Description contains illegal characters"),
    rate: z.coerce.number({
        required_error: "Rate is required",
        invalid_type_error: "Rate must be a number"
    })
        .min(0, "Rate cannot be negative")
        .max(10000, "Rate cannot be above 10000")
})

export const load = async ({locals}) => {
    // Select the users projects from the database
    const projects = await db
        .select()
        .from(projectsSchema)
        .where(eq(projectsSchema.owner, locals.user.id))
        .limit(25);

    // Return user and projects
    return {
        user: {
            username: locals.user.username,
        },
        projects: projects
    }
}

export const actions = {
    default: async ({request, locals}) => {
        const form = await request.formData();
        const name = form.get('name');
        const description = form.get('description');
        const rate = form.get('rate');

        let newProject = await newProjectSchema.safeParseAsync({
            name: name,
            description: description,
            rate: rate
        })

        if (!newProject.success) {
            return fail(400, {
                error: {
                    message: newProject.error.errors[0].message
                }
            })
        }

        let insertedProject = await db.insert(projects).values({
            name: newProject.data.name,
            description: newProject.data.description,
            rate: newProject.data.rate,
            owner: locals.user.id
        }).returning({id: projects.id});

        return redirect(303, `/dashboard/projects/${insertedProject[0].id}`)
    }
}