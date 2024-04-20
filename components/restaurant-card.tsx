import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { RestaurantCardType } from "@/app/types/restaurant-types";
import PriceIcon from "./price-icon";
import Link from "next/link";
import RestaurantRating from "./restaurant-rating";
import { calculateRatingAvg } from "@/app/utils/restaurants";

export default function RestaurantCard({
  name,
  cuisine,
  main_image,
  location,
  price_category,
  slug,
  reviews,
}: RestaurantCardType): React.ReactNode {
  return (
    <Card className="overflow-hidden">
      <Link href={`/restaurant/${slug}`}>
        <div className="h-36">
          <Image
            src={main_image}
            alt={name}
            className="object-cover h-full w-full"
            width={234}
            height={132}
          />
        </div>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <RestaurantRating reviews={reviews} />
        </CardHeader>
        <CardContent className="flex space-x-2 items-center capitalize">
          <p>{cuisine.name}</p>
          <PriceIcon price_category={price_category} />
          <p>{location.name}</p>
        </CardContent>
      </Link>
    </Card>
  );
}
