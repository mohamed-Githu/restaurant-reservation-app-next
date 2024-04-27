import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ReviewListProps } from "./types";
import { RestaurantDescriptionReview } from "@/app/types/restaurant-types";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Stars from "@/components/stars";

export default function ReviewsList({ reviews }: ReviewListProps) {
  return (
    <div className="px-8 md:px-5 divide-y">
      {reviews.map((review: RestaurantDescriptionReview) => (
        <div className="flex gap-3 py-4 md:gap-0" key={review.id}>
          <div className="flex flex-col items-center">
            <Avatar className="size-32 md:size-24 xs:size-20">
              <AvatarFallback className="text-5xl md:text-3xl xs:text-2xl font-extrabold bg-blue-500">
                {review.user.first_name[0]}
                {review.user.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-lg sm:text-base font-bold mt-3 md:mt-0 flex flex-wrap justify-center w-40 md:w-28 sm:w-auto">
              <span>{review.user.first_name}</span>{" "}
              <span>{review.user.last_name}</span>
            </h3>
          </div>
          <CardHeader className="flex flex-col space-y-4 sm:space-y-2 sm:py-2 sm:px-3">
            <CardTitle>
              <Stars rating={review.rating} />
            </CardTitle>
            <CardDescription>{review.text}</CardDescription>
          </CardHeader>
        </div>
      ))}
    </div>
  );
}
