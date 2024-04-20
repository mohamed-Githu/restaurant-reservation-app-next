import {
  getRestaurantBySlug,
  getRestaurantItems,
} from "@/app/utils/restaurants";
import { Metadata } from "next";
import RestaurantMenuBar from "../restaurant-menu-bar";
import { Separator } from "@/components/ui/separator";
import RestaurantMenu from "./restaurant-menu";
import { RestaurantDetailsPageProps } from "../types";

export async function generateMetadata({
  params,
}: RestaurantDetailsPageProps): Promise<Metadata> {
  const { slug } = params;
  const { name, description } = await getRestaurantBySlug(slug);

  return {
    title: `BuonAppetito | Menu of ${name}`,
    description,
  };
}

export default async function RestaurantMenuPage({
  params,
}: RestaurantDetailsPageProps): Promise<React.ReactNode> {
  const { slug } = params;
  const items = await getRestaurantItems(slug);

  return (
    <div className="shadow max-w-4xl mx-auto py-4 bg-white rounded-lg">
      <div className="px-2">
        <RestaurantMenuBar slug={slug} />
      </div>
      <Separator className="my-4" />
      <div className="px-4">
        <RestaurantMenu items={items} />
      </div>
    </div>
  );
}
