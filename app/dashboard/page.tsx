import { getCurrentUser, getJournals } from '@/lib/dal'
import Link from 'next/link'
import Button from '../components/ui/Button'
import { PlusIcon } from 'lucide-react'
import Badge from '../components/ui/Badge'
import { formatRelativeTime } from '@/lib/utils'
import { Mood, Status } from '@/lib/types'
import { JOURNAL_STATUS, JOURNAL_MOOD } from '@/db/schema'

export default async function DashboardPage() {
  await getCurrentUser()
  const journals = await getJournals()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Journals</h1>
        <Link href="/journals/new">
          <Button>
            <span className="flex items-center">
              <PlusIcon size={18} className="mr-2" />
              New Journal
            </span>
          </Button>
        </Link>
      </div>

      {journals.length > 0 ? (
        <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-high shadow-sm">
          {/* Header row */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-dark-elevated border-b border-gray-200 dark:border-dark-border-default">
            <div className="col-span-5">Sleep hours</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Mood</div>
            <div className="col-span-3">Created</div>
          </div>

          {/* Issue rows */}
          <div className="divide-y divide-gray-200 dark:divide-dark-border-default">
            {journals.map((journal) => (
              <Link
                key={journal.id}
                href={`/journals/${journal.id}`}
                className="block hover:bg-gray-50 dark:hover:bg-dark-elevated transition-colors"
              >
                <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                  <div className="col-span-5 font-medium truncate">
                    {journal.sleepHours}
                  </div>
                  <div className="col-span-2">
                    <Badge status={journal.status as Status}>
                      {JOURNAL_STATUS[journal.status as Status].label}
                    </Badge>
                  </div>
                  <div className="col-span-2">
                    <Badge mood={journal.mood as Mood}>
                      {JOURNAL_MOOD[journal.mood as Mood].label}
                    </Badge>
                  </div>
                  <div className="col-span-3 text-sm text-gray-500 dark:text-gray-400">
                    {formatRelativeTime(new Date(journal.createdAt))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center border border-gray-200 dark:border-dark-border-default rounded-lg bg-white dark:bg-dark-high p-8">
          <h3 className="text-lg font-medium mb-2">No journals found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Get started by creating your first journal.
          </p>
          <Link href="journals/new">
            <Button>
              <span className="flex items-center">
                <PlusIcon size={18} className="mr-2" />
                Create Journal
              </span>
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
