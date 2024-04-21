import { ZodError, ZodIssue } from "zod";
import bcrypt from "bcryptjs";
import * as jose from "jose";

export function formatZodError(error: ZodError) {
  return error.issues.reduce(
    (acc: string, curr: ZodIssue) =>
      acc + curr.path[0] + " " + curr.message + "\n",
    ""
  );
}

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

export async function generateJWTToken(email: string, id: number) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  return await new jose.SignJWT({ email, id })
    .setProtectedHeader({ alg: "HS256" })
    .sign(secret);
}
