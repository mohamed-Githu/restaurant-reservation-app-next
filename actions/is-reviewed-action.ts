"use server";

import prisma from "@/app/db";
import { verifyTokenAction } from "./user-actions";

export async function isReviewedAction(restaurant_id: number) {
  const verification = await verifyTokenAction();

  if (!verification.success) {
    return false;
  }

  const reviewsCount = await prisma.review.count({
    where: {
      user_id: verification.user?.id,
      restaurant_id,
    },
  });

  if (reviewsCount >= 1) {
    return false;
  }

  return true;
}
