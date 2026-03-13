import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonTable() {
  return (
    <div className="flex w-full flex-col gap-3">
      {Array.from({ length: 20 }).map((_, index) => (
        <div className="flex gap-8" key={index}>
          <Skeleton className="h-4 w-30" />
          <Skeleton className="h-4 w-50" />
          <Skeleton className="h-4 w-80" />
          <Skeleton className="h-4 w-80" />
          <Skeleton className="h-4 flex-1" />
        </div>
      ))}
    </div>
  )
}
