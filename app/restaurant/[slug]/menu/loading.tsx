import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="shadow max-w-4xl mx-auto rounded-lg bg-white">
      <div className="p-4 gap-3 flex">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24" />
      </div>
      <Separator />
      <div className="p-4 space-y-2">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-5 w-28 " />
        <Skeleton className="h-5 w-28 " />
        <Skeleton className="h-5 w-28 " />
      </div>
    </div>
  );
}
