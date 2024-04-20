import { Metadata } from "next";
import { filterRestaurants } from "../utils/restaurants";
import { RestaurantCardType } from "../types/restaurant-types";
import RestaurantSearchCard from "./restaurant-search-card";
import SideBar from "./side-bar";
import { getLocations } from "../utils/locations";
import { getCuisines } from "../utils/cuisines";
import { SearchPageProps } from "./types";

export const metadata: Metadata = {
  title: "BuonAppetito | Search",
};

export default async function SearchPage({
  searchParams,
}: SearchPageProps): Promise<React.ReactNode> {
  const restaurants = await filterRestaurants(searchParams);
  const locations = await getLocations();
  const cuisines = await getCuisines();

  return (
    <div className="grid grid-cols-5 gap-10">
      <SideBar locations={locations} cuisines={cuisines} searchParams={searchParams} />
      <div className="space-y-5 col-span-4">
        {restaurants.map((restaurant: RestaurantCardType) => (
          <RestaurantSearchCard {...restaurant} key={restaurant.id} />
        ))}
      </div>
    </div>
  );
}
