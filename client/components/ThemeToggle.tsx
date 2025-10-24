import { Moon, Sun } from "lucide-react"
import { useTheme } from "./ThemeProvider"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  return (
    <div className="flex gap-1">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm">
          <Sun
            className={`size-5 transition-opacity duration-200 ease-in-out cursor-pointer ${
              theme === "light" ? "opacity-100" : "opacity-50"
            }`}
            onClick={() => setTheme("light")}
          />
        </div>
        <div className="group relative inline-flex w-11 shrink-0 rounded-full bg-gray-200 p-0.5 inset-ring inset-ring-gray-900/5 outline-offset-2 outline-indigo-600 transition-colors duration-200 ease-in-out has-checked:bg-indigo-600 has-focus-visible:outline-2">
          <span className="size-5 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-5" />
          <input
            name="setting"
            type="checkbox"
            aria-label="Change theme"
            aria-describedby="theme-toggle-description"
            role="switch"
            aria-checked={resolvedTheme === "dark"}
            className="absolute inset-0 appearance-none focus:outline-hidden cursor-pointer"
            checked={resolvedTheme === "dark"}
            onChange={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          />
        </div>

        <div className="text-sm">
          <Moon
            className={`size-5 transition-opacity duration-200 ease-in-out cursor-pointer ${
              theme === "dark" ? "opacity-100" : "opacity-50"
            }`}
            onClick={() => setTheme("dark")}
          />
        </div>
      </div>
    </div>
  )
}
