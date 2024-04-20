import { RestaurantDescriptionReview } from "@/app/types/restaurant-types";

export interface RestaurantDetailsPageProps {
  params: {
    slug: string;
  };
}

export interface RestaurantMenuBarProps {
  slug: string;
}

export interface ReviewListProps {
  reviews: RestaurantDescriptionReview[];
}
