import {integer, sqliteTable, text} from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
    'users',
    {
        id: integer('id', {mode: 'number'}).primaryKey({autoIncrement: true}),
        username: text('username').notNull().unique(),
        password: text('password').notNull()
    }
)

export const projects = sqliteTable(
    'projects',
    {
        id: integer('id', {mode: 'number'}).primaryKey({autoIncrement: true}),
        name: text('name').notNull(),
        description: text('description'),
        rate: integer('rate', {mode: 'number'}).notNull().default(0),
        owner: integer('owner_id', {mode: 'number'}).references(() => users.id)
    }
)

export const timeCards = sqliteTable(
    'timeCards',
    {
        id: integer('id', {mode: 'number'}).primaryKey({autoIncrement: true}),
        start: integer('start', {mode: 'timestamp_ms'}).notNull(),
        end: integer('end', {mode: 'timestamp_ms'}).notNull(),
        project: integer('project_id', {mode: 'number'}).references(() => projects.id)
    }
)