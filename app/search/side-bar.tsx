import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { SideBarProps } from "./types";
import PriceFilter from "./price-filter";
import FilterList from "./filter-list";

export default function SideBar({
  locations,
  cuisines,
  searchParams,
}: SideBarProps): React.ReactNode {
  return (
    <Card className="shadow-md rounded-lg bg-white h-min divide-y-2 xs:divide-y-0 xs:grid xs:grid-cols-3 xs:divide-x-2 xs:w-full xs:*:px-2">
      <CardHeader>
        <CardTitle className="mb-2">Region</CardTitle>
        <FilterList
          items={locations}
          searchParams={searchParams}
          pathname="/search"
          queryString="location"
        />
      </CardHeader>

      <CardHeader>
        <CardTitle className="mb-2">Cuisine</CardTitle>
        <FilterList
          items={cuisines}
          pathname="/search"
          queryString="cuisine"
          searchParams={searchParams}
        />
      </CardHeader>

      <CardHeader>
        <CardTitle className="mb-2">Price</CardTitle>
        <PriceFilter />
      </CardHeader>
    </Card>
  );
}
