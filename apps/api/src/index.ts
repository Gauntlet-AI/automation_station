import { Hono } from "hono";
import { cors } from "hono/cors";

import { postRoutes } from "@/modules/posts";

import { logger } from "hono/logger";
import { errorHandler } from "@/pkg/middleware/error";
import { webhookRoutes } from "@/modules/webhooks/webhook.routes";

const app = new Hono();

app.use("*", logger());

app.use(
  "*",
  cors({
    origin: ["http://localhost:3000"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.get("/health", (c) => {
  return c.text("OK");
});

const routes = app
  .basePath("/api")
  .use("*", errorHandler())
  .route("/webhooks", webhookRoutes)
  .route("/posts", postRoutes);

export type AppType = typeof routes;

// Define the error interface
interface ServerError extends Error {
  code?: string;
  errno?: number;
  syscall?: string;
}

// Better server configuration with error handling
const serverConfig = {
  port: 3100,
  fetch: app.fetch,
  idleTimeout: 30,
  error(error: ServerError) {
    // Handle server startup errors
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${this.port} is already in use. Try a different port.`);
      process.exit(1); // Exit cleanly
    } else {
      console.error('Server error:', error);
    }
  },
};

// Log server startup
console.log(`Attempting to start server on port ${serverConfig.port}...`);

export default serverConfig;
