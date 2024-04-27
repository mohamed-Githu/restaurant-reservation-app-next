import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-5 gap-8 md:gap-5 items-start sm:grid-cols-1">
      <div className="bg-white rounded-lg p-4 space-y-2 shadow">
        <Skeleton className="rounded-full h-5 max-w-24 mb-4" />
        <Skeleton className="rounded-full h-5 w-16" />
        <Skeleton className="rounded-full h-5 w-16" />
        <Skeleton className="rounded-full h-5 w-16" />
      </div>
      <div className="col-span-4 space-y-5 sm:col-span-1">
        <Card className="flex gap-5 p-2 sm:flex-col">
          <Skeleton className="h-52 w-80 sm:w-full rounded-lg" />
          <div className="flex flex-col">
            <Skeleton className="rounded-full h-5 w-36 mb-2" />
            <Skeleton className="rounded-full h-4 w-28 mb-4" />
          </div>
        </Card>
        <Card className="flex gap-5 p-2 sm:flex-col">
          <Skeleton className="h-52 w-80 sm:w-full rounded-lg" />
          <div className="flex flex-col">
            <Skeleton className="rounded-full h-5 w-36 mb-2" />
            <Skeleton className="rounded-full h-4 w-28 mb-4" />
          </div>
        </Card>
        <Card className="flex gap-5 p-2 sm:flex-col">
          <Skeleton className="h-52 w-80 sm:w-full rounded-lg" />
          <div className="flex flex-col">
            <Skeleton className="rounded-full h-5 w-36 mb-2" />
            <Skeleton className="rounded-full h-4 w-28 mb-4" />
          </div>
        </Card>
      </div>
    </div>
  );
}
