import CardsGrid from "@/components/cards-grid";
import { PrismaClient } from "@prisma/client";
import { RestaurantCardType } from "./types/restaurant-types";

const prisma = new PrismaClient();

export default async function Home() {
  const restaurants = await (async function (): Promise<RestaurantCardType[]> {
    return await prisma.restaurant.findMany({ select: {
      id: true,
      slug: true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      price_category: true,
    } });
  })()

  console.log(restaurants)

  return (
    <>
      <CardsGrid restaurants={restaurants} />
    </>
  );
}
