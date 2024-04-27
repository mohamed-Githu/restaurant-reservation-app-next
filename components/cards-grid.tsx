import { RestaurantCardType } from "@/app/types/restaurant-types";
import RestaurantCard from "./restaurant-card";

export default function CardsGrid({
  restaurants,
}: {
  restaurants: Array<RestaurantCardType>;
}): React.ReactNode {
  return (
    <div className="gap-4 grid grid-cols-4 lg:grid-cols-3 px-2 md:grid-cols-2 sm:grid-cols-1">
      {restaurants.map((card) => (
        <RestaurantCard {...card} key={card.id} />
      ))}
    </div>
  );
}
