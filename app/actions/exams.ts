'use server'

import { db } from '@/db'
import { exams } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { getCurrentUser } from '@/lib/dal'
import { z } from 'zod'
import { revalidateTag } from 'next/cache'
// Define Zod schema for issue validation
const ExamSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  q1: z.string().min(3, 'Answer must be at least 3 characters'),
  answerOne: z.enum([
    'Allah', 
    'Muhammad', 
    'Adam'
  ], {
    errorMap: () => ({ message: 'Please select an option' }),
  }),
  q2: z.string().min(10, 'Please write be at least 10 characters'),
  answer: z.string().min(3, 'Answer must be at least 3 characters'),
  q3: z.string().min(10, 'Please write be at least 10 characters'),
  q4: z.string().min(5, 'Code explanation must be at least 5 characters'),
  q5: z.string().min(5, 'Answer must be at least 5 characters'),

  status: z.enum(['backlog', 'todo', 'in_progress', 'done'], {
    errorMap: () => ({ message: 'Please select a valid status' }),
  }),

  type: z.enum(['test', 'assessment', 'exam'], {
    errorMap: () => ({ message: 'Please select a valid type' }),
  }),
  userId: z.string().min(1, 'User ID is required'),
})

export type ExamData = z.infer<typeof ExamSchema>

export type ActionResponse = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
  error?: string
}

export async function createExam(data: ExamData): Promise<ActionResponse> {
  try {
    // Security check - ensure user is authenticated
    const user = await getCurrentUser()
    if (!user) {
      return {
        success: false,
        message: 'Unauthorized access',
        error: 'Unauthorized',
      }
    }

    // Validate with Zod
    const validationResult = ExamSchema.safeParse(data)
    if (!validationResult.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validationResult.error.flatten().fieldErrors,
      }
    }

    // Create issue with validated data
    const validatedData = validationResult.data
    await db.insert(exams).values({
      title: validatedData.title,
      q1: validatedData.q1 || null,
      answerOne: validatedData.answerOne || null,
      q2: validatedData.q2 || null,
      answer: validatedData.answer || null,
      q3: validatedData.q3 || null,
      q4: validatedData.q4 || null,
      q5: validatedData.q5 || null,
      status: validatedData.status,
      type: validatedData.type,
      userId: validatedData.userId,
    })

    revalidateTag('exams')

    return { success: true, message: 'exam created successfully' }
  } catch (error) {
    console.error('Error creating exam:', error)
    return {
      success: false,
      message: 'An error occurred while creating the exam',
      error: 'Failed to create exam',
    }
  }
}

export async function updateExam(
  id: number,
  data: Partial<ExamData>
): Promise<ActionResponse> {
  try {
    // Security check - ensure user is authenticated
    const user = await getCurrentUser()
    if (!user) {
      return {
        success: false,
        message: 'Unauthorized access',
        error: 'Unauthorized',
      }
    }

    // Allow partial validation for updates
    const UpdateExamSchema = ExamSchema.partial()
    const validationResult = UpdateExamSchema.safeParse(data)

    if (!validationResult.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validationResult.error.flatten().fieldErrors,
      }
    }

    // Type safe update object with validated data
    const validatedData = validationResult.data
    const updateData: Record<string, unknown> = {}

    if (validatedData.title !== undefined)
      updateData.title = validatedData.title
    if (validatedData.q1 !== undefined)
      updateData.q1 = validatedData.q1
    if (validatedData.answerOne !== undefined)
      updateData.answerOne = validatedData.answerOne
    if (validatedData.q2 !== undefined)
      updateData.q2 = validatedData.q2
    if (validatedData.answer !== undefined)
      updateData.answer = validatedData.answer
    if (validatedData.q3 !== undefined)
      updateData.q3 = validatedData.q3
    if (validatedData.answer !== undefined)
      updateData.answer = validatedData.answer
    if (validatedData.q4 !== undefined)
      updateData.q4 = validatedData.q4
    if (validatedData.answer !== undefined)
      updateData.answer = validatedData.answer
    if (validatedData.q5 !== undefined)
      updateData.q5 = validatedData.q5
    if (validatedData.answer !== undefined)
      updateData.answer = validatedData.answer
    if (validatedData.status !== undefined)
      updateData.status = validatedData.status
    if (validatedData.type !== undefined)
      updateData.type = validatedData.type

    // Update issue
    await db.update(exams).set(updateData).where(eq(exams.id, id))

    return { success: true, message: 'exam updated successfully' }
  } catch (error) {
    console.error('Error updating exam:', error)
    return {
      success: false,
      message: 'An error occurred while updating the exam',
      error: 'Failed to update exam',
    }
  }
}

export async function deleteExam(id: number) {
  try {
    // Security check - ensure user is authenticated
    const user = await getCurrentUser()
    if (!user) {
      throw new Error('Unauthorized')
    }

    // Delete issue
    await db.delete(exams).where(eq(exams.id, id))

    return { success: true, message: 'exam deleted successfully' }
  } catch (error) {
    console.error('Error deleting exam:', error)
    return {
      success: false,
      message: 'An error occurred while deleting the exam',
      error: 'Failed to delete exam',
    }
  }
}
