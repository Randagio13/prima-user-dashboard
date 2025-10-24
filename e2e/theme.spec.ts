import { expect, test } from "@playwright/test"

test.describe("Theme Toggle", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("should toggle between light and dark themes", async ({ page }) => {
    // Get the html element to check dark class
    const html = page.locator("html")

    // Get initial theme state
    const initialHasDark = await html.evaluate((el) =>
      el.classList.contains("dark"),
    )

    // Click the theme toggle switch in header (first one)
    const themeSwitch = page
      .getByRole("switch", { name: /change theme/i })
      .first()
    await themeSwitch.click()

    // Wait for theme to change
    await page.waitForTimeout(200)

    // Check that theme has changed
    const afterToggleHasDark = await html.evaluate((el) =>
      el.classList.contains("dark"),
    )
    expect(afterToggleHasDark).not.toBe(initialHasDark)

    // Toggle back
    await themeSwitch.click()
    await page.waitForTimeout(200)

    // Should be back to initial state
    const backToInitialHasDark = await html.evaluate((el) =>
      el.classList.contains("dark"),
    )
    expect(backToInitialHasDark).toBe(initialHasDark)
  })

  test("should persist theme preference on page reload", async ({ page }) => {
    const html = page.locator("html")
    const themeSwitch = page
      .getByRole("switch", { name: /change theme/i })
      .first()

    // Set to dark mode
    const initialHasDark = await html.evaluate((el) =>
      el.classList.contains("dark"),
    )
    if (!initialHasDark) {
      await themeSwitch.click()
      await page.waitForTimeout(200)
    }

    // Verify dark mode is active
    await expect(html).toHaveClass(/dark/)

    // Reload page
    await page.reload()

    // Check that dark mode persists
    await expect(html).toHaveClass(/dark/)
  })

  test("should update theme when clicking sun icon", async ({ page }) => {
    const html = page.locator("html")

    // Ensure we're in dark mode first
    const hasDark = await html.evaluate((el) => el.classList.contains("dark"))
    if (!hasDark) {
      await page
        .getByRole("switch", { name: /change theme/i })
        .first()
        .click()
      await page.waitForTimeout(200)
    }

    // Click sun icon to go to light mode
    const sunIcon = page
      .locator("svg")
      .filter({ has: page.locator("title", { hasText: "Sun" }) })
      .or(page.locator('[class*="lucide-sun"]'))
      .first()

    if ((await sunIcon.count()) > 0) {
      await sunIcon.click()
      await page.waitForTimeout(200)

      // Should now be in light mode
      const afterClick = await html.evaluate((el) =>
        el.classList.contains("dark"),
      )
      expect(afterClick).toBe(false)
    }
  })

  test("should update theme when clicking moon icon", async ({ page }) => {
    const html = page.locator("html")

    // Ensure we're in light mode first
    const hasDark = await html.evaluate((el) => el.classList.contains("dark"))
    if (hasDark) {
      await page
        .getByRole("switch", { name: /change theme/i })
        .first()
        .click()
      await page.waitForTimeout(200)
    }

    // Click moon icon to go to dark mode
    const moonIcon = page
      .locator("svg")
      .filter({ has: page.locator("title", { hasText: "Moon" }) })
      .or(page.locator('[class*="lucide-moon"]'))
      .first()

    if ((await moonIcon.count()) > 0) {
      await moonIcon.click()
      await page.waitForTimeout(200)

      // Should now be in dark mode
      const afterClick = await html.evaluate((el) =>
        el.classList.contains("dark"),
      )
      expect(afterClick).toBe(true)
    }
  })

  test("should have visible theme toggle in header", async ({ page }) => {
    const themeSwitch = page
      .getByRole("switch", { name: /change theme/i })
      .first()
    await expect(themeSwitch).toBeVisible()
  })
})
