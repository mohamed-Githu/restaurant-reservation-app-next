import CardsGrid from "@/components/cards-grid";
import RestaurantCard from "@/components/restaurant-card";

const temp =
  "https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg";

const cards = [
  {
    id: 1,
    title: "temp restaurant",
    rating: 3.5,
    imageUrl: temp,
  },
  {
    id: 2,
    title: "temp restaurant",
    rating: 3.5,
    imageUrl: temp,
  },
  {
    id: 3,
    title: "temp restaurant",
    rating: 3.5,
    imageUrl: temp,
  },
  {
    id: 4,
    title: "temp restaurant",
    rating: 3.5,
    imageUrl: temp,
  },
  {
    id: 5,
    title: "temp restaurant",
    rating: 3.5,
    imageUrl: temp,
  },
];

export default function Home() {
  return (
    <>
      <CardsGrid cards={cards} />
    </>
  );
}
