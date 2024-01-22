import { migrate } from "drizzle-orm/libsql/migrator";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

export const client = createClient({
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client);

async function main() {
    try {
        await migrate(db, {
            migrationsFolder: "./migrations",
        });
        console.log("Tables migrated!");
        process.exit(0);
    } catch (error) {
        console.error("Error performing migration: ", error);
        process.exit(1);
    }
}

main().then(() => console.log("Migration Script Finished"));