import { cn } from '@/lib/utils'
import Link from 'next/link'

interface NavLinkProps {
  href: string
  icon: React.ReactNode
  label: string
  isActive?: boolean
}

export default function NavLink({ href, icon, label, isActive }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center px-2 py-2 text-sm font-medium rounded-md group',
        isActive
          ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-200'
          : 'text-[#C5C6C7]-700 hover:bg-[#C5C6C7]-100 dark:text-[#C5C6C7]-300 dark:hover:bg-[#C5C6C7]-800'
      )}
    >
      <span className="text-[#C5C6C7]-500 dark:text-[#C5C6C7]-400 mr-3">{icon}</span>
      <span className="hidden md:inline">{label}</span>
    </Link>
  )
}
