import type { ReactNode } from 'react'

interface ErrorStateProps {
  message: string
  onRetry?: () => void
  retryLabel?: string
  action?: ReactNode
}

export function ErrorState({
  message,
  onRetry,
  retryLabel = 'Try again',
  action,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center" role="alert">
      <div className="text-red-500" aria-hidden>
        <svg className="mx-auto h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <p className="text-sm font-medium text-gray-900">Something went wrong</p>
      <p className="max-w-sm text-sm text-gray-600">{message}</p>
      {(onRetry != null || action != null) && (
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {onRetry != null && (
            <button
              type="button"
              onClick={onRetry}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {retryLabel}
            </button>
          )}
          {action}
        </div>
      )}
    </div>
  )
}
