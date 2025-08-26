import { redirect } from 'next/navigation'
import ExamForm from './ExamForm'
import { getCurrentUser } from '@/lib/dal'

const NewExam = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/signin')
  }

  return <ExamForm userId={user.id} />
}

export default NewExam
