import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { Badge } from "../Badge"

describe("Badge", () => {
  it("renders children text", () => {
    render(<Badge>Active</Badge>)

    const badge = screen.getByText("Active")
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveTextContent("Active")
  })

  it("applies opacity-50 when opacity prop is true", () => {
    render(<Badge opacity={true}>Faded</Badge>)

    const badge = screen.getByText("Faded")
    expect(badge).toHaveClass("opacity-50")
  })

  it("applies opacity-100 when opacity prop is false or omitted", () => {
    const { rerender } = render(<Badge opacity={false}>Normal</Badge>)

    let badge = screen.getByText("Normal")
    expect(badge).toHaveClass("opacity-100")

    rerender(<Badge>Default</Badge>)
    badge = screen.getByText("Default")
    expect(badge).toHaveClass("opacity-100")
  })

  it("includes default classes", () => {
    render(<Badge>Styled</Badge>)

    const badge = screen.getByText("Styled")
    expect(badge).toHaveClass("inline-flex")
    expect(badge).toHaveClass("rounded-full")
  })

  it("handles click events", async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(<Badge onClick={handleClick}>Clickable</Badge>)

    const badge = screen.getByText("Clickable")
    await user.click(badge)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("forwards additional props", () => {
    render(<Badge data-testid="badge-element">Test</Badge>)

    const badge = screen.getByTestId("badge-element")
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveTextContent("Test")
  })

  it("renders with complex children", () => {
    render(
      <Badge>
        <span>Icon</span>
      </Badge>,
    )

    const badge = screen.getByText("Icon")
    expect(badge.parentElement).toHaveClass("inline-flex")
  })
})
