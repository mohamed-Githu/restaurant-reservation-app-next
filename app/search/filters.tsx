"use client";

import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { CircleX } from "lucide-react";

interface FiltersProps {
  filters: Array<string[]>;
}

export default function Filters({ filters }: FiltersProps): JSX.Element {
  const router = useRouter();

  return (
    <>
      {filters.length > 0 && (
        <div className="flex gap-2 mt-2 flex-wrap">
          {filters.map((filterArr) => (
            <Badge
              className="capitalize rounded-full pl-4 text-sm font-normal"
              variant="secondary"
              key={filterArr[0]}
            >
              {filterArr[1].toLocaleLowerCase()}
              <CircleX
                className="ml-2 cursor-pointer size-5"
                onClick={() => {
                  const newFilters = filters.filter(
                    (queryArr) => queryArr[1] != filterArr[1]
                  );
                  const newQuery = newFilters
                    .map((queryArr) => queryArr.join("="))
                    .join("&");
                  router.push("/search?" + newQuery);
                }}
              />
            </Badge>
          ))}
        </div>
      )}
    </>
  );
}
