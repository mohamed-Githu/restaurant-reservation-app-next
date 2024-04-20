import { Cuisine} from "@prisma/client";
import prisma from "../db";

export const getCuisines = async (): Promise<Cuisine[]> => {
  return await prisma.cuisine.findMany();
};
