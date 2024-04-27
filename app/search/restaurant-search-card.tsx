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
    <Card className="flex h-52 lg:h-44 shadow sm:h-auto sm:flex-col sm:w-64 xs:w-full sm:mx-auto">
      <Image
        width={350}
        height={288}
        src={main_image}
        alt={name}
        className="object-cover p-2 h-full rounded-2xl lg:w-64 sm:w-full sm:h-40"
      />
      <div className="flex flex-col lg:*:pl-2 sm:*:pl-6">
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
