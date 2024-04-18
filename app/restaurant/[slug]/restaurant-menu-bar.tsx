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
            <div className="cursor-pointer">Overview</div>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            onClick={() => router.push(`/restaurant/${slug}/menu`)}
          >
            <div className="cursor-pointer">Menu</div>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
