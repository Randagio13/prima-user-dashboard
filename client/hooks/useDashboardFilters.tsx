import type { User } from "@shared/api"
import { useMemo, useState } from "react"

export function useDashboardFilters(users: User[]) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState("")

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRole = !selectedRole || user.role === selectedRole
      return matchesSearch && matchesRole
    })
  }, [users, searchQuery, selectedRole])

  return {
    searchQuery,
    setSearchQuery,
    selectedRole,
    setSelectedRole,
    filteredUsers,
  }
}
