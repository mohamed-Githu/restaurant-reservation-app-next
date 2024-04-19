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

const restaurantSelectObject = {
  id: true,
  slug: true,
  name: true,
  main_image: true,
  cuisine: true,
  location: true,
  price_category: true,
};

export const getRestaurants = async (): Promise<RestaurantCardType[]> => {
  return await prisma.restaurant.findMany({
    select: restaurantSelectObject,
  });
};

export const getRestaurantsByLocation = async (
  query: string
): Pomise<RestaurantCardType[]> => {
  if (!query) {
    return await getRestaurants();
  }

  return await prisma.restaurant.findMany({
    select: restaurantSelectObject,
    where: {
      location: {
        name: {
          equals: query.toLocaleLowerCase(),
        },
      },
    },
  });
};

export const getRestaurantsByCuisine = async (
  query: string
): Pomise<RestaurantCardType[]> => {
  if (!query) {
    return await getRestaurants();
  }

  return await prisma.restaurant.findMany({
    select: restaurantSelectObject,
    where: {
      cuisine: {
        name: {
          equals: query.toLocaleLowerCase(),
        },
      },
    },
  });
};

export const getRestaurantsByPrice = async (
  query: string
): Pomise<RestaurantCardType[]> => {
  if (!query) {
    return await getRestaurants();
  }

  return await prisma.restaurant.findMany({
    select: restaurantSelectObject,
    where: {
      location: {
        name: {
          equals: query.toLocaleLowerCase(),
        },
      },
    },
  });
};
