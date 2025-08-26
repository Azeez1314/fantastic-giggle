'use client'

import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
import { Exam, EXAM_STATUS, EXAM_TYPE } from '@/db/schema'
import Button from './ui/Button'
import {
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  FormSelect,
  FormError,
} from './ui/Form'
import { createExam, updateExam, ActionResponse } from '@/app/actions/exams'

interface ExamFormProps {
  exam?: Exam
  userId: string
  isEditing?: boolean
}

const initialState: ActionResponse = {
  success: false,
  message: '',
  errors: undefined,
}

export default function ExamForm({
  exam,
  userId,
  isEditing = false,
}: ExamFormProps) {
  const router = useRouter()

  // Use useActionState hook for the form submission action
  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (prevState: ActionResponse, formData: FormData) => {
    // Extract data from form
    const data = {
      title: formData.get('title') as string,
      q1: formData.get('q1') as string,
      q2: formData.get('q2') as string,
      q3: formData.get('q3') as 'True' | 'False',
      q4: formData.get('q4') as string,
      q5: formData.get('q5') as string,
      status: formData.get('status') as
        | 'backlog'
        | 'todo'
        | 'in_progress'
        | 'done',
      type: formData.get('type') as 'test' | 'assessment' | 'exam',
      userId,
    }

    try {
      // Call the appropriate action based on whether we're editing or creating
      const result = isEditing
        ? await updateExam(Number(exam!.id), data)
        : await createExam(data)

      // Handle successful submission
      if (result.success) {
        router.refresh()
        if (!isEditing) {
          router.push('/dashboard')
        }
      }

      return result
    } catch (err) {
      return {
        success: false,
        message: (err as Error).message || 'An error occurred',
        errors: undefined,
      }
    }
  }, initialState)

  const statusOptions = Object.values(EXAM_STATUS).map(({ label, value }) => ({
    label,
    value,
  }))

  const typeOptions = Object.values(EXAM_TYPE).map(
    ({ label, value }) => ({
      label,
      value,
    })
  )

  return (
    <Form action={formAction}>
      {state?.message && (
        <FormError
          className={`mb-4 ${
            state.success ? 'bg-green-100 text-green-800 border-green-300' : ''
          }`}
        >
          {state.message}
        </FormError>
      )}

      <FormGroup>
        <FormLabel htmlFor="title">Title</FormLabel>
        <FormInput
          id="title"
          name="title"
          placeholder="Exam title"
          defaultValue={exam?.title || ''}
          required
          minLength={3}
          maxLength={100}
          disabled={isPending}
          aria-describedby="title-error"
          className={state?.errors?.title ? 'border-red-500' : ''}
        />
        {state?.errors?.title && (
          <p id="title-error" className="text-sm text-red-500">
            {state.errors.title[0]}
          </p>
        )}
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor="q1">Q1:</FormLabel>
        <FormTextarea
          id="q1"
          name="q1"
          placeholder="Describe the Exam..."
          rows={4}
          defaultValue={exam?.q1 || ''}
          disabled={isPending}
          aria-describedby="q1-error"
          className={state?.errors?.q1 ? 'border-red-500' : ''}
        />
        {state?.errors?.q1 && (
          <p id="q1-error" className="text-sm text-red-500">
            {state.errors.q1[0]}
          </p>
        )}
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor="q2">Q2:</FormLabel>
        <FormTextarea
          id="q2"
          name="q2"
          placeholder="Describe the Exam..."
          rows={4}
          defaultValue={exam?.q2 || ''}
          disabled={isPending}
          aria-describedby="q2-error"
          className={state?.errors?.q2 ? 'border-red-500' : ''}
        />
        {state?.errors?.q2 && (
          <p id="q2-error" className="text-sm text-red-500">
            {state.errors.q2[0]}
          </p>
        )}
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor="q3">Q3:</FormLabel>
        <FormTextarea
          id="q3"
          name="q3"
          placeholder="Describe the Exam..."
          rows={4}
          defaultValue={exam?.q3 || ''}
          disabled={isPending}
          aria-describedby="q3-error"
          className={state?.errors?.q3 ? 'border-red-500' : ''}
        />
        {state?.errors?.q3 && (
          <p id="q3-error" className="text-sm text-red-500">
            {state.errors.q3[0]}
          </p>
        )}
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor="q4">Q4:</FormLabel>
        <FormTextarea
          id="q4"
          name="q4"
          placeholder="Describe the Exam..."
          rows={4}
          defaultValue={exam?.q4 || ''}
          disabled={isPending}
          aria-describedby="q4-error"
          className={state?.errors?.q4 ? 'border-red-500' : ''}
        />
        {state?.errors?.q4 && (
          <p id="q4-error" className="text-sm text-red-500">
            {state.errors.q4[0]}
          </p>
        )}
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor="q5">Q5:</FormLabel>
        <FormTextarea
          id="q5"
          name="q5"
          placeholder="Describe the Exam..."
          rows={4}
          defaultValue={exam?.q5 || ''}
          disabled={isPending}
          aria-describedby="q5-error"
          className={state?.errors?.q5 ? 'border-red-500' : ''}
        />
        {state?.errors?.q5 && (
          <p id="q5-error" className="text-sm text-red-500">
            {state.errors.q5[0]}
          </p>
        )}
      </FormGroup>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormGroup>
          <FormLabel htmlFor="status">Status</FormLabel>
          <FormSelect
            id="status"
            name="status"
            defaultValue={exam?.status || 'backlog'}
            options={statusOptions}
            disabled={isPending}
            required
            aria-describedby="status-error"
            className={state?.errors?.status ? 'border-red-500' : ''}
          />
          {state?.errors?.status && (
            <p id="status-error" className="text-sm text-red-500">
              {state.errors.status[0]}
            </p>
          )}
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="type">Type</FormLabel>
          <FormSelect
            id="type"
            name="type"
            defaultValue={exam?.type || 'test'}
            options={typeOptions}
            disabled={isPending}
            required
            aria-describedby="type-error"
            className={state?.errors?.type ? 'border-red-500' : ''}
          />
          {state?.errors?.type && (
            <p id="type-error" className="text-sm text-red-500">
              {state.errors.type[0]}
            </p>
          )}
        </FormGroup>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button type="submit" isLoading={isPending}>
          {isEditing ? 'Update Exam' : 'Create Exam'}
        </Button>
      </div>
    </Form>
  )
}
