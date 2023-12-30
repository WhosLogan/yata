import db from "$lib/server/drizzle/database.js";
import {users} from "$lib/server/drizzle/schema.js";
import * as argon2 from "argon2";
import * as jose from "jose";
import {AUTH_SECRET} from "$env/static/private";
import {fail, redirect} from "@sveltejs/kit";
import {eq} from "drizzle-orm";

export const actions = {
    default: async ({request, cookies}) => {
        // Get form data
        const form = await request.formData();

        // Get username and password from form
        const username = form.get('username');
        const password = form.get('password');

        try {
            const u = await db.select()
                .from(users)
                .where(eq(users.username, username))
                .limit(1)

            if (u.length === 0 || !u[0]) {
                return fail(400, {
                    error: {
                        message: "Invalid username or password"
                    }
                })
            }

            const user = u[0];

            if (!(await argon2.verify(user.password, password))) {
                return fail(400, {
                    error: {
                        message: "Invalid username or password"
                    }
                })
            }

            const userId = user.id;
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
                    message: "Invalid username or password"
                }
            })
        }

        throw redirect(303, "/dashboard");
    }
}