interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  opacity?: boolean
}

export function Badge({ children, className, opacity, ...props }: BadgeProps) {
  const opacityClass = opacity ? "opacity-50" : "opacity-100"
  const defaultClasses =
    className ??
    "cursor-pointer inline-flex items-center rounded-full bg-indigo-500 px-2.5 py-0.5 text-xs font-medium text-gray-200 dark:bg-gray-900/70 dark:text-indigo-200"
  return (
    <span className={`${defaultClasses} ${opacityClass}`} {...props}>
      {children}
    </span>
  )
}
