import Link from 'next/link'
import { Timestamp } from '../components/Timestamp'
import Button from '../components/ui/Button'

export default async function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-stone-900 dark:text-white tracking-tight">
              Exam tracking <br className="hidden sm:block" />
              <span className="text-cyan-600 dark:text-cyan-400">
                simplified.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-stone-600 dark:text-stone-300">
              A minimal and elegant tests and exams tracking tool for Insight Arabic. Manage
              your exercises with ease.
            </p>
            <div className="mt-10">
              <Link href="/signup">
                <Button size="lg">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-stone-200 dark:border-dark-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center text-sm text-stone-500 dark:text-stone-400">
            <p>
              © <Timestamp /> Insight. Built for Insight Arabic Academy.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
