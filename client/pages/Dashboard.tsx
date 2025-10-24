import type { User, UsersResponse } from "@shared/api"
import { useQuery } from "@tanstack/react-query"
import { Users } from "lucide-react"
import { useMemo, useState } from "react"
import { Pagination } from "@/components/Pagination"
import { RoleFilter } from "@/components/RoleFilter"
import { SearchBar } from "@/components/SearchBar"
import { ThemeToggle } from "@/components/ThemeToggle"
import { UserDetailModal } from "@/components/UserDetailModal"
import { UserList } from "@/components/UserList"
import { useDashboardFilters } from "@/hooks/useDashboardFilters"

const ITEMS_PER_PAGE = 10

async function fetchUsers(): Promise<User[]> {
  const response = await fetch("/api/users")
  if (!response.ok) {
    throw new Error("Failed to fetch users")
  }
  const data: UsersResponse = await response.json()
  return data.users
}

export default function Dashboard() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  })

  const {
    searchQuery,
    setSearchQuery,
    selectedRole,
    setSelectedRole,
    filteredUsers,
  } = useDashboardFilters(users)

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return filteredUsers.slice(startIndex, endIndex)
  }, [filteredUsers, currentPage])

  // Reset to page 1 when filters change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const handleRoleChange = (role: string) => {
    setSelectedRole(role)
    setCurrentPage(1)
  }

  const handleSelectUser = (user: User) => {
    setSelectedUser(user)
    setIsDetailOpen(true)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-indigo-900 text-gray-900 dark:text-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white dark:bg-indigo-900 text-gray-900 dark:text-white dark:border-gray-600 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" />
            <h1 className="text-xl md:text-3xl font-bold text-foreground">
              Prima User Dashboard
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div>
                <h2 className="text-sm font-semibold text-foreground mb-3">
                  Search
                </h2>
                <SearchBar
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search users..."
                />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-foreground mb-3">
                  Filter by Role
                </h2>
                <RoleFilter value={selectedRole} onChange={handleRoleChange} />
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-blue-900 dark:text-blue-100">
                  <span className="font-semibold">{filteredUsers.length}</span>{" "}
                  user{filteredUsers.length !== 1 ? "s" : ""} found
                </p>
              </div>
            </div>
          </div>

          {/* User List */}
          <div className="lg:col-span-3">
            <UserList
              users={paginatedUsers}
              selectedUser={selectedUser}
              onSelectUser={handleSelectUser}
              isLoading={isLoading}
              error={error}
            />

            {!isLoading && !error && filteredUsers.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={ITEMS_PER_PAGE}
                totalItems={filteredUsers.length}
              />
            )}
          </div>
        </div>
      </div>

      {/* User Detail Modal */}
      <UserDetailModal
        user={selectedUser}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false)
          setSelectedUser(null)
        }}
      />

      {/* Footer */}
      <footer className="border-t border-gray-300 dark:border-gray-600 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Prima User Dashboard. Built with React, TypeScript &
              TailwindCSS by Alessandro Casazza.
            </p>
            <div className="flex items-center gap-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
