import { FilterParamsType } from "@/app/types/restaurant-types";
import { filterRestaurants } from "@/app/utils/restaurants";
import { PRICE_CATEGORY } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data: FilterParamsType = {
    price_category: req.query.price_category as PRICE_CATEGORY,
    location: req.query.location as string,
    cuisine: req.query.cuisine as string ,
  };

  const restaurants = await filterRestaurants(data);

  return res.json(restaurants);
}
