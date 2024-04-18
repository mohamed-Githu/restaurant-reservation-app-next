import { getRestaurantBySlug } from "@/app/utils/restaurants";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: RestaurantDetailsPageProps): Promise<Metadata> {
  const { slug } = params;
  const { name, description } = await getRestaurantBySlug(slug);

  return {
    title: `BuonAppetito | Reserve at ${name}`,
    description,
  };
}

export default function RestaurantMenuPage() {
  return <div>restuarant menu ReservePage</div>;
}
