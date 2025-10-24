import type { User } from "@shared/api"
import { Badge } from "@/components/ui/badge"

interface UserListItemProps {
  user: User
  isSelected: boolean
  onClick: (user: User) => void
}

export function UserListItem({ user, isSelected, onClick }: UserListItemProps) {
  const roleColors = {
    Admin: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    Editor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    Viewer: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  }

  const statusColors = {
    Active: "text-green-600 dark:text-green-400",
    Inactive: "text-red-600 dark:text-red-400",
  }

  return (
    <button
      type="button"
      onClick={() => onClick(user)}
      className="cursor-pointer w-full p-4 border rounded-lg transition-all duration-200 text-left hover:shadow-md hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label={`Select ${user.name}`}
      role="option"
      aria-selected={isSelected}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">
            {user.name}
          </h3>
          <p className="text-sm text-muted-foreground truncate">{user.email}</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            <Badge
              className={`text-xs rounded-md p-1 ${roleColors[user.role]}`}
            >
              {user.role}
            </Badge>
            <div
              className={`text-xs rounded-md p-1 ${statusColors[user.status]}`}
            >
              {user.status}
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}
