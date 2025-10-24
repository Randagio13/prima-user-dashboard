import { Search } from "lucide-react"

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
  return (
    <div>
      <div className="mt-2 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <div className="flex rounded-md bg-white/5 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
          <input
            name="search-users"
            type="text"
            aria-label="Search users"
            className="block min-w-0 grow bg-transparent px-3 py-1.5 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
            aria-describedby="search-shortcut"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
          />
          <div className="flex py-1.5 pr-1.5">
            <kbd className="inline-flex items-center rounded-sm border border-white/10 px-1 font-sans text-xs text-gray-400">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>
    </div>
  )
}
