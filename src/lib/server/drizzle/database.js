import {drizzle} from "drizzle-orm/libsql";
import {DATABASE_URL, DATABASE_AUTH_TOKEN} from "$env/static/private"
import {createClient} from "@libsql/client";
import * as schema from "./schema.js";

const db = new drizzle(createClient({
    url: DATABASE_URL,
    authToken: DATABASE_AUTH_TOKEN
}), { schema });

export default db;