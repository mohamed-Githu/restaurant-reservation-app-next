import { Cuisine, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCuisines = async (): Promise<Cuisine[]> => {
  return await prisma.cuisine.findMany();
};
