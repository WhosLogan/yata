import db from "$lib/server/drizzle/database.js";
import {users} from "$lib/server/drizzle/schema.js";
import * as argon2 from "argon2";
import * as jose from "jose";
import {AUTH_SECRET} from "$env/static/private";

export async function Register(username, password) {
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
        return {
            success: true,
            token: jwt
        }
    } catch {
        return {
            success: false,
            error: {
                message: "Unable to create an account with those credentials"
            }
        }
    }
}