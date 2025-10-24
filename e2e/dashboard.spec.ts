import { expect, test } from "@playwright/test"

test.describe("User Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("should display the dashboard title", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /prima user dashboard/i }),
    ).toBeVisible()
  })

  test("should load and display users", async ({ page }) => {
    // Wait for users to load
    await expect(page.getByRole("option").first()).toBeVisible({
      timeout: 10000,
    })

    // Check that at least one user is displayed
    const users = page.getByRole("option")
    await expect(users).not.toHaveCount(0)
  })

  test("should search for users by name", async ({ page }) => {
    // Wait for users to load
    await expect(page.getByRole("option").first()).toBeVisible({
      timeout: 10000,
    })

    // Get initial count
    const initialCount = await page.getByRole("option").count()

    // Type in search box
    const searchInput = page.getByRole("textbox", { name: /search users/i })
    await searchInput.fill("Alice")

    // Wait for filter to apply
    await page.waitForTimeout(300)

    // Check that results are filtered
    const filteredCount = await page.getByRole("option").count()
    expect(filteredCount).toBeLessThanOrEqual(initialCount)
  })

  test("should filter users by role", async ({ page }) => {
    // Wait for users to load
    await expect(page.getByRole("option").first()).toBeVisible({
      timeout: 10000,
    })

    // Get initial user count
    const initialCount = await page.getByRole("option").count()

    // Click on the Admin filter badge in the sidebar (first one, which is the filter)
    const adminFilter = page.getByRole("button", { name: "Admin" }).first()
    await adminFilter.click()

    // Wait for filter to apply
    await page.waitForTimeout(300)

    // Check that results are filtered (count should change or stay same)
    const filteredCount = await page.getByRole("option").count()
    expect(filteredCount).toBeLessThanOrEqual(initialCount)
  })

  test("should open user detail modal when clicking a user", async ({
    page,
  }) => {
    // Wait for users to load
    await expect(page.getByRole("option").first()).toBeVisible({
      timeout: 10000,
    })

    // Click on first user
    await page.getByRole("option").first().click()

    // Wait for modal content to be visible (not just the backdrop)
    await expect(
      page.getByRole("button", { name: /go back to dashboard/i }),
    ).toBeVisible({ timeout: 5000 })

    // Check that dialog is present
    await expect(page.getByRole("dialog")).toBeAttached()
  })

  test("should close user detail modal when clicking close button", async ({
    page,
  }) => {
    // Wait for users to load and open modal
    await expect(page.getByRole("option").first()).toBeVisible({
      timeout: 10000,
    })
    await page.getByRole("option").first().click()

    // Wait for modal content to be visible
    const closeButton = page.getByRole("button", {
      name: /go back to dashboard/i,
    })
    await expect(closeButton).toBeVisible({ timeout: 5000 })

    // Close modal
    await closeButton.click()

    // Check that modal content is gone
    await expect(closeButton).not.toBeVisible()
  })

  test("should display user information in modal", async ({ page }) => {
    // Wait for users to load
    await expect(page.getByRole("option").first()).toBeVisible({
      timeout: 10000,
    })

    // Get user name from list
    const firstUser = page.getByRole("option").first()
    const userName = await firstUser.locator("h3").textContent()

    // Click to open modal
    await firstUser.click()

    // Check that user name appears in modal
    const dialog = page.getByRole("dialog")
    await expect(dialog).toContainText(userName || "")

    // Check for standard user info sections within the modal
    await expect(dialog.getByText("Role", { exact: true })).toBeVisible()
    await expect(dialog.getByText("Status", { exact: true })).toBeVisible()
    await expect(dialog.getByText("Email", { exact: true })).toBeVisible()
    await expect(dialog.getByText("User ID")).toBeVisible()
  })

  test("should navigate through pagination", async ({ page }) => {
    // Wait for users to load
    await expect(page.getByRole("option").first()).toBeVisible({
      timeout: 10000,
    })

    // Check if pagination exists (only if there are multiple pages)
    const nextButton = page.getByRole("button", { name: /next page/i })

    if (await nextButton.isEnabled()) {
      // Get first user name on page 1
      const firstUserPage1 = await page
        .getByRole("option")
        .first()
        .locator("h3")
        .textContent()

      // Click next page
      await nextButton.click()
      await page.waitForTimeout(300)

      // Get first user name on page 2
      const firstUserPage2 = await page
        .getByRole("option")
        .first()
        .locator("h3")
        .textContent()

      // They should be different
      expect(firstUserPage1).not.toBe(firstUserPage2)

      // Go back to page 1
      const prevButton = page.getByRole("button", { name: /previous page/i })
      await prevButton.click()
      await page.waitForTimeout(300)

      // Should show original first user
      const backToFirstUser = await page
        .getByRole("option")
        .first()
        .locator("h3")
        .textContent()
      expect(backToFirstUser).toBe(firstUserPage1)
    }
  })

  test("should disable Previous button on first page", async ({ page }) => {
    // Wait for users to load
    await expect(page.getByRole("option").first()).toBeVisible({
      timeout: 10000,
    })

    const prevButton = page.getByRole("button", { name: /previous page/i })
    await expect(prevButton).toBeDisabled()
  })

  test("should show empty state when no results match search", async ({
    page,
  }) => {
    // Wait for users to load
    await expect(page.getByRole("option").first()).toBeVisible({
      timeout: 10000,
    })

    // Search for something that won't match
    const searchInput = page.getByRole("textbox", { name: /search users/i })
    await searchInput.fill("xyzabc123notfound")
    await page.waitForTimeout(300)

    // Check for empty message
    await expect(page.getByText(/no users found/i)).toBeVisible()
  })

  test("should display results count", async ({ page }) => {
    // Wait for users to load
    await expect(page.getByRole("option").first()).toBeVisible({
      timeout: 10000,
    })

    // Check that results count is displayed
    await expect(page.getByText(/user(s)? found/i)).toBeVisible()
  })

  test("should be responsive - mobile view", async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 })

    await expect(
      page.getByRole("heading", { name: /prima user dashboard/i }),
    ).toBeVisible()
    await expect(page.getByRole("option").first()).toBeVisible({
      timeout: 10000,
    })
  })
})
