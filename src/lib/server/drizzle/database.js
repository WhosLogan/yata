import {drizzle} from "drizzle-orm/libsql";
import {DATABASE_URL, DATABASE_AUTH_TOKEN} from "$env/static/private"
import {createClient} from "@libsql/client";

const db = new drizzle(createClient({
    url: DATABASE_URL,
    authToken: DATABASE_AUTH_TOKEN
}));

export default db;