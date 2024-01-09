import {error} from "@sveltejs/kit";
import db from "$lib/server/drizzle/database.js";
import {projects} from "$lib/server/drizzle/schema.js";
import {and, eq} from "drizzle-orm";

export const load = async ({locals, params}) => {
    let project = await db.select()
        .from(projects)
        .where(and(
            eq(projects.owner, locals.user.id),
            eq(projects.id, params.id)
        ))
        .limit(1)

    if (project.length === 0 || !project[0]) {
        return error(404, 'Not Found');
    }

    return {
        project: project[0]
    }
}