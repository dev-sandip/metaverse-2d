import { Hono } from 'hono'
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import env from './env';
import auth from './routes/auth.routes';
const app = new Hono().basePath("/api/v1");
app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.use("*", cors({
  origin: env.FRONTEND_URL,
  allowHeaders: ["Origin", "Content-Type", "Authorization"],
  allowMethods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.route("/auth", auth);

app.use("*", logger(), prettyJSON());
export default app
