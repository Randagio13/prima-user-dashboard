import { expect, test } from "@playwright/test"

test.describe("Keyboard Shortcuts", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    // Wait for page to load
    await expect(
      page.getByRole("heading", { name: /prima user dashboard/i }),
    ).toBeVisible()
  })

  test("should focus search input when pressing Cmd+K on macOS", async ({
    page,
  }) => {
    const searchInput = page.getByRole("textbox", { name: /search users/i })

    // Wait for input to be visible and ready
    await expect(searchInput).toBeVisible()

    // Click elsewhere to ensure input is not focused
    await page.locator("h1").click()
    await page.waitForTimeout(100)

    // Press Cmd+K (or Meta+K)
    await page.keyboard.press("Meta+k")
    await page.waitForTimeout(100)

    // Search input should now be focused
    await expect(searchInput).toBeFocused()
  })

  test("should focus search input when pressing Ctrl+K", async ({ page }) => {
    const searchInput = page.getByRole("textbox", { name: /search users/i })

    // Wait for input to be visible and ready
    await expect(searchInput).toBeVisible()

    // Click elsewhere to ensure input is not focused
    await page.locator("h1").click()
    await page.waitForTimeout(100)

    // Press Ctrl+K
    await page.keyboard.press("Control+k")
    await page.waitForTimeout(100)

    // Search input should now be focused
    await expect(searchInput).toBeFocused()
  })

  test("should prevent default behavior when pressing Cmd+K", async ({
    page,
  }) => {
    // Press Cmd+K should not open browser search
    await page.keyboard.press("Meta+k")

    // Search input should be focused instead
    const searchInput = page.getByRole("textbox", { name: /search users/i })
    await expect(searchInput).toBeFocused()
  })

  test("should allow typing in search after Cmd+K", async ({ page }) => {
    const searchInput = page.getByRole("textbox", { name: /search users/i })

    // Press Cmd+K to focus
    await page.keyboard.press("Meta+k")

    // Type in search
    await page.keyboard.type("test search")

    // Input should contain the typed text
    await expect(searchInput).toHaveValue("test search")
  })

  test("should work from anywhere on the page", async ({ page }) => {
    const searchInput = page.getByRole("textbox", { name: /search users/i })

    // Click somewhere else on the page
    await page.locator("h1").click()

    // Press Ctrl+K
    await page.keyboard.press("Control+k")

    // Search should still be focused
    await expect(searchInput).toBeFocused()
  })

  test("should display ⌘K hint in search bar", async ({ page }) => {
    // Check that the keyboard shortcut hint is visible
    await expect(page.getByText("⌘K")).toBeVisible()
  })
})
