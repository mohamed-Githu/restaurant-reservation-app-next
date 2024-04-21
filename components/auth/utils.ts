import { ZodError, ZodIssue } from "zod";
import bcrypt from "bcryptjs";

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
