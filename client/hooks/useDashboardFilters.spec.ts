import type { User } from "@shared/api"
import { describe, expect, it } from "vitest"

const mockUsers: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    status: "Active",
    profilePicture: "https://example.com/alice.jpg",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Editor",
    status: "Active",
    profilePicture: "https://example.com/bob.jpg",
  },
  {
    id: "3",
    name: "Carol Williams",
    email: "carol@example.com",
    role: "Viewer",
    status: "Inactive",
    profilePicture: "https://example.com/carol.jpg",
  },
]

describe("useDashboardFilters - Filtering Logic", () => {
  it("returns all users when no filters are applied", () => {
    const searchQuery = ""
    const selectedRole = ""

    const filtered = mockUsers.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRole = !selectedRole || user.role === selectedRole
      return matchesSearch && matchesRole
    })

    expect(filtered).toHaveLength(3)
    expect(filtered).toEqual(mockUsers)
  })

  it("filters users by search query (name)", () => {
    const searchQuery = "Alice"
    const selectedRole = ""

    const filtered = mockUsers.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRole = !selectedRole || user.role === selectedRole
      return matchesSearch && matchesRole
    })

    expect(filtered).toHaveLength(1)
    expect(filtered[0].name).toBe("Alice Johnson")
  })

  it("filters users by search query (email)", () => {
    const searchQuery = "bob@example.com"
    const selectedRole = ""

    const filtered = mockUsers.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRole = !selectedRole || user.role === selectedRole
      return matchesSearch && matchesRole
    })

    expect(filtered).toHaveLength(1)
    expect(filtered[0].email).toBe("bob@example.com")
  })

  it("filters users by role", () => {
    const searchQuery = ""
    const selectedRole = "Admin"

    const filtered = mockUsers.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRole = !selectedRole || user.role === selectedRole
      return matchesSearch && matchesRole
    })

    expect(filtered).toHaveLength(1)
    expect(filtered[0].role).toBe("Admin")
  })

  it("combines search and role filters", () => {
    const searchQuery = "John"
    const selectedRole = "Editor"

    const filtered = mockUsers.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRole = !selectedRole || user.role === selectedRole
      return matchesSearch && matchesRole
    })

    expect(filtered).toHaveLength(0)
  })

  it("handles case-insensitive search", () => {
    const searchQuery = "ALICE"
    const selectedRole = ""

    const filtered = mockUsers.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRole = !selectedRole || user.role === selectedRole
      return matchesSearch && matchesRole
    })

    expect(filtered).toHaveLength(1)
    expect(filtered[0].name).toBe("Alice Johnson")
  })

  it("returns empty array when no matches found", () => {
    const searchQuery = "NonexistentUser"
    const selectedRole = ""

    const filtered = mockUsers.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRole = !selectedRole || user.role === selectedRole
      return matchesSearch && matchesRole
    })

    expect(filtered).toHaveLength(0)
  })

  it("filters by multiple roles correctly", () => {
    for (const role of ["Admin", "Editor", "Viewer"]) {
      const searchQuery = ""
      const selectedRole = role

      const filtered = mockUsers.filter((user) => {
        const matchesSearch =
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesRole = !selectedRole || user.role === selectedRole
        return matchesSearch && matchesRole
      })

      expect(filtered.every((u) => u.role === role)).toBe(true)
    }
  })
})
