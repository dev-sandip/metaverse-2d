import type { Context } from "hono";

import env from "@/env";

// Error Handler
export function errorHandler(c: Context) {
  return c.json({
    success: false,
    message: c.error?.message,
    stack: env.NODE_ENV === "production" ? null : c.error?.stack,
  });
}

// Not Found Handler
export function notFound(c: Context) {
  return c.json({
    success: false,
    message: `Not Found - [${c.req.method}] ${c.req.url}`,
  });
}