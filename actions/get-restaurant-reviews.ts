"use server";

import prisma from "@/app/db";
import { RestaurantDescriptionReview } from "@/app/types/restaurant-types";

export async function getRestaurantReviewsAction(
  restaurant_id: number
): Promise<RestaurantDescriptionReview[]> {
  const reviews: RestaurantDescriptionReview[] = await prisma.review.findMany({
    where: {
      restaurant: {
        id: restaurant_id,
      },
    },
    select: {
      rating: true,
      text: true,
      created_at: true,
      id: true,
      restaurant_id: true,
      user_id: true,
      updated_at: true,
      user: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
        },
      },
    },
  });

  return reviews;
}
