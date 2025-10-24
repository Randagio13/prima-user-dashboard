import type { User } from "@shared/api"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { UserList } from "../UserList"

describe("UserList", () => {
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
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "Viewer",
      status: "Inactive",
      profilePicture: "https://example.com/charlie.jpg",
    },
  ]

  const defaultProps = {
    users: mockUsers,
    selectedUser: null,
    onSelectUser: vi.fn(),
    isLoading: false,
    error: null,
  }

  describe("loading state", () => {
    it("renders skeleton loaders when loading", () => {
      render(<UserList {...defaultProps} isLoading={true} />)

      const skeletons = screen
        .getAllByRole("generic")
        .filter((el) => el.className.includes("animate-pulse"))
      expect(skeletons).toHaveLength(5)
    })

    it("does not render user list when loading", () => {
      render(<UserList {...defaultProps} isLoading={true} />)

      expect(screen.queryByText("Alice Johnson")).not.toBeInTheDocument()
    })
  })

  describe("error state", () => {
    it("renders error message when error exists", () => {
      const error = new Error("Failed to fetch users")
      render(<UserList {...defaultProps} error={error} />)

      expect(screen.getByText("Error loading users")).toBeInTheDocument()
      expect(screen.getByText("Failed to fetch users")).toBeInTheDocument()
    })

    it("does not render user list when error exists", () => {
      const error = new Error("Network error")
      render(<UserList {...defaultProps} error={error} />)

      expect(screen.queryByText("Alice Johnson")).not.toBeInTheDocument()
    })
  })

  describe("empty state", () => {
    it("renders empty message when no users", () => {
      render(<UserList {...defaultProps} users={[]} />)

      expect(
        screen.getByText("No users found matching your criteria."),
      ).toBeInTheDocument()
    })

    it("does not render empty message when users exist", () => {
      render(<UserList {...defaultProps} />)

      expect(
        screen.queryByText("No users found matching your criteria."),
      ).not.toBeInTheDocument()
    })
  })

  describe("user list rendering", () => {
    it("renders all users when provided", () => {
      render(<UserList {...defaultProps} />)

      expect(screen.getByText("Alice Johnson")).toBeInTheDocument()
      expect(screen.getByText("Bob Smith")).toBeInTheDocument()
      expect(screen.getByText("Charlie Brown")).toBeInTheDocument()
    })

    it("renders correct number of user items", () => {
      render(<UserList {...defaultProps} />)

      const userOptions = screen.getAllByRole("option")
      expect(userOptions).toHaveLength(3)
    })

    it("passes correct isSelected prop when user is selected", () => {
      render(<UserList {...defaultProps} selectedUser={mockUsers[0]} />)

      const selectedButton = screen.getByRole("option", {
        name: "Select Alice Johnson",
      })
      expect(selectedButton).toHaveAttribute("aria-selected", "true")
    })

    it("passes correct isSelected prop when user is not selected", () => {
      render(<UserList {...defaultProps} selectedUser={mockUsers[0]} />)

      const notSelectedButton = screen.getByRole("option", {
        name: "Select Bob Smith",
      })
      expect(notSelectedButton).toHaveAttribute("aria-selected", "false")
    })

    it("passes correct isSelected prop when no user is selected", () => {
      render(<UserList {...defaultProps} selectedUser={null} />)

      const userOptions = screen.getAllByRole("option")
      userOptions.forEach((option) => {
        expect(option).toHaveAttribute("aria-selected", "false")
      })
    })
  })

  describe("user interactions", () => {
    it("calls onSelectUser when a user is clicked", async () => {
      const handleSelectUser = vi.fn()
      const user = userEvent.setup()
      render(<UserList {...defaultProps} onSelectUser={handleSelectUser} />)

      const aliceButton = screen.getByRole("option", {
        name: "Select Alice Johnson",
      })
      await user.click(aliceButton)

      expect(handleSelectUser).toHaveBeenCalledTimes(1)
      expect(handleSelectUser).toHaveBeenCalledWith(mockUsers[0])
    })

    it("calls onSelectUser with correct user for each click", async () => {
      const handleSelectUser = vi.fn()
      const user = userEvent.setup()
      render(<UserList {...defaultProps} onSelectUser={handleSelectUser} />)

      const bobButton = screen.getByRole("option", {
        name: "Select Bob Smith",
      })
      await user.click(bobButton)

      expect(handleSelectUser).toHaveBeenCalledWith(mockUsers[1])
    })
  })

  describe("priority rendering", () => {
    it("prioritizes loading over error", () => {
      const error = new Error("Some error")
      render(<UserList {...defaultProps} isLoading={true} error={error} />)

      expect(screen.queryByText("Error loading users")).not.toBeInTheDocument()
      const skeletons = screen
        .getAllByRole("generic")
        .filter((el) => el.className.includes("animate-pulse"))
      expect(skeletons).toHaveLength(5)
    })

    it("prioritizes error over empty state", () => {
      const error = new Error("Some error")
      render(<UserList {...defaultProps} users={[]} error={error} />)

      expect(screen.getByText("Error loading users")).toBeInTheDocument()
      expect(
        screen.queryByText("No users found matching your criteria."),
      ).not.toBeInTheDocument()
    })

    it("shows empty state only when no loading, no error, and no users", () => {
      render(
        <UserList
          {...defaultProps}
          users={[]}
          isLoading={false}
          error={null}
        />,
      )

      expect(
        screen.getByText("No users found matching your criteria."),
      ).toBeInTheDocument()
    })
  })

  describe("single user", () => {
    it("renders correctly with single user", () => {
      render(<UserList {...defaultProps} users={[mockUsers[0]]} />)

      expect(screen.getByText("Alice Johnson")).toBeInTheDocument()
      expect(screen.getAllByRole("option")).toHaveLength(1)
    })
  })
})
