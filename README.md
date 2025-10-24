# Prima User Dashboard

A modern, responsive user management dashboard built with React, TypeScript, and Vite. Features real-time search, filtering, pagination, and a comprehensive testing suite.

## 🚀 Features

- **User Management**: Browse, search, and filter users by name, email, or role
- **Real-time Search**: Instant search with debouncing for optimal performance
- **Advanced Filtering**: Filter users by role (Admin, Editor, Viewer) and status
- **Pagination**: Navigate through large user lists with intuitive controls
- **User Details**: View detailed user information in a modal dialog
- **Dark Mode**: Toggle between light and dark themes with persistence
- **Keyboard Shortcuts**: Press `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux) to focus search
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Accessibility**: WCAG compliant with proper ARIA attributes
- **Comprehensive Testing**: 89 unit tests + 69 e2e tests across 3 browsers

## 🛠️ Technology Stack

### Core Framework

- **React 19.1.1** - Latest React with concurrent features and automatic batching
- **TypeScript 5.8.2** - Type safety and enhanced developer experience
- **Vite 6.0.14** - Fast build tool with HMR for instant feedback

### State Management & Data Fetching

- **TanStack Query (React Query) 5.90.5** - Server state management with automatic caching, background refetching, and optimistic updates
  - *Why?* Eliminates boilerplate for API calls, provides automatic cache invalidation, and handles loading/error states elegantly

### UI & Styling

- **Tailwind CSS 4.1.15** - Utility-first CSS with dark mode support
  - *Why?* Rapid development with consistent design system, small bundle size, and excellent mobile-first approach
- **HeadlessUI 2.2.9** - Accessible, unstyled UI components
  - *Why?* Provides robust accessibility out of the box (focus management, keyboard navigation, ARIA attributes) while maintaining full styling control

### Code Quality & Formatting

- **Biome 1.9.4** - Fast linter and formatter (replaces ESLint + Prettier)
  - *Why?* 100x faster than traditional tools, single configuration, zero dependencies

### Testing

- **Vitest 4.0.2** - Unit testing framework with native ESM support
  - *Why?* Vite-native, blazing fast with instant watch mode, compatible with Jest API
- **Testing Library** - User-centric testing utilities
  - *Why?* Encourages testing user behavior rather than implementation details
- **Playwright 1.56.1** - End-to-end testing across browsers
  - *Why?* Cross-browser testing (Chromium, Firefox, WebKit), reliable selectors, auto-wait capabilities

### Performance Optimizations

- **React Compiler (Experimental)** - Automatic memoization and optimization
  - *Why?* Eliminates manual useMemo/useCallback, reduces re-renders automatically

## 📋 Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Randagio13/prima-user-dashboard.git
cd prima-user-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for production

```bash
npm run build
```

### 5. Preview production build

```bash
npm run preview
```

## 🧪 Testing

### Unit Tests (Vitest)

Run all unit tests:

```bash
npm test
```

Watch mode for development:

```bash
npm run test:watch
```

Generate coverage report:

```bash
npm run test:coverage
```

**Test Coverage:**

- 89 unit tests across all components and hooks
- Tests for user interactions, accessibility, edge cases, and error handling
- Located in `client/**/tests/*.test.tsx`

### End-to-End Tests (Playwright)

Install Playwright browsers (first time only):

```bash
npx playwright install
```

Run all e2e tests:

```bash
npm run test:e2e
```

Run with UI mode (interactive debugging):

```bash
npm run test:e2e:ui
```

Run in headed mode (visible browser):

```bash
npm run test:e2e:headed
```

View test report:

```bash
npm run test:e2e:report
```

**E2E Coverage:**

- 69 tests across Chromium, Firefox, and WebKit
- Tests for user flows, navigation, search, filtering, and responsive behavior
- Located in `e2e/*.spec.ts`

## 📁 Project Structure

```
prima-user-dashboard/
├── client/                 # Frontend application
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components (Badge, Button)
│   │   └── tests/        # Component unit tests
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components (Dashboard)
│   └── main.tsx          # Application entry point
├── server/                # Backend API
│   ├── routes/           # API route handlers
│   └── index.ts          # Express server setup
├── e2e/                   # End-to-end tests
├── public/                # Static assets
└── shared/                # Shared types and utilities
```

## 🎯 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate coverage report |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run test:e2e:ui` | Run e2e tests in UI mode |
| `npm run lint` | Run Biome linter |
| `npm run format` | Format code with Biome |

## 🧩 Key Components

### Dashboard

Main page component that orchestrates the user list, search, filters, and pagination.

### UserList

Displays a list of users with support for selection and interaction.

### UserListItem

Individual user card with role badge, status indicator, and click handling.

### SearchBar

Debounced search input with keyboard shortcut support (`Cmd+K` / `Ctrl+K`).

### RoleFilter

Dropdown to filter users by role (All, Admin, Editor, Viewer).

### Pagination

Navigation controls for browsing through paginated user data.

### UserDetailModal

Modal dialog displaying comprehensive user information.

### ThemeProvider

Context provider for light/dark theme management with localStorage persistence.

## 🎨 Design Decisions

### Component Architecture

- **Composition over inheritance**: Small, focused components that compose together
- **Controlled components**: Parent components manage state for predictable data flow
- **Separation of concerns**: UI components separate from business logic (custom hooks)

### State Management

- **Server state**: TanStack Query for API data (caching, refetching, optimistic updates)
- **Client state**: React hooks (useState, useReducer) for UI state
- **No global state library needed**: Props drilling eliminated through composition

### Accessibility

- Semantic HTML elements (`<button>`, `<nav>`, etc.)
- ARIA attributes for dynamic content
- Keyboard navigation support
- Focus management in modals
- Screen reader friendly

### Performance

- React Compiler for automatic optimization
- Debounced search to reduce API calls
- Lazy loading with code splitting (ready to implement)
- Optimistic updates for instant feedback

### Testing Strategy

- **Unit tests**: Component behavior, edge cases, user interactions
- **Integration tests**: Component interactions, data flow
- **E2E tests**: Critical user journeys, cross-browser compatibility
- **Accessibility tests**: ARIA attributes, keyboard navigation

## 🔧 Configuration Files

- `vite.config.ts` - Vite bundler configuration with Vitest setup
- `vitest.setup.ts` - Global test setup (jsdom, Testing Library matchers)
- `playwright.config.ts` - Playwright e2e test configuration
- `tsconfig.json` - TypeScript compiler options
- `tailwind.config.js` - Tailwind CSS customization
- `biome.json` - Biome linter and formatter rules

## 🌙 Dark Mode

The application supports light and dark themes:

- Toggle using the theme button in the header
- Preference is saved to localStorage
- System theme detection on first visit
- Smooth transitions between themes

## ♿ Accessibility

This project follows WCAG 2.1 Level AA guidelines:

- Semantic HTML for screen readers
- Keyboard navigation support
- ARIA labels and roles
- Sufficient color contrast
- Focus indicators
- Skip links for main content

## 📄 License

MIT

## 👤 Author

**Alessandro Casazza**

- GitHub: [@Randagio13](https://github.com/Randagio13)
