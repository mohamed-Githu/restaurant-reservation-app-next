import { Cuisine, Location } from "@prisma/client";
import { FilterParamsType } from "../types/restaurant-types";

export interface SearchPageProps {
  searchParams: FilterParamsType;
}

export interface SideBarProps {
  locations: Location[];
  cuisines: Cuisine[];
  searchParams: FilterParamsType;
}

export interface FilterListProps {
  items: Cuisine[] | Location[];
  pathname: string;
  queryString: string;
  searchParams: FilterParamsType;
}
