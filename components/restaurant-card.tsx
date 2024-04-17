import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import RestaurantType from "@/app/types/restaurant-type";

export default function RestaurantCard({
  title,
  rating,
  imageUrl,
}: RestaurantType): React.ReactNode {
  return (
    <Card>
      <Image
        src={imageUrl}
        alt={title}
        className="object-cover"
        width={234}
        height={132}
      />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{rating}</p>
      </CardContent>
    </Card>
  );
}
