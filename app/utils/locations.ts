import { Location } from "@prisma/client";
import prisma from "../db";

export const getLocations = async (): Promise<Location[]> => {
  return await prisma.location.findMany();
};
