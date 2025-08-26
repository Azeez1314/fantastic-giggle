import { getJournal } from '@/lib/dal'
import { formatRelativeTime } from '@/lib/utils'
import { Mood, Status } from '@/lib/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Badge from '@/app/components/ui/Badge'
import Button from '@/app/components/ui/Button'
import { ArrowLeftIcon, Edit2Icon } from 'lucide-react'
import DeleteJournalButton from '../../components/DeleteJournalButton'

export default async function JournalPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const journal = await getJournal(parseInt(id))

  if (!journal) {
    notFound()
  }

  const { sleepHours, note, goal, status, mood, createdAt, updatedAt, user } =
    journal

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'backlog':
        return 'Backlog'
      case 'todo':
        return 'Todo'
      case 'in_progress':
        return 'In Progress'
      case 'done':
        return 'Done'
      default:
        return status
    }
  }

  const getMoodLabel = (mood: string) => {
    switch (mood) {
      case 'happy':
        return 'Happy'
      case 'sad':
        return 'Sad'
      case 'stressed':
        return 'Stressed'
      case 'calm':
        return 'Calm'
      default:
        return mood
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 mb-4"
        >
          <ArrowLeftIcon size={16} className="mr-1" />
          Back to Journals
        </Link>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold">{sleepHours}</h1>
          <div className="flex items-center space-x-2">
            <Link href={`/journals/${id}/edit`}>
              <Button variant="outline" size="sm">
                <span className="flex items-center">
                  <Edit2Icon size={16} className="mr-1" />
                  Edit
                </span>
              </Button>
            </Link>
            <DeleteJournalButton id={parseInt(id)} />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-dark-elevated border border-gray-200 dark:border-dark-border-default rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-wrap gap-3 mb-6">
          <Badge status={status as Status}>{getStatusLabel(status)}</Badge>
          <Badge mood={mood as Mood}>
            {getMoodLabel(mood)}
          </Badge>
          <div className="text-sm text-gray-500">
            Created {formatRelativeTime(new Date(createdAt))}
          </div>
          {updatedAt !== createdAt && (
            <div className="text-sm text-gray-500">
              Updated {formatRelativeTime(new Date(updatedAt))}
            </div>
          )}
        </div>

        {note ? (
          <div className="prose dark:prose-invert max-w-none">
            <p className="whitespace-pre-line">{note}</p>
          </div>
        ) : (
          <p className="text-gray-500 italic">No notes or thoughts provided.</p>
        )}
        {goal ? (
          <div className="prose dark:prose-invert max-w-none">
            <p className="whitespace-pre-line">{goal}</p>
          </div>
        ) : (
          <p className="text-gray-500 italic">No goals provided.</p>
        )}
      </div>

      <div className="bg-white dark:bg-dark-elevated border border-gray-200 dark:border-dark-border-default rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-2">Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">
              Assigned to
            </p>
            <p>{user.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Status</p>
            <Badge status={status as Status}>{getStatusLabel(status)}</Badge>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Mood</p>
            <Badge mood={mood as Mood}>
              {getMoodLabel(mood)}
            </Badge>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Created</p>
            <p>{formatRelativeTime(new Date(createdAt))}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
