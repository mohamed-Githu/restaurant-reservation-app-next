import CardsGrid from "@/components/cards-grid";
import { getRestaurants } from "./utils/restaurants";

export default async function Home() {
  const restaurants = await getRestaurants();
  
  return (
    <>
      <CardsGrid restaurants={restaurants} />
    </>
  );
}
