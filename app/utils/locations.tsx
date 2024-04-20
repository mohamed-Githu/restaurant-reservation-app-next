import { Location, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getLocations = async (): Promise<Location[]> => {
  return await prisma.location.findMany();
};
