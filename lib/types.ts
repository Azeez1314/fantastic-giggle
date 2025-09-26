import { Exam } from '@/db/schema'

export type Status = 'backlog' | 'todo' | 'in_progress' | 'done'
export type Type = 'test' | 'assessment' | 'exam' 
export type AnswerOne = 'allah' | 'muhammad' | 'adam'

export type ExamWithUser = Exam & {
  user: {
    id: string
    email: string
  }
}
