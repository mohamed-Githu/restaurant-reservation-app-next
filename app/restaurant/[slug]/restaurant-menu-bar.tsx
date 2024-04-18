"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useRouter } from "next/navigation";

export default function RestaurantMenuBar({
  slug,
}: RestaurantMenuBarProps): React.ReactNode {
  const router = useRouter();

  return (
    <NavigationMenu className="m-2">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            onClick={() => router.push(`/restaurant/${slug}`)}
          >
            Overview
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            onClick={() => router.push(`/restaurant/${slug}/menu`)}
          >
            Menu
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
