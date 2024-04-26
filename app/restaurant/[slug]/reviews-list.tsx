import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ReviewListProps } from "./types";
import { RestaurantDescriptionReview } from "@/app/types/restaurant-types";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Stars from "@/components/stars";

export default function ReviewsList({ reviews }: ReviewListProps) {
  return (
    <div className="px-8 divide-y">
      {reviews.map((review: RestaurantDescriptionReview) => (
        <div className="flex gap-3 py-4" key={review.id}>
          <div className="flex flex-col items-center">
            <Avatar className="size-32">
              <AvatarFallback className="text-5xl font-extrabold bg-blue-500">
                {review.user.first_name[0]}
                {review.user.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-bold mt-3 flex flex-wrap justify-center w-40">
              <span>{review.user.first_name}</span>{" "}
              <span>{review.user.last_name}</span>
            </h3>
          </div>
          <CardHeader className="flex flex-col space-y-4">
            <CardTitle><Stars rating={review.rating} /></CardTitle>
            <CardDescription>{review.text}</CardDescription>
          </CardHeader>
        </div>
      ))}
    </div>
  );
}
