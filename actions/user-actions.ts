"use server";

import prisma from "@/app/db";
import { LoginSchemaType, RegisterSchemaType } from "@/components/auth/types";
import { formatZodError, hashPassword } from "@/components/auth/utils";
import { loginSchema, registerSchema } from "@/components/auth/zod-schemas";
import { ZodError } from "zod";
import bcrypt from "bcryptjs";
import * as jose from "jose";
import { cookies } from "next/headers";

async function generateJWTToken(email: string, id: number) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  return await new jose.SignJWT({ email, id })
    .setProtectedHeader({ alg: "HS256" })
    .sign(secret);
}

async function setAuthCookie(email: string, id: number) {
  // setCookie("jwt", await generateJWTToken(email, id), {
  //   maxAge: 60 * 60 * 24 * 7, // 7 days
  // }
  cookies().set("jwt", await generateJWTToken(email, id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
    path: "/",
  });
}

export const createUserAction = async (newUser: RegisterSchemaType) => {
  try {
    const result = registerSchema.parse(newUser);

    // Check if user with email already exists
    const userWithEmail = await prisma.user.findFirst({
      where: {
        email: result.email,
      },
    });

    // If user with email already exists, return error
    if (userWithEmail) {
      return {
        status: 400,
        success: false,
        error: "Email already exists! Sign in or try another email",
      };
    }

    // If user with email doesn't exist, create new user
    const user = await prisma.user.create({
      data: {
        email: result.email,
        password: hashPassword(result.password),
        phone: result.phone,
        first_name: result.firstname,
        last_name: result.lastname,
        city: result.city,
      },
    });

    setAuthCookie(user.email, user.id);

    return {
      status: 200,
      success: true,
      user: {
        email: user.email,
        firstname: user.first_name,
        lastname: user.last_name,
      },
    };
  } catch (error: any | ZodError) {
    if (error instanceof ZodError) {
      const errorMessage = formatZodError(error);
      return {
        status: 400,
        success: false,
        error: errorMessage,
      };
    }

    return {
      status: 500,
      success: false,
      error: error?.message || "An error occurred while creating user",
    };
  }
};

export const signInAction = async (user: LoginSchemaType) => {
  try {
    const result = loginSchema.parse(user);

    const userWithEmail = await prisma.user.findFirst({
      where: {
        email: result.email,
      },
    });

    if (!userWithEmail) {
      return {
        status: 401,
        success: false,
        error: "User not found! Please register",
      };
    }

    const passwordMatch = bcrypt.compareSync(
      result.password,
      userWithEmail.password
    );

    if (!passwordMatch) {
      return {
        status: 401,
        success: false,
        error: "Incorrect email or password! Please try again",
      };
    }

    setAuthCookie(userWithEmail.email, userWithEmail.id);

    return {
      status: 200,
      success: true,
      user: {
        email: userWithEmail.email,
        firstname: userWithEmail.first_name,
        lastname: userWithEmail.last_name,
      },
    };
  } catch (error: any | ZodError) {
    if (error instanceof ZodError) {
      const errorMessage = formatZodError(error);
      return {
        status: 400,
        success: false,
        error: errorMessage,
      };
    }

    return {
      status: 500,
      success: false,
      error: error?.message || "An error occurred during sign in",
    };
  }
};

export const verifyToken = async (token: string | undefined) => {
  if (!token) {
    return {
      success: false,
      error: "No token provided",
    };
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload }: { payload: { email: string } } = await jose.jwtVerify(
      token,
      secret
    );
    if (!payload) {
      return {
        success: false,
        error: "Invalid token",
      };
    }
    const user = await prisma.user.findFirst({
      where: {
        email: payload.email,
      },
      select: {
        first_name: true,
        last_name: true,
        email: true,
      },
    });

    return {
      success: true,
      user: {
        email: user?.email,
        firstname: user?.first_name,
        lastname: user?.last_name,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: "An error occurred while verifying token. Token has been deleted",
    };
  }
};

export const signOutAction = async () => {
  try {
    cookies().delete("jwt");
    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      error: "An error occurred while signing out",
    };
  }
};
