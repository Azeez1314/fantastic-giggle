import { getJournal } from '@/lib/dal'
import JournalForm from '@/app/components/ExamForm'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
export default async function EditJournalPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const journal = await getJournal(parseInt(id))

  if (!journal) {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <Link
        href={`/journals/${id}`}
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 mb-6"
      >
        <ArrowLeftIcon size={16} className="mr-1" />
        Back to Journal
      </Link>

      <h1 className="text-2xl font-bold mb-6">Edit Journal</h1>

      <div className="bg-white dark:bg-dark-elevated border border-gray-200 dark:border-dark-border-default rounded-lg shadow-sm p-6">
        <JournalForm userId={journal.userId} Journal={journal} isEditing />
      </div>
    </div>
  )
}
