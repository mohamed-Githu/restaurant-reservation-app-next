import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-4 gap-5">
      {Array.from(Array(16)).map((_, i) => (
        <Card className="p-2">
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
