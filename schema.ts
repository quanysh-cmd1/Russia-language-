import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "teacher", "student"]).default("student").notNull(),
  userType: mysqlEnum("userType", ["student", "teacher", "admin"]).default("student").notNull(),
  group: mysqlEnum("group", ["Жамбыл", "Абай"]),
  grade: int("grade"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Lessons table
export const lessons = mysqlTable("lessons", {
  id: int("id").autoincrement().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  content: text("content"),
  youtubeUrl: varchar("youtubeUrl", { length: 500 }),
  grade: int("grade").notNull(),
  topic: varchar("topic", { length: 255 }).notNull(),
  order: int("order").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lesson = typeof lessons.$inferSelect;
export type InsertLesson = typeof lessons.$inferInsert;

// Tests/Quizzes table
export const tests = mysqlTable("tests", {
  id: int("id").autoincrement().primaryKey(),
  lessonId: int("lessonId").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  questions: json("questions"),
  passingScore: int("passingScore").default(70),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Test = typeof tests.$inferSelect;
export type InsertTest = typeof tests.$inferInsert;

// Student test scores
export const testScores = mysqlTable("testScores", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  testId: int("testId").notNull(),
  lessonId: int("lessonId").notNull(),
  score: int("score").notNull(),
  maxScore: int("maxScore").notNull(),
  accuracy: decimal("accuracy", { precision: 5, scale: 2 }),
  passed: boolean("passed").default(false),
  completedAt: timestamp("completedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TestScore = typeof testScores.$inferSelect;
export type InsertTestScore = typeof testScores.$inferInsert;

// Student lesson progress
export const lessonProgress = mysqlTable("lessonProgress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  lessonId: int("lessonId").notNull(),
  videoWatched: boolean("videoWatched").default(false),
  testPassed: boolean("testPassed").default(false),
  completed: boolean("completed").default(false),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LessonProgress = typeof lessonProgress.$inferSelect;
export type InsertLessonProgress = typeof lessonProgress.$inferInsert;

// Student streaks
export const streaks = mysqlTable("streaks", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  currentStreak: int("currentStreak").default(0),
  longestStreak: int("longestStreak").default(0),
  lastActivityDate: timestamp("lastActivityDate"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Streak = typeof streaks.$inferSelect;
export type InsertStreak = typeof streaks.$inferInsert;

// Games table
export const games = mysqlTable("games", {
  id: int("id").autoincrement().primaryKey(),
  lessonId: int("lessonId").notNull(),
  title: text("title").notNull(),
  gameType: mysqlEnum("gameType", ["multiple_choice", "sorting", "word_constructor", "true_false", "error_detection"]).notNull(),
  content: json("content"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Game = typeof games.$inferSelect;
export type InsertGame = typeof games.$inferInsert;

// Game scores
export const gameScores = mysqlTable("gameScores", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  gameId: int("gameId").notNull(),
  score: int("score").notNull(),
  maxScore: int("maxScore").notNull(),
  accuracy: decimal("accuracy", { precision: 5, scale: 2 }),
  completedAt: timestamp("completedAt").defaultNow().notNull(),
});

export type GameScore = typeof gameScores.$inferSelect;
export type InsertGameScore = typeof gameScores.$inferInsert;

// AI Chat history
export const chatHistory = mysqlTable("chatHistory", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  userMessage: text("userMessage").notNull(),
  aiResponse: text("aiResponse").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatHistory = typeof chatHistory.$inferSelect;
export type InsertChatHistory = typeof chatHistory.$inferInsert;

// Notifications
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: text("title").notNull(),
  content: text("content"),
  type: mysqlEnum("type", ["student_registered", "grade_completed", "test_passed", "achievement"]).notNull(),
  read: boolean("read").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;