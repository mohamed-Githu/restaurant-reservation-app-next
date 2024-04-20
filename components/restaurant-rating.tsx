import { Review } from "@prisma/client";
import Stars from "./stars";
import { calculateRatingAvg } from "@/app/utils/restaurants";

interface RestaurantRatingProps {
  reviews: Review[];
}

export default function RestaurantRating({ reviews }: RestaurantRatingProps) {
  const ratingAvg = calculateRatingAvg(reviews);

  return (
    <div className="flex gap-2 items-center text-sm text-gray-500">
      <Stars rating={ratingAvg} />{" "}
      <span className="size-1 rounded-full bg-gray-600" /> {reviews.length}{" "}
      Reviews
    </div>
  );
}
