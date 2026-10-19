import {
  pgTable,
  text,
  integer,
  uuid,
  numeric,
  timestamp,
} from "drizzle-orm/pg-core";

// ========================================
// PROJECTS TABLE
// ========================================

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  year: integer("year").notNull(),
  summary: text("summary"),
  imageUrl: text("image_url"),
});

// ========================================
// CUSTOMERS TABLE
// ========================================

export const customers = pgTable("customers", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  name: text("name").notNull(),

  balance: numeric("balance", {
    precision: 10,
    scale: 2,
    mode: "number",
  })
    .notNull()
    .default(0),

  lastPaid: text("last_paid").default("never"),
}).enableRLS();

// ========================================
// PROFILES TABLE
// ========================================

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(),

  email: text("email").notNull(),

  role: text("role", {
    enum: ["admin", "client"],
  })
    .notNull()
    .default("client"),
});

// ========================================
// ENTRIES TABLE
// ========================================

export const entries = pgTable("entries", {
  id: uuid("id").defaultRandom().primaryKey(),

  customerId: text("customer_id")
    .notNull()
    .references(() => customers.id, {
      onDelete: "cascade",
    }),

  kind: text("kind", {
    enum: ["owe", "payment"],
  }).notNull(),

  amount: numeric("amount", {
    precision: 10,
    scale: 2,
    mode: "number",
  }).notNull(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
}).enableRLS();

// ========================================
// TYPES
// ========================================

export type Profile = typeof profiles.$inferSelect;
export type Customer = typeof customers.$inferSelect;
export type Entry = typeof entries.$inferSelect;
