import Link from "next/link";
import { FilterListProps } from "./types";

export default function FilterList({
  items,
  pathname,
  queryString,
  searchParams,
}: FilterListProps) {
  return (
    <ul className="text-gray-700">
      {items.map((item) => (
        <li className="capitalize" key={item.id}>
          <Link
            href={{
              pathname,
              query: {
                ...searchParams,
                [queryString]: item.name,
              },
            }}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
