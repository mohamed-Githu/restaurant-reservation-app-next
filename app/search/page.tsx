import { Metadata } from "next";
import { getRestaurantsByLocation } from "../utils/restaurants";
import { RestaurantCardType } from "../types/restaurant-types";
import RestaurantSearchCard from "./restaurant-search-card";

export const metadata: Metadata = {
  title: "BuonAppetito | Search",
};

export default async function SearchPage({
  searchParams,
}: SearchPageProps): Promise<React.ReactNode> {
  const { query } = searchParams;
  const restaurants = await getRestaurantsByLocation(query);

  return (
    <div className="grid grid-cols-4 gap-8">
      <div className="bg-white shadow-lg rounded-lg">Filtring</div>
      <div className="space-y-5 col-span-3">
        {restaurants.map((restaurant: RestaurantCardType) => (
          <RestaurantSearchCard {...restaurant} key={restaurant.id} />
        ))}
      </div>
    </div>
  );
}
