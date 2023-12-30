import db from "$lib/server/drizzle/database.js";
import {users} from "$lib/server/drizzle/schema.js";
import {fail, redirect} from "@sveltejs/kit";
import * as argon2 from "argon2"
import * as jose from "jose"
import {AUTH_SECRET} from "$env/static/private"

export const actions = {
    default: async ({request, cookies}) => {
        // Get form data
        const form = await request.formData();

        // Get username and password from form
        const username = form.get('username');
        const password = form.get('password');

        try {
            const insertion = await db.insert(users).values({
                username: username,
                password: await argon2.hash(password)
            }).returning({ id: users.id });
            const userId = insertion[0].id;
            const secret = jose.base64url.decode(AUTH_SECRET)
            const jwt = await new jose.EncryptJWT({ 'id': userId })
                .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
                .setIssuedAt()
                .setIssuer('yata')
                .setExpirationTime('24h')
                .encrypt(secret)
            cookies.set("auth", jwt, {
                path: '/',
                sameSite: 'strict'
            });
        } catch (e) {
            return fail(400, {
                error: {
                    message: "Unable to create an account with those credentials"
                }
            })
        }

        throw redirect(303, "/dashboard");
    }
}