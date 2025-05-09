import { pgTable, text, serial, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name"),
  avatar: text("avatar"),
  role: text("role").default("user"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  fullName: true,
  avatar: true,
  role: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Projects table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  type: text("type").notNull(),
  status: text("status").default("planning").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertProjectSchema = createInsertSchema(projects, {
  name: (schema) => schema.min(3, "Project name must be at least 3 characters"),
  description: (schema) => schema.optional(),
  type: (schema) => schema.refine(val => ["website", "ecommerce", "blog", "portfolio", "other"].includes(val), {
    message: "Type must be one of: website, ecommerce, blog, portfolio, other"
  }),
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

// Team members on projects (many-to-many relationship)
export const projectMembers = pgTable("project_members", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id),
  userId: integer("user_id").notNull().references(() => users.id),
  role: text("role").default("member").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProjectMemberSchema = createInsertSchema(projectMembers);
export type InsertProjectMember = z.infer<typeof insertProjectMemberSchema>;
export type ProjectMember = typeof projectMembers.$inferSelect;

// Dashboard statistics
export const statistics = pgTable("statistics", {
  id: serial("id").primaryKey(),
  views: integer("views").default(0).notNull(),
  visitors: integer("visitors").default(0).notNull(),
  averageTimeOnSite: integer("average_time_on_site").default(0).notNull(), // in seconds
  totalUsers: integer("total_users").default(0).notNull(),
  date: timestamp("date").defaultNow().notNull(),
});

export const insertStatisticsSchema = createInsertSchema(statistics);
export type InsertStatistics = z.infer<typeof insertStatisticsSchema>;
export type Statistics = typeof statistics.$inferSelect;

// Face detection records
export const faceDetections = pgTable("face_detections", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  faceDetected: boolean("face_detected").default(false).notNull(),
  confidence: text("confidence"),
  metadata: jsonb("metadata"),
});

export const insertFaceDetectionSchema = createInsertSchema(faceDetections);
export type InsertFaceDetection = z.infer<typeof insertFaceDetectionSchema>;
export type FaceDetection = typeof faceDetections.$inferSelect;

// AI content generation logs
export const contentGenerations = pgTable("content_generations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  prompt: text("prompt").notNull(),
  model: text("model").notNull(),
  content: text("content"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  processingTime: integer("processing_time"), // in milliseconds
});

export const insertContentGenerationSchema = createInsertSchema(contentGenerations);
export type InsertContentGeneration = z.infer<typeof insertContentGenerationSchema>;
export type ContentGeneration = typeof contentGenerations.$inferSelect;

// Define relations
export const projectsRelations = relations(projects, ({ many }) => ({
  members: many(projectMembers),
}));

export const usersRelations = relations(users, ({ many }) => ({
  projectMemberships: many(projectMembers),
  faceDetections: many(faceDetections),
  contentGenerations: many(contentGenerations),
}));

export const projectMembersRelations = relations(projectMembers, ({ one }) => ({
  project: one(projects, {
    fields: [projectMembers.projectId],
    references: [projects.id],
  }),
  user: one(users, {
    fields: [projectMembers.userId],
    references: [users.id],
  }),
}));
