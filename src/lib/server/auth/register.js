import db from "$lib/server/drizzle/database.js";
import {users} from "$lib/server/drizzle/schema.js";
import * as argon2 from "argon2";
import * as jose from "jose";
import {AUTH_SECRET} from "$env/static/private";
import {UserCredentials} from "$lib/server/auth/schema.js";

export async function Register(username, password) {
    // Make the username lowercase
    username = username.toLowerCase();

    // Create user object
    const user = UserCredentials.safeParse({
        username: username,
        password: password
    })

    // Validate input
    if (!user.success) {
        return {
            success: false,
            error: {
                message: user.error.errors[0].message
            }
        }
    }

    try {
        // Attempt to insert the user into the database
        const insertion = await db.insert(users).values({
            username: user.data.username,
            password: await argon2.hash(user.data.password)
        }).returning({ id: users.id });

        // Attempt to get the users id from the insertion result
        const userId = insertion[0].id;

        // Get the auth secret
        const secret = jose.base64url.decode(AUTH_SECRET)

        // Create a new jwt string
        const jwt = await new jose.EncryptJWT({ 'id': userId })
            .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
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
        // Return a generic error in the event of exceptions
        return {
            success: false,
            error: {
                message: "Unable to create an account with those credentials"
            }
        }
    }
}