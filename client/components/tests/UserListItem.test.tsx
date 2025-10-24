import type { User } from "@shared/api"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { UserListItem } from "../UserListItem"

describe("UserListItem", () => {
  const mockUser: User = {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "Active",
    profilePicture: "https://example.com/avatar.jpg",
  }

  const defaultProps = {
    user: mockUser,
    isSelected: false,
    onClick: vi.fn(),
  }

  it("renders user name and email", () => {
    render(<UserListItem {...defaultProps} />)

    expect(screen.getByText("John Doe")).toBeInTheDocument()
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument()
  })

  it("renders user role as a badge", () => {
    render(<UserListItem {...defaultProps} />)

    const roleBadge = screen.getByRole("button", { name: "Admin" })
    expect(roleBadge).toBeInTheDocument()
  })

  it("renders user status", () => {
    render(<UserListItem {...defaultProps} />)

    expect(screen.getByText("Active")).toBeInTheDocument()
  })

  it("applies correct role colors for Admin", () => {
    render(<UserListItem {...defaultProps} />)

    const roleBadge = screen.getByRole("button", { name: "Admin" })
    expect(roleBadge).toHaveClass("bg-red-100")
    expect(roleBadge).toHaveClass("text-red-800")
  })

  it("applies correct role colors for Editor", () => {
    const editorUser: User = { ...mockUser, role: "Editor" }
    render(<UserListItem {...defaultProps} user={editorUser} />)

    const roleBadge = screen.getByRole("button", { name: "Editor" })
    expect(roleBadge).toHaveClass("bg-blue-100")
    expect(roleBadge).toHaveClass("text-blue-800")
  })

  it("applies correct role colors for Viewer", () => {
    const viewerUser: User = { ...mockUser, role: "Viewer" }
    render(<UserListItem {...defaultProps} user={viewerUser} />)

    const roleBadge = screen.getByRole("button", { name: "Viewer" })
    expect(roleBadge).toHaveClass("bg-gray-100")
    expect(roleBadge).toHaveClass("text-gray-800")
  })

  it("applies correct status color for Active", () => {
    render(<UserListItem {...defaultProps} />)

    const statusElement = screen.getByText("Active")
    expect(statusElement).toHaveClass("text-green-600")
  })

  it("applies correct status color for Inactive", () => {
    const inactiveUser: User = { ...mockUser, status: "Inactive" }
    render(<UserListItem {...defaultProps} user={inactiveUser} />)

    const statusElement = screen.getByText("Inactive")
    expect(statusElement).toHaveClass("text-red-600")
  })

  it("calls onClick with user when clicked", async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(<UserListItem {...defaultProps} onClick={handleClick} />)

    const button = screen.getByRole("option", { name: "Select John Doe" })
    await user.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
    expect(handleClick).toHaveBeenCalledWith(mockUser)
  })

  it("sets aria-selected to false when not selected", () => {
    render(<UserListItem {...defaultProps} isSelected={false} />)

    const button = screen.getByRole("option", { name: "Select John Doe" })
    expect(button).toHaveAttribute("aria-selected", "false")
  })

  it("sets aria-selected to true when selected", () => {
    render(<UserListItem {...defaultProps} isSelected={true} />)

    const button = screen.getByRole("option", { name: "Select John Doe" })
    expect(button).toHaveAttribute("aria-selected", "true")
  })

  it("has correct accessibility role", () => {
    render(<UserListItem {...defaultProps} />)

    const button = screen.getByRole("option")
    expect(button).toBeInTheDocument()
  })

  it("has correct aria-label", () => {
    render(<UserListItem {...defaultProps} />)

    const button = screen.getByRole("option", { name: "Select John Doe" })
    expect(button).toBeInTheDocument()
  })

  it("truncates long names", () => {
    const longNameUser: User = {
      ...mockUser,
      name: "Very Long Name That Should Be Truncated",
    }
    render(<UserListItem {...defaultProps} user={longNameUser} />)

    const nameElement = screen.getByText(
      "Very Long Name That Should Be Truncated",
    )
    expect(nameElement).toHaveClass("truncate")
  })

  it("truncates long emails", () => {
    const longEmailUser: User = {
      ...mockUser,
      email: "very.long.email.address@verylongdomainname.com",
    }
    render(<UserListItem {...defaultProps} user={longEmailUser} />)

    const emailElement = screen.getByText(
      "very.long.email.address@verylongdomainname.com",
    )
    expect(emailElement).toHaveClass("truncate")
  })

  it("is keyboard accessible", async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(<UserListItem {...defaultProps} onClick={handleClick} />)

    const button = screen.getByRole("option", { name: "Select John Doe" })
    button.focus()
    expect(button).toHaveFocus()

    await user.keyboard("{Enter}")
    expect(handleClick).toHaveBeenCalledWith(mockUser)
  })
})
