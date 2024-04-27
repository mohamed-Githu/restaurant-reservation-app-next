import { Metadata } from "next";
import SideBar from "./side-bar";
import { SearchPageProps } from "./types";
import Filters from "./filters";
import RestaurantsList from "./restaurants-list";

export const metadata: Metadata = {
  title: "BuonAppetito | Search",
};

export default async function SearchPage({
  searchParams,
}: SearchPageProps): Promise<React.ReactNode> {
  const locations = await fetch(
    `${process.env.BASE_URL}/api/get-locations`
  ).then((res) => res.json());
  const cuisines = await fetch(`${process.env.BASE_URL}/api/get-cuisines`).then(
    (res) => res.json()
  );

  return (
    <div className="grid grid-cols-5 sm:grid-cols-3 gap-8 sm:gap-2 xs:grid-cols-1 xs:gap-5 xl:gap-5 relative">
      <SideBar
        locations={locations}
        cuisines={cuisines}
        searchParams={searchParams}
      />
      <RestaurantsList filters={Object.entries(searchParams)} />
    </div>
  );
}
