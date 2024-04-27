import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-3 gap-8 relative *:shadow-lg *:rounded-lg md:gap-5 xs:grid-cols-1">
      <div className="col-span-2 xs:col-span-1 rounded bg-white">
        <div className="p-4 gap-3 flex">
          <Skeleton className="h-8 max-24" />
          <Skeleton className="h-8 max-24" />
        </div>
        <Separator />
        <div className="p-4">
          <Skeleton className="h-10 max-96 mb-2" />
          <Skeleton className="h-6 max-40 " />
        </div>
      </div>
      <div className="bg-white sticky top-20 p-4 space-y-4">
        <Skeleton className="w-full h-16" />
        <Skeleton className="w-full h-16" />
        <Skeleton className="w-full h-16" />
      </div>
    </div>
  );
}
