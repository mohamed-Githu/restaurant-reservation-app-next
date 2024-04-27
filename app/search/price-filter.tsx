"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { PRICE_CATEGORY } from "@prisma/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PriceFilter() {
  const searchParams = useSearchParams();
  const searchParamsObj: Record<string, string> = {};

  if (searchParams !== null) {
    for (const [key, value] of searchParams?.entries()) {
      searchParamsObj[key] = value;
    }
  }

  const getHrefObj = (price_category: PRICE_CATEGORY) => ({
    pathname: "/search",
    query: {
      ...searchParamsObj,
      price_category,
    },
  });

  return (
    <NavigationMenu>
      <NavigationMenuList className="xl:flex xl:flex-col xl:items-start xl:gap-2 xl:space-x-0">
        <NavigationMenuItem>
          <Link
            className={navigationMenuTriggerStyle()}
            href={getHrefObj(PRICE_CATEGORY.CHEAP)}
            scroll={false}
          >
            $$
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            className={navigationMenuTriggerStyle()}
            href={getHrefObj(PRICE_CATEGORY.REGULAR)}
            scroll={false}
          >
            $$$
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            className={navigationMenuTriggerStyle()}
            href={getHrefObj(PRICE_CATEGORY.EXPENSIVE)}
            scroll={false}
          >
            $$$$
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
