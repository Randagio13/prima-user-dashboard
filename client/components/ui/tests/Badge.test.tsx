import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { Badge } from "../Badge"

describe("Badge", () => {
  it("renders children text", () => {
    render(<Badge>Active</Badge>)

    const badge = screen.getByRole("button", { name: "Active" })
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveTextContent("Active")
  })

  it("applies opacity-50 when opacity prop is true", () => {
    render(<Badge opacity={true}>Faded</Badge>)

    const badge = screen.getByRole("button", { name: "Faded" })
    expect(badge).toHaveClass("opacity-50")
  })

  it("applies opacity-100 when opacity prop is false or omitted", () => {
    const { rerender } = render(<Badge opacity={false}>Normal</Badge>)

    let badge = screen.getByRole("button", { name: "Normal" })
    expect(badge).toHaveClass("opacity-100")

    rerender(<Badge>Default</Badge>)
    badge = screen.getByRole("button", { name: "Default" })
    expect(badge).toHaveClass("opacity-100")
  })

  it("merges custom className with default classes", () => {
    render(<Badge className="custom-class">Styled</Badge>)

    const badge = screen.getByRole("button", { name: "Styled" })
    expect(badge).toHaveClass("custom-class")
    expect(badge).toHaveClass("inline-flex")
    expect(badge).toHaveClass("rounded-full")
  })

  it("handles click events", async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(<Badge onClick={handleClick}>Clickable</Badge>)

    const badge = screen.getByRole("button", { name: "Clickable" })
    await user.click(badge)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("forwards additional button props", () => {
    render(
      <Badge disabled data-testid="badge-element">
        Disabled
      </Badge>,
    )

    const badge = screen.getByTestId("badge-element")
    expect(badge).toBeDisabled()
  })

  it("sets aria-label to 'Badge' when children is not a string", () => {
    render(
      <Badge>
        <span>Icon</span>
      </Badge>,
    )

    const badge = screen.getByRole("button", { name: "Badge" })
    expect(badge).toBeInTheDocument()
  })

  it("is keyboard accessible with tabIndex 0", () => {
    render(<Badge>Accessible</Badge>)

    const badge = screen.getByRole("button", { name: "Accessible" })
    expect(badge).toHaveAttribute("tabIndex", "0")
  })
})
