import type { User } from "@shared/api"
import { UserListItem } from "./UserListItem"

interface UserListProps {
  users: User[]
  selectedUser: User | null
  onSelectUser: (user: User) => void
  isLoading: boolean
  error: Error | null
}

export function UserList({
  users,
  selectedUser,
  onSelectUser,
  isLoading,
  error,
}: UserListProps) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={`skeleton-${i}`}
            className="h-24 bg-card border border-border rounded-lg animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-destructive/10 border border-destructive text-destructive rounded-lg">
        <p className="font-medium">Error loading users</p>
        <p className="text-sm mt-1">{error.message}</p>
      </div>
    )
  }

  if (users.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">
          No users found matching your criteria.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {users.map((user) => (
        <UserListItem
          key={user.id}
          user={user}
          isSelected={selectedUser?.id === user.id}
          onClick={onSelectUser}
        />
      ))}
    </div>
  )
}
