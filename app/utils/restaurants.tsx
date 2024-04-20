import { PrismaClient } from "@prisma/client";
import {
  FilterParamsType,
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

export const filterRestaurants = async (
  searchParams?: FilterParamsType
): Promise<RestaurantCardType[]> => {
  if (!searchParams) {
    return await getRestaurants();
  }

  const where: any = {};

  for (const [queryParam, queryString] of Object.entries(searchParams)) {
    if (queryParam === "price_category") {
      where[queryParam] = {
        equals: queryString,
      };
    } else {
      where[queryParam] = {
        name: { equals: queryString.toLocaleLowerCase() },
      };
    }
  }

  return await prisma.restaurant.findMany({
    select: restaurantSelectObject,
    where,
  });
};
