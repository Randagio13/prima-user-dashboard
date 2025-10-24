import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it } from "vitest"
import { ThemeProvider } from "../ThemeProvider"
import { ThemeToggle } from "../ThemeToggle"

// Helper to render with provider
function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>)
}

describe("ThemeToggle", () => {
  beforeEach(() => {
    // ensure clean DOM and storage before each test
    document.documentElement.classList.remove("dark")
    window.localStorage.clear()
  })

  it("throws when used outside of ThemeProvider", () => {
    // The hook in ThemeToggle should throw if not wrapped
    expect(() => render(<ThemeToggle />)).toThrowError(
      "useTheme must be used within ThemeProvider",
    )
  })

  it("renders switch and toggles dark mode", async () => {
    const user = userEvent.setup()
    renderWithTheme(<ThemeToggle />)

    const switchEl = screen.getByRole("switch", { name: /change theme/i })

    // default should be light according to matchMedia polyfill in setup
    expect(switchEl).toHaveAttribute("aria-checked", "false")
    expect(document.documentElement).not.toHaveClass("dark")

    // toggle to dark
    await user.click(switchEl)

    expect(switchEl).toHaveAttribute("aria-checked", "true")
    expect(document.documentElement).toHaveClass("dark")
    expect(window.localStorage.getItem("theme")).toBe("dark")

    // toggle back to light
    await user.click(switchEl)

    expect(switchEl).toHaveAttribute("aria-checked", "false")
    expect(document.documentElement).not.toHaveClass("dark")
    expect(window.localStorage.getItem("theme")).toBe("light")
  })
})
