interface BadgeProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  opacity?: boolean
}

export function Badge({
  children,
  className = "cursor-pointer inline-flex items-center rounded-full bg-indigo-500 px-2.5 py-0.5 text-xs font-medium text-gray-200 dark:bg-gray-900/70 dark:text-indigo-200",
  opacity,
  ...props
}: BadgeProps) {
  console.log(
    "Rendering Badge with children:",
    children,
    className,
    opacity,
    props,
  )
  const opacityClass = opacity ? "opacity-50" : "opacity-100"
  return (
    <button
      type="button"
      className={`${className} ${opacityClass} ${opacityClass}`}
      tabIndex={0}
      aria-label={typeof children === "string" ? children : "Badge"}
      {...props}
    >
      {children}
    </button>
  )
}
