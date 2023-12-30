import * as jose from "jose";
import {AUTH_SECRET} from "$env/static/private";
import {redirect} from "@sveltejs/kit";
import db from "$lib/server/drizzle/database.js";
import {users} from "$lib/server/drizzle/schema.js";
import {eq} from "drizzle-orm";

export async function handle({event, resolve}) {
    if (event.url.pathname.startsWith('/dashboard')) {
        const authToken = event.cookies.get('auth');
        if (!authToken || authToken === "") {
            throw redirect(303, "/");
        }

        try {
            const secret = jose.base64url.decode(AUTH_SECRET);

            const { payload } = await jose.jwtDecrypt(authToken, secret, {
                issuer: 'yata',
            })

            event.locals.user = (await db.select()
                .from(users)
                .where(eq(users.id, payload.id)))[0];
        } catch {
            event.cookies.delete('auth', { path: '/' })
            throw redirect(303, "/");
        }
    }

    return await resolve(event);
}
