import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Item } from "@prisma/client";

interface ItemsGridProps {
  items: Item[];
}

export default function ItemsGrid({ items }: ItemsGridProps): JSX.Element {
  return (
    <div className="grid grid-cols-2 p-4 gap-2">
      {items.length > 0 ? (
        items.map((item, i) => (
          <Card key={i} className="shadow-none">
            <CardHeader>
              <CardTitle className="flex justify-between">
                {item.name}
                <span className="font-normal">${item.price}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{item.description}</CardDescription>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-center">No items found</p>
      )}
    </div>
  );
}
