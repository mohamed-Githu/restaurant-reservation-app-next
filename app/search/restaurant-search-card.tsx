import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RestaurantCardType } from "../types/restaurant-types";
import PriceIcon from "@/components/price-icon";
import Link from "next/link";
import Image from "next/image";
import RestaurantRating from "@/components/restaurant-rating";

export default function RestaurantSearchCard({
  name,
  price_category,
  cuisine,
  location,
  slug,
  main_image,
  reviews,
}: RestaurantCardType) {
  return (
    <Card className="flex h-52 shadow">
      <Image
        width={350}
        height={288}
        src={main_image}
        alt={name}
        className="object-cover p-2 h-full rounded-2xl"
      />
      <div className="flex flex-col">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <RestaurantRating reviews={reviews} />
        </CardHeader>
        <CardContent className="space-x-3 flex">
          <PriceIcon price_category={price_category} />
          <p>{cuisine.name}</p>
          <p>{location.name}</p>
        </CardContent>
        <CardFooter className="mt-auto">
          <Link
            href={`/restaurant/${slug}`}
            className="hover:underline text-orange-600"
          >
            View more information
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
}
