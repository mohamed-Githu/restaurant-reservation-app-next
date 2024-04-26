"use server";

import prisma from "@/app/db";
import { newReviewSchema } from "@/components/auth/zod-schemas";
import { verifyTokenAction } from "./user-actions";
import { revalidateTag } from "next/cache";

export async function newReviewAction(
  slug: string,
  rating: number,
  text: string
) {
  try {
    const data = {
      slug,
      rating,
      text,
    };

    // Validate review data
    const result = newReviewSchema.safeParse(data);
    if (!result.success) {
      return {
        status: 400,
        success: false,
        error: result.error,
      };
    }

    // Check if user exists
    const res = await verifyTokenAction();

    if (!res.success) {
      return {
        status: 400,
        success: false,
        error: "User not found",
      };
    }

    // Check if restaurant exists
    const restaurant = await prisma.restaurant.findFirst({
      where: {
        slug: data.slug,
      },
    });

    if (!restaurant) {
      return {
        status: 400,
        success: false,
        error: "Restaurant not found",
      };
    }

    // Create review
    if (res?.user && res?.user?.id) {
      const review = await prisma.review.create({
        data: {
          rating: data.rating,
          text: data.text,
          user_id: res.user.id,
          restaurant_id: restaurant.id,
        },
      });

      revalidateTag("reiviews")
      return {
        status: 200,
        success: true,
        review,
      };
    }
  } catch (error: any) {
    return {
      status: 500,
      success: false,
      error: error?.message,
    };
  }
}
