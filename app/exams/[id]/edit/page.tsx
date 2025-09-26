import { getExam } from '@/lib/dal'
import ExamForm from '@/app/components/ExamForm'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
export default async function EditExamPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const exam = await getExam(parseInt(id))

  if (!exam) {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <Link
        href={`/exams/${id}`}
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 mb-6"
      >
        <ArrowLeftIcon size={16} className="mr-1" />
        Back to Exam
      </Link>

      <h1 className="text-2xl font-bold mb-6">Edit Exam</h1>

      <div className="bg-white dark:bg-dark-elevated border border-gray-200 dark:border-dark-border-default rounded-lg shadow-sm p-6">
        <ExamForm userId={exam.userId} exam={exam} isEditing />
      </div>
    </div>
  )
}
