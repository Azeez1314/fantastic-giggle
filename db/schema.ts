import { InferSelectModel, relations } from 'drizzle-orm'
import { pgTable, serial, text, timestamp, pgEnum, integer } from 'drizzle-orm/pg-core'

// Enums for exam status and type
export const statusEnum = pgEnum('status', [
  'backlog',
  'todo',
  'in_progress',
  'done',
])
export const typeEnum = pgEnum('type', ['test', 'assessment', 'exam',])
export const answerOneEnum = pgEnum('answerOne', ['', 'allah', 'muhammad', 'adam',])
export const roleEnum = pgEnum('role', ['STUDENT', 'ADMIN',])


// Exams table
export const exams = pgTable('exams', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  q1: text('q1'),
  q2: text('q2'),
  q3: text('q3'),
  q4: text('q4'),
  q5: text('q5'),
  answer: text('answer'),
  answerThree: text('answerThree'),
  answerFour: text('answerFour'),
  answerFive: text('answerFive'),
  status: statusEnum('status').default('backlog').notNull(),
  answerOne: answerOneEnum('answerOne').default('').notNull(),
  type: typeEnum('type').default('test').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  userId: text('user_id').notNull(),
  score: integer('score').default(0),
  percentage: integer('percentage').default(0),
})

// Users table
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: roleEnum('role').default('STUDENT').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Relations between tables
export const examsRelations = relations(exams, ({ one }) => ({
  user: one(users, {
    fields: [exams.userId],
    references: [users.id],
  }),
}))

export const usersRelations = relations(users, ({ many }) => ({
  exams: many(exams),
}))

// Types
export type Exam = InferSelectModel<typeof exams>
export type User = InferSelectModel<typeof users>

// Status and type labels for display
export const EXAM_STATUS = {
  backlog: { label: 'Backlog', value: 'backlog' },
  todo: { label: 'Todo', value: 'todo' },
  in_progress: { label: 'In Progress', value: 'in_progress' },
  done: { label: 'Done', value: 'done' },
}

export const EXAM_TYPE = {
  test: { label: 'Test', value: 'test' },
  assessment: { label: 'Assessment', value: 'assessment' },
  exam: { label: 'Exam', value: 'exam' },
}

export const EXAM_ANSWERONE = {
  pick: { label: '', value: '' },
  allah: { label: 'Allah', value: 'allah' },
  muhammad: { label: 'Muhammad', value: 'muhammad' },
  adam: { label: 'Adam', value: 'adam' },
}
