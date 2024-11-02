import * as z from 'zod';

export const SignUpSchema = z.object({
  password: z.string().min(6),
  username: z.string().min(3).max(20),
});
export type SignUp = z.infer<typeof SignUpSchema>;



export const LoginSchema = z.object({
  password: z.string().min(6),
  username: z.string().min(3).max(20),
});
export type Login = z.infer<typeof LoginSchema>;