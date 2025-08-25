import { redirect } from 'next/navigation'
import JournalForm from './ExamForm'
import { getCurrentUser } from '@/lib/dal'

const NewJournal = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/signin')
  }

  return <JournalForm userId={user.id} />
}

export default NewJournal
