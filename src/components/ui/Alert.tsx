import type { ReactNode } from 'react'

type AlertVariant = 'error' | 'success' | 'warning' | 'info'

interface AlertProps {
  variant?: AlertVariant
  children: ReactNode
  className?: string
}

const variantClasses: Record<AlertVariant, string> = {
  error: 'border-red-200 bg-red-50 text-red-700',
  success: 'border-green-200 bg-green-50 text-green-700',
  warning: 'border-amber-200 bg-amber-50 text-amber-800',
  info: 'border-blue-200 bg-blue-50 text-blue-700',
}

export function Alert({ variant = 'info', children, className = '' }: AlertProps) {
  return (
    <div
      className={`border px-4 py-3 text-sm ${variantClasses[variant]} ${className}`.trim()}
      role="alert"
    >
      {children}
    </div>
  )
}
