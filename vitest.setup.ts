// Vitest setup: extend matchers and polyfill browser APIs used in components
import "@testing-library/jest-dom"

// jsdom may not implement matchMedia or may expose a non-function placeholder; provide a minimal polyfill for tests
if (typeof window.matchMedia !== "function") {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {}, // deprecated but some code may call it
      removeListener: () => {}, // deprecated but some code may call it
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  })
}
