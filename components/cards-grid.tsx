import RestaurantType from "@/app/types/restaurant-type";
import RestaurantCard from "./restaurant-card";

export default function CardsGrid({
  cards,
}: {
  cards: Array<RestaurantType>;
}): React.ReactNode {
  return (
    <div className="gap-6 grid grid-cols-5">
      {cards.map((card) => (
        <RestaurantCard {...card} key={card.id} />
      ))}
    </div>
  );
}
