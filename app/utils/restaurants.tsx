import { PrismaClient } from "@prisma/client";
import {
  ItemType,
  RestaurantCardType,
  RestaurantDetailsType,
} from "../types/restaurant-types";

const prisma = new PrismaClient();

export const getRestaurantBySlug = async (
  slug: string
): Promise<RestaurantDetailsType> => {
  return await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      images: true,
      description: true,
    },
  });
};

export const getRestaurantItems = async (slug: string): Promise<ItemType[]> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  });

  const items = await restaurant?.items;

  return items;
};

export const getRestaurants = async (): Promise<RestaurantCardType[]> => {
  return await prisma.restaurant.findMany({
    select: {
      id: true,
      slug: true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      price_category: true,
    },
  });
};
