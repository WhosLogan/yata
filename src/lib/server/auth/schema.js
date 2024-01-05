import {z} from "zod";

export const UserCredentials = z.object({
    username: z.string()
        .min(5, "Username must be at least 5 characters")
        .max(15, "Username cannot be more than 15 characters")
        .regex(/^[a-zA-Z0-9]+$/, "Username must be alphanumeric"),
    password: z.string()
        .min(11, "Password must be at least 11 characters")
        .max(128, "Password cannot be more than 128 characters")
        .regex(/^[a-zA-Z0-9!@#$%^&*()/.,;'":[\]]+$/, "Password contains invalid characters")
})