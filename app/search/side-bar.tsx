import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SideBarProps } from "./types";
import { Cuisine, Location } from "@prisma/client";
import PriceFilter from "./price-filter";
import FilterList from "./filter-list";

export default function SideBar({
  locations,
  cuisines,
  searchParams,
}: SideBarProps): React.ReactNode {
  return (
    <Card className="shadow-md rounded-lg bg-white h-min">
      <CardHeader>
        <CardTitle className="mb-2">Region</CardTitle>
        <FilterList
          items={locations}
          searchParams={searchParams}
          pathname="/search"
          queryString="location"
        />
      </CardHeader>
      <Separator />
      <CardHeader>
        <CardTitle className="mb-2">Cuisine</CardTitle>
        <FilterList
          items={cuisines}
          pathname="/search"
          queryString="cuisine"
          searchParams={searchParams}
        />
      </CardHeader>
      <Separator />
      <CardHeader>
        <CardTitle className="mb-2">Price</CardTitle>
        <PriceFilter />
      </CardHeader>
    </Card>
  );
}
