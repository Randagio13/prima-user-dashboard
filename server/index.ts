import "dotenv/config"
import cors from "cors"
import express from "express"
import { handleGetUsers } from "./routes/users"

export function createServer() {
  const app = express()

  // Middleware
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping"
    res.json({ message: ping })
  })

  app.get("/api/users", handleGetUsers)

  return app
}
