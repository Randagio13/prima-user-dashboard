import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { describe, expect, it } from "vitest"
import { SearchBar } from "../SearchBar"

function Wrapper() {
  const [value, setValue] = useState("")
  return (
    <SearchBar value={value} onChange={setValue} placeholder="Search users" />
  )
}

describe("SearchBar", () => {
  it("renders with placeholder and allows typing", async () => {
    const user = userEvent.setup()
    render(<Wrapper />)

    const input = screen.getByRole("textbox", { name: /search users/i })
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute("placeholder", "Search users")

    await user.type(input, "Alice")
    expect(input).toHaveValue("Alice")
  })

  it("calls onChange with typed value", async () => {
    const user = userEvent.setup()

    const handleChange = vi.fn()
    render(
      <SearchBar value="" onChange={handleChange} placeholder="Search users" />,
    )

    const input = screen.getByRole("textbox", { name: /search users/i })
    await user.type(input, "Bob")

    // Should have been called once per character with each typed char
    expect(handleChange).toHaveBeenCalledTimes(3)
    expect(handleChange).toHaveBeenNthCalledWith(1, "B")
    expect(handleChange).toHaveBeenNthCalledWith(2, "o")
    expect(handleChange).toHaveBeenNthCalledWith(3, "b")
  })

  it("focuses the input when Cmd+K is pressed", async () => {
    render(<Wrapper />)

    const input = screen.getByRole("textbox", { name: /search users/i })
    expect(input).not.toHaveFocus()

    fireEvent.keyDown(window, { key: "k", metaKey: true })
    expect(input).toHaveFocus()
  })

  it("also focuses the input when Ctrl+K is pressed", async () => {
    render(<Wrapper />)

    const input = screen.getByRole("textbox", { name: /search users/i })
    expect(input).not.toHaveFocus()

    fireEvent.keyDown(window, { key: "k", ctrlKey: true })
    expect(input).toHaveFocus()
  })
})
