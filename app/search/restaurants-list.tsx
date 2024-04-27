"use client";

import { useEffect, useState } from "react";
import { RestaurantCardType } from "../types/restaurant-types";
import RestaurantSearchCard from "./restaurant-search-card";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import Filters from "./filters";

interface RestaurantListProps {
  filters: Array<string[]>;
}

export default function RestaurantsList({
  filters,
}: RestaurantListProps): JSX.Element {
  const [restaurants, setRestaurants] = useState<RestaurantCardType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const updateRestaurants = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const query = new URLSearchParams(
        searchParams as URLSearchParams
      ).toString();

      const res = await fetch(`/api/get-filtered-restaurants?${query}`, {
        cache: "no-store",
      });
      const data = await res.json();
      setRestaurants(data);
      setIsLoading(false);
    };

    updateRestaurants();
  }, [searchParams]);

  return (
    <>
      {isLoading && (
        <div className="absolute top-0 left-0 size-full flex justify-center backdrop-blur rounded-lg z-20 mb-0">
          <Loader2 className="animate-spin size-8 mt-52 top-52 sticky" />
        </div>
      )}
      <div className="space-y-5 col-span-4 sm:col-span-2 xs:col-span-1">
        <Filters filters={filters} />
        {restaurants.map((restaurant: RestaurantCardType) => (
          <RestaurantSearchCard {...restaurant} key={restaurant.id} />
        ))}
      </div>
    </>
  );
}
