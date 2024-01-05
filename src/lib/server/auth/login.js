import db from "$lib/server/drizzle/database.js";
import {users} from "$lib/server/drizzle/schema.js";
import {eq} from "drizzle-orm";
import * as argon2 from "argon2";
import * as jose from "jose";
import {AUTH_SECRET} from "$env/static/private";
import {UserCredentials} from "$lib/server/auth/schema.js";

export async function Login(username, password) {
    // Make the username lowercase
    username = username.toLowerCase();

    // Create user object
    const credentials = UserCredentials.safeParse({
        username: username,
        password: password
    })

    // Validate input
    if (!credentials.success) {
        return {
            success: false,
            error: {
                message: credentials.error.errors[0].message
            }
        }
    }

    try {
        // Retrieve the user from the database
        const u = await db.select()
            .from(users)
            .where(eq(users.username, credentials.data.username))
            .limit(1)

        // Confirm a user was returned
        if (u.length === 0 || !u[0]) {
            return {
                success: false,
                error: {
                    message: "Invalid username or password"
                }
            }
        }

        // Get the first user (the only user)
        const user = u[0];

        // Verify the users password
        if (!(await argon2.verify(user.password, credentials.data.password))) {
            return {
                success: false,
                error: {
                    message: "Invalid username or password"
                }
            }
        }

        // Get the users id
        const userId = user.id;

        // Get the auth secret
        const secret = jose.base64url.decode(AUTH_SECRET)

        // Create a new jwt string
        const jwt = await new jose.EncryptJWT({'id': userId})
            .setProtectedHeader({alg: 'dir', enc: 'A128CBC-HS256'})
            .setIssuedAt()
            .setIssuer('yata')
            .setExpirationTime('24h')
            .encrypt(secret)

        // Return the jwt string
        return {
            success: true,
            token: jwt
        }
    } catch {
        // Generic response when an error has occurred
        return {
            success: false,
            error: {
                message: "An error has occurred"
            }
        }
    }
}
