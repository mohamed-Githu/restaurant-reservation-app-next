import {
  Cuisine,
  Location,
  PRICE_CATEGORY,
  Review,
  Item,
} from "@prisma/client";

export interface RestaurantCardType {
  id: number;
  name: string;
  slug: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  price_category: PRICE_CATEGORY;
  reviews: Review[];
}

export interface RestaurantDetailsType {
  id: number;
  name: string;
  images: string[];
  description: string;
  open_time: string;
  close_time: string;
  items: Item[];
  max_seat_number: number;
  min_seat_number: number;
}

export interface PriceCategoryType {
  price_category: PRICE_CATEGORY;
}

export interface ItemType {
  id: number;
  price: number;
  description: string;
  name: string;
}

export interface FilterParamsType {
  location?: string;
  cuisine?: string;
  price_category?: PRICE_CATEGORY;
}

export interface RestaurantDescriptionReview extends Review {
  user: {
    first_name: string;
    last_name: string;
    id: number;
  };
}
