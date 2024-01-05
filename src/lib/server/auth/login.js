import db from "$lib/server/drizzle/database.js";
import {users} from "$lib/server/drizzle/schema.js";
import {eq} from "drizzle-orm";
import * as argon2 from "argon2";
import * as jose from "jose";
import {AUTH_SECRET} from "$env/static/private";

export async function Login(username, password) {
    try {
        const u = await db.select()
            .from(users)
            .where(eq(users.username, username))
            .limit(1)

        if (u.length === 0 || !u[0]) {
            return {
                success: false,
                error: {
                    message: "Invalid username or password"
                }
            }
        }

        const user = u[0];

        if (!(await argon2.verify(user.password, password))) {
            return {
                success: false,
                error: {
                    message: "Invalid username or password"
                }
            }
        }

        const userId = user.id;
        const secret = jose.base64url.decode(AUTH_SECRET)
        const jwt = await new jose.EncryptJWT({'id': userId})
            .setProtectedHeader({alg: 'dir', enc: 'A128CBC-HS256'})
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
                message: "An error has occurred"
            }
        }
    }
}
