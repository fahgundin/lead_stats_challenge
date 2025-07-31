import { pgEnum,integer, pgTable, varchar, timestamp, date, } from "drizzle-orm/pg-core";

export const priorityEnum = pgEnum('task_priority',['LOW','MEDIUM','HIGH'])
export const statusEnum = pgEnum('task_status',['TODO','IN_PROGRESS','DONE'])

export const tasksTable = pgTable("tasksTable", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  priority: priorityEnum(),
  status: statusEnum(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  dueDate: date('dueDate',{mode:'date'}),
  assignedTo: varchar({ length: 255 }).notNull(),
  tags: varchar({length:25}).array(),
  estimatedHours: integer(),


});