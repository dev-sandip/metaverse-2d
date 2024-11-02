import prisma from "@/lib/prisma";
import { LoginSchema, SignUpSchema } from "@/schema";
import type { Context } from "hono";
import Bun from "bun";
import genToken from "@/lib/gen-token";
class AuthController {
  private db;
  constructor() {
    this.db = prisma;
  }
  signUp = async (c: Context) => {
    const parsed = SignUpSchema.safeParse(await c.req.json());
    if (!parsed.success) {
      return c.json({ error: "Validation Error" }, 400);
    }

    const existingUser = await this.db.user.findUnique({
      where: {
        username: parsed.data.username,
      },
    });
    if (existingUser) {
      return c.json({ error: "User already exists" }, 400);
    }
    const hashedPassword = await Bun.password.hash(parsed.data.password, {
      algorithm: 'bcrypt',
      cost: 4, // number between 4-31
    })

    const user = await this.db.user.create({
      data: {
        username: parsed.data.username,
        password: hashedPassword,
      },
    });
    const token = genToken(user.id);
    return c.json({ user, token }, 201);
  };
  login = async (c: Context) => {
    const parsed = LoginSchema.safeParse(await c.req.json());
    if (!parsed.success) {
      return c.json({ error: "Validation Error" }, 400);
    }
    let user = await this.db.user.findUnique({
      where: {
        username: parsed.data.username,
      },
    });
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }
    const isValid = await Bun.password.verify(user.password, parsed.data.password);
    if (!isValid) {
      return c.json({ error: "Invalid credentials" }, 401);
    }
    const token = genToken(user.id);
    user = { ...user, password: " " };
    return c.json({ user, token }, 200);
  };
}
export default new AuthController();