import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { Pagination } from "../Pagination"

describe("Pagination", () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    onPageChange: vi.fn(),
    itemsPerPage: 10,
    totalItems: 50,
  }

  it("renders the correct item range info", () => {
    render(<Pagination {...defaultProps} />)

    expect(
      screen.getByText("Showing 1 to 10 of 50 results"),
    ).toBeInTheDocument()
  })

  it("calculates correct range for middle page", () => {
    render(<Pagination {...defaultProps} currentPage={3} />)

    expect(
      screen.getByText("Showing 21 to 30 of 50 results"),
    ).toBeInTheDocument()
  })

  it("calculates correct range for last page with partial items", () => {
    render(
      <Pagination
        {...defaultProps}
        currentPage={5}
        totalPages={5}
        totalItems={47}
      />,
    )

    expect(
      screen.getByText("Showing 41 to 47 of 47 results"),
    ).toBeInTheDocument()
  })

  it("renders all page number buttons", () => {
    render(<Pagination {...defaultProps} />)

    for (let i = 1; i <= 5; i++) {
      expect(
        screen.getByRole("button", { name: `Go to page ${i}` }),
      ).toBeInTheDocument()
    }
  })

  it("highlights the current page", () => {
    render(<Pagination {...defaultProps} currentPage={3} />)

    const currentPageButton = screen.getByRole("button", {
      name: "Go to page 3",
    })
    expect(currentPageButton).toHaveClass("bg-indigo-500")
    expect(currentPageButton).toHaveAttribute("aria-current", "page")
  })

  it("disables Previous button on first page", () => {
    render(<Pagination {...defaultProps} currentPage={1} />)

    const prevButton = screen.getByRole("button", { name: "Previous page" })
    expect(prevButton).toBeDisabled()
  })

  it("enables Previous button when not on first page", () => {
    render(<Pagination {...defaultProps} currentPage={2} />)

    const prevButton = screen.getByRole("button", { name: "Previous page" })
    expect(prevButton).not.toBeDisabled()
  })

  it("disables Next button on last page", () => {
    render(<Pagination {...defaultProps} currentPage={5} totalPages={5} />)

    const nextButton = screen.getByRole("button", { name: "Next page" })
    expect(nextButton).toBeDisabled()
  })

  it("enables Next button when not on last page", () => {
    render(<Pagination {...defaultProps} currentPage={1} />)

    const nextButton = screen.getByRole("button", { name: "Next page" })
    expect(nextButton).not.toBeDisabled()
  })

  it("calls onPageChange with correct page when clicking Next", async () => {
    const handlePageChange = vi.fn()
    const user = userEvent.setup()
    render(
      <Pagination
        {...defaultProps}
        currentPage={2}
        onPageChange={handlePageChange}
      />,
    )

    const nextButton = screen.getByRole("button", { name: "Next page" })
    await user.click(nextButton)

    expect(handlePageChange).toHaveBeenCalledTimes(1)
    expect(handlePageChange).toHaveBeenCalledWith(3)
  })

  it("calls onPageChange with correct page when clicking Previous", async () => {
    const handlePageChange = vi.fn()
    const user = userEvent.setup()
    render(
      <Pagination
        {...defaultProps}
        currentPage={3}
        onPageChange={handlePageChange}
      />,
    )

    const prevButton = screen.getByRole("button", { name: "Previous page" })
    await user.click(prevButton)

    expect(handlePageChange).toHaveBeenCalledTimes(1)
    expect(handlePageChange).toHaveBeenCalledWith(2)
  })

  it("calls onPageChange when clicking a specific page number", async () => {
    const handlePageChange = vi.fn()
    const user = userEvent.setup()
    render(<Pagination {...defaultProps} onPageChange={handlePageChange} />)

    const page4Button = screen.getByRole("button", { name: "Go to page 4" })
    await user.click(page4Button)

    expect(handlePageChange).toHaveBeenCalledTimes(1)
    expect(handlePageChange).toHaveBeenCalledWith(4)
  })

  it("handles single page correctly", () => {
    render(
      <Pagination
        {...defaultProps}
        currentPage={1}
        totalPages={1}
        totalItems={5}
      />,
    )

    expect(screen.getByText("Showing 1 to 5 of 5 results")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled()
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled()
  })

  it("renders correct number of page buttons based on totalPages", () => {
    const { rerender } = render(<Pagination {...defaultProps} totalPages={3} />)

    expect(screen.getAllByRole("button", { name: /Go to page/ })).toHaveLength(
      3,
    )

    rerender(<Pagination {...defaultProps} totalPages={10} />)
    expect(screen.getAllByRole("button", { name: /Go to page/ })).toHaveLength(
      10,
    )
  })
})
