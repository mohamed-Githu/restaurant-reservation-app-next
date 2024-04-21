"use server";

import prisma from "@/app/db";
import { LoginSchemaType, RegisterSchemaType } from "@/components/auth/types";
import {
  formatZodError,
  generateJWTToken,
  hashPassword,
} from "@/components/auth/utils";
import { loginSchema, registerSchema } from "@/components/auth/zod-schemas";
import { ZodError } from "zod";
import bcrypt from "bcryptjs";

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

    return {
      status: 200,
      success: true,
      token: await generateJWTToken(user.email, user.id),
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

    return {
      status: 200,
      success: true,
      token: await generateJWTToken(userWithEmail.email, userWithEmail.id),
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
