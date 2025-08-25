import { cn } from '@/lib/utils'
import React from 'react'

type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'outline'
  | 'success'
  | 'warning'
  | 'danger'
type StatusType = 'backlog' | 'todo' | 'in_progress' | 'done'
type MoodType = 'happy' | 'sad' | 'stressed' | 'calm'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  status?: StatusType
  mood?: MoodType
}

export default function Badge({
  className,
  variant = 'default',
  children,
  status,
  mood,
  ...props
}: BadgeProps) {
  // Get variant based on status or priority if provided
  const getBadgeVariant = (): BadgeVariant => {
    if (status) {
      switch (status) {
        case 'backlog':
          return 'secondary'
        case 'todo':
          return 'default'
        case 'in_progress':
          return 'warning'
        case 'done':
          return 'success'
        default:
          return 'default'
      }
    }

    if (mood) {
      switch (mood) {
        case 'happy':
          return 'secondary'
        case 'calm':
          return 'default'
        case 'stressed':
          return 'warning'
        case 'sad':
          return 'danger'
        default:
          return 'default'
      }
    }

    return variant
  }

  const variantStyles = {
    default:
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    outline:
      'border border-gray-200 text-gray-800 dark:border-dark-border-medium dark:text-gray-300',
    success:
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    warning:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  }

  const badgeVariant = getBadgeVariant()

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full',
        variantStyles[badgeVariant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
