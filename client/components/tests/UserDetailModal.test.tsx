import type { User } from "@shared/api"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { UserDetailModal } from "../UserDetailModal"

describe("UserDetailModal", () => {
  const mockUser: User = {
    id: "123",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    role: "Admin",
    status: "Active",
    profilePicture: "https://example.com/jane.jpg",
  }

  const defaultProps = {
    user: mockUser,
    isOpen: true,
    onClose: vi.fn(),
  }

  it("renders nothing when user is null", () => {
    const { container } = render(
      <UserDetailModal user={null} isOpen={true} onClose={vi.fn()} />,
    )

    expect(container.firstChild).toBeNull()
  })

  it("renders nothing when user is null even if isOpen is true", () => {
    render(<UserDetailModal user={null} isOpen={true} onClose={vi.fn()} />)

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("renders user profile picture", () => {
    render(<UserDetailModal {...defaultProps} />)

    const img = screen.getByRole("img", { name: "Jane Doe" })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute("src", "https://example.com/jane.jpg")
  })

  it("renders user name", () => {
    render(<UserDetailModal {...defaultProps} />)

    expect(screen.getByText("Jane Doe")).toBeInTheDocument()
  })

  it("renders user email twice (header and detail section)", () => {
    render(<UserDetailModal {...defaultProps} />)

    const emails = screen.getAllByText("jane.doe@example.com")
    expect(emails).toHaveLength(2)
  })

  it("renders user role with correct badge", () => {
    render(<UserDetailModal {...defaultProps} />)

    const roleBadges = screen.getAllByText("Admin")
    expect(roleBadges.length).toBeGreaterThan(0)
  })

  it("renders user status with correct badge", () => {
    render(<UserDetailModal {...defaultProps} />)

    const statusBadges = screen.getAllByText("Active")
    expect(statusBadges.length).toBeGreaterThan(0)
  })

  it("renders user ID", () => {
    render(<UserDetailModal {...defaultProps} />)

    expect(screen.getByText("123")).toBeInTheDocument()
  })

  it("applies correct role colors for Admin", () => {
    render(<UserDetailModal {...defaultProps} />)

    const roleBadges = screen.getAllByText("Admin")
    const firstBadge = roleBadges[0]
    expect(firstBadge).toHaveClass("bg-red-100")
    expect(firstBadge).toHaveClass("text-red-800")
  })

  it("applies correct role colors for Editor", () => {
    const editorUser: User = { ...mockUser, role: "Editor" }
    render(<UserDetailModal {...defaultProps} user={editorUser} />)

    const roleBadges = screen.getAllByText("Editor")
    const firstBadge = roleBadges[0]
    expect(firstBadge).toHaveClass("bg-blue-100")
    expect(firstBadge).toHaveClass("text-blue-800")
  })

  it("applies correct role colors for Viewer", () => {
    const viewerUser: User = { ...mockUser, role: "Viewer" }
    render(<UserDetailModal {...defaultProps} user={viewerUser} />)

    const roleBadges = screen.getAllByText("Viewer")
    const firstBadge = roleBadges[0]
    expect(firstBadge).toHaveClass("bg-gray-100")
    expect(firstBadge).toHaveClass("text-gray-800")
  })

  it("applies correct status colors for Active", () => {
    render(<UserDetailModal {...defaultProps} />)

    const statusBadges = screen.getAllByText("Active")
    const firstBadge = statusBadges[0]
    expect(firstBadge).toHaveClass("bg-green-100")
    expect(firstBadge).toHaveClass("text-green-800")
  })

  it("applies correct status colors for Inactive", () => {
    const inactiveUser: User = { ...mockUser, status: "Inactive" }
    render(<UserDetailModal {...defaultProps} user={inactiveUser} />)

    const statusBadges = screen.getAllByText("Inactive")
    const firstBadge = statusBadges[0]
    expect(firstBadge).toHaveClass("bg-red-100")
    expect(firstBadge).toHaveClass("text-red-800")
  })

  it("renders close button with correct text", () => {
    render(<UserDetailModal {...defaultProps} />)

    expect(
      screen.getByRole("button", { name: "Go back to dashboard" }),
    ).toBeInTheDocument()
  })

  it("calls onClose when close button is clicked", async () => {
    const handleClose = vi.fn()
    const user = userEvent.setup()
    render(<UserDetailModal {...defaultProps} onClose={handleClose} />)

    const closeButton = screen.getByRole("button", {
      name: "Go back to dashboard",
    })
    await user.click(closeButton)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it("renders all detail sections with labels", () => {
    render(<UserDetailModal {...defaultProps} />)

    expect(screen.getByText("Role")).toBeInTheDocument()
    expect(screen.getByText("Status")).toBeInTheDocument()
    expect(screen.getByText("Email")).toBeInTheDocument()
    expect(screen.getByText("User ID")).toBeInTheDocument()
  })

  it("displays modal when isOpen is true", () => {
    render(<UserDetailModal {...defaultProps} isOpen={true} />)

    expect(screen.getByRole("dialog")).toBeInTheDocument()
  })

  it("hides modal when isOpen is false", () => {
    render(<UserDetailModal {...defaultProps} isOpen={false} />)

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("renders with long email addresses", () => {
    const longEmailUser: User = {
      ...mockUser,
      email: "verylongemailaddress@verylongdomainname.example.com",
    }
    render(<UserDetailModal {...defaultProps} user={longEmailUser} />)

    const emails = screen.getAllByText(
      "verylongemailaddress@verylongdomainname.example.com",
    )
    expect(emails).toHaveLength(2)
  })

  it("renders with long user names", () => {
    const longNameUser: User = {
      ...mockUser,
      name: "Very Long User Name That Should Still Display Correctly",
    }
    render(<UserDetailModal {...defaultProps} user={longNameUser} />)

    expect(
      screen.getByText(
        "Very Long User Name That Should Still Display Correctly",
      ),
    ).toBeInTheDocument()
  })

  it("renders with long user IDs", () => {
    const longIdUser: User = {
      ...mockUser,
      id: "very-long-user-id-12345678901234567890",
    }
    render(<UserDetailModal {...defaultProps} user={longIdUser} />)

    expect(
      screen.getByText("very-long-user-id-12345678901234567890"),
    ).toBeInTheDocument()
  })
})
