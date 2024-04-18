import { PRICE_CATEGORY } from "@prisma/client";

export interface RestaurantCardType {
  id: number;
  name: string;
  slug: string;
  main_image: string;
  cuisine: string;
  location: string;
  price_category: PRICE_CATEGORY;
}

export interface RestaurantDetailsType {
  name: string;
  images: string[];
  description: string;
}

export interface PriceCategoryType {
  price_category: PRICE_CATEGORY;
}
