import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { RestaurantCardType } from "@/app/types/restaurant-types";
import PriceIcon from "./price-icon";
import Link from "next/link";
import RestaurantRating from "./restaurant-rating";
import { format } from "date-fns";

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
    <Card className="overflow-hidden sm:w-96 sm:mx-auto xs:mx-0 xs:max-w-full xs:w-auto hover:-translate-y-0.5 transition hover:shadow-lg">
      <Link href={`/restaurant/${slug}?date=${format(new Date(Date.now()), "yyyy-MM-dd")}`}>
        <div className="h-36">
          <Image
            src={main_image}
            alt={name}
            className="object-cover h-full w-full"
            width={234}
            height={132}
            priority={true}
          />
        </div>
        <CardHeader className="p-5">
          <CardTitle>{name}</CardTitle>
          <RestaurantRating reviews={reviews} />
        </CardHeader>
        <CardContent className="flex space-x-2 items-center capitalize p-5 pt-0">
          <p>{cuisine.name}</p>
          <PriceIcon price_category={price_category} />
          <p>{location.name}</p>
        </CardContent>
      </Link>
    </Card>
  );
}
