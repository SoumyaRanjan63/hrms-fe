import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: ReactNode
  className?: string
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 border-transparent',
  secondary:
    'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400 border-transparent',
  outline:
    'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-400 border-transparent',
  danger:
    'border border-red-200 bg-white text-red-700 hover:bg-red-50 focus:ring-red-500',
}

export function Button({
  variant = 'primary',
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition-colors'
  const variantClass = variantClasses[variant]
  return (
    <button
      type="button"
      className={`${base} ${variantClass} ${className}`.trim()}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
