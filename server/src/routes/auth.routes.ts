import authService from "@/controllers/auth.service";
import { Hono } from "hono";

const users = new Hono();
users.post("/signup", c => authService.signUp(c));
users.post("/signin", c => authService.login(c));
export default users;                                                                