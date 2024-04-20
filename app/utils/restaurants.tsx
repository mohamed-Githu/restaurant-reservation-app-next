import { PrismaClient, Review } from "@prisma/client";
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
      reviews: {
        include: {
          user: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
            }
          }
        }
      }
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
  reviews: true,
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
        name: { contains: queryString.toLocaleLowerCase() },
      };
    }
  }

  return await prisma.restaurant.findMany({
    select: restaurantSelectObject,
    where,
  });
};

export const calculateRatingAvg = (reviews: Review[]) => {
  const ratingsSum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return parseFloat((ratingsSum / reviews.length).toFixed(1));
}
