import react from "@vitejs/plugin-react"
import path from "node:path"
import { defineConfig, type Plugin } from "vite"
import { createServer } from "./server"

// https://vite.dev/config/
export default defineConfig({
	server: {
		host: "::",
		port: 8080,
		fs: {
			allow: [
				path.resolve(__dirname, "client"),
				path.resolve(__dirname, "shared"),
				path.resolve(__dirname),
			],
			deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
		},
	},
	build: {
		outDir: "dist/spa",
	},
	plugins: [
		react({
			babel: {
				plugins: [["babel-plugin-react-compiler"]],
			},
		}),
		expressPlugin(),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./client"),
			"@shared": path.resolve(__dirname, "./shared"),
		},
	},
})

function expressPlugin(): Plugin {
	return {
		name: "express-plugin",
		apply: "serve", // Only apply during development (serve mode)
		configureServer(server) {
			const app = createServer()

			// Add Express app as middleware to Vite dev server
			server.middlewares.use(app)
		},
	}
}
