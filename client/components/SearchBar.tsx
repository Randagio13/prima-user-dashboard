import { Search } from "lucide-react"
import { useEffect, useRef } from "react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search by name...",
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Support macOS Command+K (meta) and Windows/Linux Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <div>
      <div className="mt-2 relative">
        <Search className="absolute left-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <div className="ml-7 flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 dark:bg-white/5 dark:outline-1 dark:-outline-offset-1 dark:outline-white/10 dark:focus-within:outline-indigo-500">
          <input
            name="search-users"
            type="text"
            aria-label="Search users"
            className="block min-w-0 grow bg-transparent px-3 py-1.5 text-base text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
            aria-describedby="search-shortcut"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            ref={inputRef}
          />
          <div className="flex py-1.5 pr-1.5">
            <kbd className="inline-flex items-center rounded-sm border border-gray-300 px-1 font-sans text-xs text-gray-400 dark:border-white/10">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>
    </div>
  )
}
