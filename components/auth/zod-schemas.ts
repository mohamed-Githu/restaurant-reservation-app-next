import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(64),
  firstname: z.string().min(2).max(32),
  lastname: z.string().min(2).max(32),
  city: z.string().min(2).max(32),
  phone: z.string().min(10).max(10),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(32),
});
