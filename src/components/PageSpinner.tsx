export interface PageSpinnerProps {
  label?: string
  className?: string
}

export default function PageSpinner({
  label = 'Đang tải',
  className = '',
}: PageSpinnerProps) {
  return (
    <div
      className={`flex flex-col items-center gap-3 ${className}`.trim()}
      role="status"
      aria-live="polite"
    >
      <div
        className="h-10 w-10 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin"
        aria-hidden
      />
      {label ? (
        <p className="text-sm text-gray-500">{label}</p>
      ) : null}
    </div>
  )
}
