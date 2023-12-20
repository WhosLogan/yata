import type { Config } from "drizzle-kit";
export default {
    schema: "./src/lib/server/drizzle/schema.js",
    out: "./migrations",
} satisfies Config;