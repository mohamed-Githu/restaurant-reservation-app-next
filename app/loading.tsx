import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="gap-4 grid grid-cols-4 lg:grid-cols-3 px-2 md:grid-cols-2 sm:grid-cols-1">
      {Array.from(Array(16)).map((_, i) => (
        <Card className="p-2" key={`skeleton-${i}`}>
          <Skeleton className="w-full h-40 rounded-lg mb-4" />
          <div className="flex flex-col space-y-2 py-2">
            <Skeleton className="w-36 h-4 rounded-lg" />
            <Skeleton className="w-20 h-4 rounded-lg" />
          </div>
        </Card>
      ))}
    </div>
  );
}
