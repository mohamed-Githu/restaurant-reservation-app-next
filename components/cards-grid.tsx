import { RestaurantCardType } from "@/app/types/restaurant-types";
import RestaurantCard from "./restaurant-card";

export default function CardsGrid({
  restaurants,
}: {
  restaurants: Array<RestaurantCardType>;
}): React.ReactNode {
  return (
    <div className="gap-6 grid grid-cols-4">
      {restaurants.map((card) => (
        <RestaurantCard {...card} key={card.id} />
      ))}
    </div>
  );
}
