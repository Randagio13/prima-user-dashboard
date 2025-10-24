import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "./components/ThemeProvider"
import Dashboard from "./pages/Dashboard"

const queryClient = new QueryClient() // Initialize your QueryClient here

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
