import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const players = pgTable("players", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  instagram: text("instagram").notNull(),
  birthdate: text("birthdate").notNull(),
  zodiacSign: text("zodiac_sign").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const gameResults = pgTable("game_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerId: varchar("player_id").notNull().references(() => players.id),
  gameMode: text("game_mode").notNull(),
  score: integer("score").notNull().default(0),
  matches: integer("matches").notNull().default(0),
  completed: integer("completed").notNull().default(0), // 0 = false, 1 = true
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPlayerSchema = createInsertSchema(players).pick({
  name: true,
  instagram: true,
  birthdate: true,
  zodiacSign: true,
});

// Permitir qualquer string para zodiacSign
export const insertPlayerSchemaAnyZodiac = z.object({
  name: z.string(),
  instagram: z.string(),
  birthdate: z.string(),
  zodiacSign: z.string(),
});

export const insertGameResultSchema = createInsertSchema(gameResults).pick({
  playerId: true,
  gameMode: true,
  score: true,
  matches: true,
  completed: true,
});

export type InsertPlayer = z.infer<typeof insertPlayerSchema>;
export type Player = typeof players.$inferSelect;
export type InsertGameResult = z.infer<typeof insertGameResultSchema>;
export type GameResult = typeof gameResults.$inferSelect;
