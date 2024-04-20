"use server";

import prisma from "@/app/db";

export const createUser = async (formData: FormData) => {
  console.log("Creating user...");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(formData);

  // prisma.user.create({

  // })
};

export const signIn = async (formData: FormData) => {
  console.log("Signing in...");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(formData);
};
