import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RestaurantMenuProps } from "./types";

export default function RestaurantMenu({
  items,
}: RestaurantMenuProps): React.ReactNode {
  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map(({ name, description, price, id }) => (
        <Card className="shadow-none flex flex-col" key={id}>
          <CardHeader className="mb-auto">
            <CardTitle>{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardFooter className="mt-auto">${price}</CardFooter>
        </Card>
      ))}
    </div>
  );
}
