import {error} from "@sveltejs/kit";
import db from "$lib/server/drizzle/database.js";
import {projects, timeCards} from "$lib/server/drizzle/schema.js";
import {and, eq} from "drizzle-orm";

export const load = async ({locals, params}) => {
    // Select project from the database
    let project = await db.select()
        .from(projects)
        .where(and(
            eq(projects.owner, locals.user.id),
            eq(projects.id, params.id)
        ))
        .limit(1)

    // Ensure the project actually exists
    if (project.length === 0 || !project[0]) {
        throw error(404, 'Not Found');
    }

    // Select all time cards from the database
    const cards = await db.select()
        .from(timeCards)
        .where(eq(timeCards.project, project[0].id))

    // Return the project and time cards
    return {
        project: project[0],
        timeCards: cards
    }
}