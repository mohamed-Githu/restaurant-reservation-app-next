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

export const makeReservationSchema = z.object({
  peopleCount: z.number().int().positive(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
});

export const newReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  text: z.string().min(1).max(500),
  slug: z.string().min(1),
});
