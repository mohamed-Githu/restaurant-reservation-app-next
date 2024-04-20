"use client";
import { Review } from "@prisma/client";
import Stars from "./stars";
import { CardDescription } from "./ui/card";
import { calculateRatingAvg } from "@/app/utils/restaurants";

interface RestaurantRatingProps {
  reviews: Review[];
}

export default function RestaurantRating({ reviews }: RestaurantRatingProps) {
  const ratingAvg = calculateRatingAvg(reviews);

  return (
    <CardDescription className="flex gap-2 items-center">
      <Stars rating={ratingAvg} />{" "}
      <span className="size-1 rounded-full bg-gray-600" /> {reviews.length}{" "}
      Reviews
    </CardDescription>
  );
}
